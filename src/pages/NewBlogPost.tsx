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
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/Firebase";
import { useNavigate } from "react-router-dom";
import { storage } from "../lib/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { ComponentLoader, PublishBtnLoader } from "../components/Loader";

export const NewBlogPost = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [content, setContent] = useState<any>("");
  const [imageUrl, setImageUrl] = useState<any>();
  const [imageUpload, setImageUpload] = useState<any>();
  const [titleError, setTitleError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);

  // useEffect to check if input fields are empty and show error messages or remove error messages
  useEffect(() => {
    titleRef.current?.addEventListener("focusout", () => {
      if (titleRef.current?.value.length === 0) {
        setTitleError("Title is required");
      } else {
        setTitleError(null);
      }
    });
    titleRef.current?.addEventListener("focusin", () => {
      setTitleError(null);
    });
    //sets image error to a message if the image input is empty, if not empty, sets image error to null and sets the image upload to the image the user selects
    imageRef.current?.addEventListener("change", () => {
      if (!imageRef.current?.value) {
        setImageError("Image is required");
      } else if (imageRef.current?.value) {
        setImageError(null);
        setImageUpload(imageRef.current?.files![0]);
      }
    });
    // sets description error to a message if the description input is empty, if not empty, sets description error to null
    const textArea = descriptionRef.current;
    descriptionRef.current?.addEventListener("focusout", () => {
      if (descriptionRef.current?.value.length === 0) {
        setDescriptionError("Description is required");
      } else if (textArea && textArea.value.length < 200) {
        setDescriptionError("Description must be at least 200 characters");
      } else {
        setDescriptionError(null);
      }
    });
    descriptionRef.current?.addEventListener("focusin", () => {
      setDescriptionError(null);
    });
  }, []);

  // useEffect to show a preview of the image the user selects
  useEffect(() => {
    const uploadImage = () => {
      if (imageUpload == null) return;

      const storageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      uploadBytes(storageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrl(url);
        });
      });
    };
    uploadImage();
  }, [imageUpload]);

  useEffect(() => {
    // check if select image is clicked, then change the inner html to the name of the image the user selects
    const imageInputLabel = document.getElementById("image_input");
    imageRef.current?.addEventListener("change", () => {
      if (imageRef.current?.value === "") {
        imageInputLabel!.innerHTML = "select image";
      } else {
        const imageNameLong = imageRef.current?.files![0].name;
        const imageNameSplit = imageNameLong?.split(".")[0];
        const imageName = imageNameSplit?.slice(0, 8) + "...";
        imageInputLabel!.innerHTML = imageName;
      }
    });
  }, [imageRef]);

  // set loading state for editor
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  //clear the image input, label innerHTML, and the image preview
  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (imageRef.current) {
      imageRef.current.value = "";
      const imageInputLabel = document.getElementById("image_input");
      imageInputLabel!.innerHTML = "select image";
      setImageUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check if the title input is empty
    if (titleRef.current?.value.length === 0) {
      setTitleError("Title is required");
      return;
    } else {
      setTitleError(null);
    }
    // check if the image input is empty
    if (!imageRef.current?.value) {
      setImageError("Image is required");
      return;
    } else if (imageRef.current?.value) {
      setImageError(null);
    }
    // check if the description input is empty
    if (descriptionRef.current?.value.length === 0) {
      setDescriptionError("Description is required");
      return;
    } else {
      setDescriptionError(null);
    }

    //set publishing state to true if all conditions are met
    if (
      titleRef.current?.value &&
      imageRef.current?.value &&
      descriptionRef.current?.value
    ) {
      setPublishing(true);
    } else {
      setPublishing(false);
    }

    // if there are no errors, create a new post
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
      // calculating the time to read the post
      const contentWithoutTags = content.getContent({ format: "text" });
      const timeToRead = Math.ceil(contentWithoutTags.length / 500);
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
        timeStamp: serverTimestamp(),
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

            <section className="new_post_wrapper">
              <form className="new_post" onSubmit={handleSubmit}>
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
                      {titleError && (
                        <p className="error_message">{titleError}</p>
                      )}
                    </div>
                    <div className="image">
                      <p>Primary Image</p>
                      <div className="image_input_wrapper">
                        <label
                          htmlFor="image"
                          className="image_input"
                          id="image_input"
                        >
                          {" "}
                          select image
                        </label>
                        <input
                          type="file"
                          name="image"
                          id="image"
                          ref={imageRef}
                        />
                        <button className="clear_btn" onClick={handleClear}>
                          Remove
                        </button>
                      </div>
                      {imageError && (
                        <p className="error_message">{imageError}</p>
                      )}
                    </div>

                    <div className="description">
                      <label htmlFor="description">Description</label>
                      <div className="description_input_wrapper">
                        <textarea
                          id="description"
                          name="description"
                          className="description_input"
                          placeholder="Give a captivating description of your post"
                          minLength={200}
                          maxLength={1000}
                          ref={descriptionRef}
                        />
                      </div>
                      {descriptionError && (
                        <p className="error_message">{descriptionError}</p>
                      )}
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
                  {loading ? (
                    <ComponentLoader />
                  ) : (
                    <Editor
                      apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                      onInit={(evt, editor) => setContent(editor)}
                      id="content"
                      textareaName="content"
                      initialValue=""
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
                  )}
                </div>

                {publishing ? (
                  <div className="publish_btn">
                    <PublishBtnLoader />
                  </div>
                ) : (
                  <div className="publish_btn">
                    <button type="submit">Publish</button>
                  </div>
                )}
              </form>
            </section>
          </div>
        </section>
      </AuthContextProvider>
    </>
  );
};
