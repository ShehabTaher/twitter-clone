import { useRouter } from "next/router";
import Sidebar from "../../components/Sidebar";
import Widgets from "../../components/Widgets";
import CommentModal from "../../components/CommentModal";
import Head from "next/head";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import Post from "../../components/Post";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import Comment from "../../components/Comment";
import { AnimatePresence } from "framer-motion";

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  console.log(comments);
  // Get the post
  useEffect(
    () => onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot)),
    [db, id]
  );

  // Get Comments of the post
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db, id]);

  return (
    <div>
      <Head>
        <title>Post Page</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <main className="flex min-h-screen mx-auto ">
        {/* Sidebar */}
        <Sidebar />

        {/* Tweet */}

        <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
          <div className="flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="hoverEffect" onClick={() => router.push("/")}>
              <ArrowLeftIcon className="h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
              Tweet
            </h2>
          </div>
          <Post id={id} post={post} />

          {comments.length > 0 && (
            <div className="">
              <AnimatePresence>
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <Comment
                      key={comment.id}
                      commentId={comment.id}
                      originalPostId={id}
                      comment={comment.data()}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Widgets */}
        <Widgets />
        {/* Modal */}

        <CommentModal />
      </main>
    </div>
  );
}
