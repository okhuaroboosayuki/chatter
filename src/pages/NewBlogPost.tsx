import { Helmet } from "react-helmet-async";
import { SideNav } from "../components/SideNav";
import { TopNav } from "../components/TopNav";
import "../styles/scss/new-post.scss";
import {
  AuthContext,
  AuthContextProvider,
} from "../context/AuthenticationContext";
import { useContext, useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../lib/Firebase";
import { useNavigate } from "react-router-dom";
import { storage } from "../lib/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
// import ReactHtmlParser from 'react-html-parser';

export const NewBlogPost = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [content, setContent] = useState<any>("");
  const [imageUrl, setImageUrl] = useState<any>();
  const [imageUpload, setImageUpload] = useState<any>();

  // useEffect to show a preview of the image the user selects
  useEffect(() => {
    const uploadImage = () => {
      if (imageUpload == null) return;

      const storageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      uploadBytes(storageRef, imageUpload).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrl(url);
        });
      });
    };
    uploadImage();
  }, [imageUpload]);

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    //clear the image input and the image preview
    e.preventDefault();
    if (imageRef.current) {
      imageRef.current.value = "";
      setImageUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //get title and image from the refs
      const postTitle = titleRef.current?.value;
      const postImage = imageUrl;
      const postDescription = descriptionRef.current?.value;
      // get the author's name, image and designation from the users collection
      const authorRef = doc(db, "users", `${currentUser?.uid}`);
      const authorDoc = await getDoc(authorRef);
      const authorData = authorDoc.data();
      const authorName = `${authorData?.firstName} ${authorData?.lastName}`;
      const authorImage = authorData?.picture;
      const authorDesignation = authorData?.designation;
      // calculating the time to read the post minus the images
      const contentWithoutTags = content.getContent({ format: "text" });
      const timeToRead = Math.ceil(contentWithoutTags.length / 300);
      // create a collection in firestore with the user id from auth inside a document from the 'users' collection
      const userRef = collection(db, "users", `${currentUser?.uid}`, "posts");
      // add the new post to the collection named 'posts' inside the user's document
      await addDoc(userRef, {
        author: authorName,
        authorImage: authorImage,
        authorDesignation: authorDesignation,
        content: content.getContent(),
        description: postDescription,
        createdAt: new Date().toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        likes: 0,
        comments: 0,
        views: 0,
        timeToRead: timeToRead + ` min${timeToRead > 1 ? "s" : ""} read`,
        title: postTitle,
        image: postImage,
      });
      // navigate to the feed page
      navigate(`/feed/${currentUser?.uid}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create New Blog Post</title>
        <meta
          name="description"
          content="Create a new blog post and share with your friends"
        />
        <link rel="canonical" href={`/feed/${currentUser?.uid}/new-post`} />
      </Helmet>
      <AuthContextProvider>
        <section className="feed_new_post">
          <SideNav />
          <div className="feed_new_post_container">
            <TopNav />

            <form className="new_post" onSubmit={handleSubmit}>
              <div className="publish_btn">
                <button type="submit">Publish</button>
              </div>

              <div className="title_and_image_container">
                <div className="title_and_image">
                  <div className="title">
                    <label htmlFor="title">Title</label>
                    <div className="title_input_wrapper">
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="title_input"
                        placeholder="What is the title of your post?"
                        maxLength={400}
                        ref={titleRef}
                      />
                    </div>
                  </div>
                  <div className="image">
                    <label htmlFor="image">Primary Image</label>
                    <div className="image_input_wrapper">
                      <input
                        type="file"
                        name="image"
                        id="image"
                        className="image_input"
                        ref={imageRef}
                        onChange={() => {
                          setImageUpload(imageRef.current?.files![0]);
                        }}
                      />
                      <button className="clear_btn" onClick={handleClear}>
                        Clear
                      </button>
                    </div>
                  </div>

                  <div className="description">
                    <label htmlFor="description">Description</label>
                    <div className="description_input_wrapper">
                      <textarea
                        id="description"
                        name="description"
                        className="description_input"
                        placeholder="Give a captivating description of your post"
                        maxLength={1000}
                        ref={descriptionRef}
                      />
                    </div>
                  </div>
                </div>

                <div className="image_preview">
                  {
                    // if there is an image url, show the image preview
                    imageUrl ? (
                      <img src={imageUrl} alt="preview" />
                    ) : (
                      // else show the default image
                      <img
                        src={require("../images/no_image_found.png")}
                        alt="preview"
                        draggable={false}
                      />
                    )
                  }
                </div>
              </div>

              <div className="editor_container">
                <Editor
                  apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                  onInit={(evt, editor) => setContent(editor)}
                  id="content"
                  textareaName="content"
                  initialValue="<h3>Start typing....</h3>"
                  init={{
                    height: 620,
                    menubar: true,
                    toolbar_mode: "wrap",
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
              </div>
            </form>
          </div>
        </section>
      </AuthContextProvider>
    </>
  );
};
