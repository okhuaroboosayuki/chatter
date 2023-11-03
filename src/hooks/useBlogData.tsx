import {
  orderBy,
  query,
  collectionGroup,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { useEffect, useState, useMemo } from "react";
import { db } from "../lib/Firebase";

export const useBlogData = () => {
  const [blogContent, setBlogContent] = useState<DocumentData>([]);

  const fetchAllData = async () => {
    // get a subcollection from all the users called 'posts'
    const posts = query(
      collectionGroup(db, "posts"),
      orderBy("timeStamp", "desc")
    );

    // get all the documents from the 'posts' collection
    const querySnapshot = await getDocs(posts);

    // map through the documents and get the data
    const blogs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setBlogContent(blogs)
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const memoizedBlogContent = useMemo(() => blogContent, [blogContent])

  return { blogContent: memoizedBlogContent };
};
