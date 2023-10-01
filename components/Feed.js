import { SparklesIcon } from "@heroicons/react/outline";
import Input from "./Input";
import Post from "./Post";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  console.log([posts]);
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    []
  );

  // const posts = [
  //     {
  //         id: '1',
  //         name: 'Shehab',
  //         username: 'ShehabTaher',
  //         userImg: 'https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg',
  //         img: 'https://res.cloudinary.com/practicaldev/image/fetch/s--TenQsTYv--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rd3omc5vp71r5k9z69b4.png',
  //         text: 'next js',
  //         timestamp: '2 hours ago'
  //     },
  //     {
  //         id: '2',
  //         name: 'Shehab',
  //         username: 'ShehabTaher',
  //         userImg: 'https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg',
  //         img: 'https://cdn.sanity.io/images/3do82whm/next/4b1f008289a88f4438a1c983fb32cf1a636d9d0e-1000x667.png?w=720&h=480&fit=clip&auto=format',
  //         text: 'next js',
  //         timestamp: '2 hours ago'
  //     },
  //     {
  //         id: '3',
  //         name: 'Shehab',
  //         username: 'ShehabTaher',
  //         userImg: 'https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg',
  //         img: 'https://i18nexus.com/_next/static/media/nextjs.e54be70c.svg',
  //         text: 'next js',
  //         timestamp: '2 hours ago'
  //     },
  //     {
  //         id: '4',
  //         name: 'Shehab',
  //         username: 'ShehabTaher',
  //         userImg: 'https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg',
  //         img: 'data:image/jpeg;base64,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',
  //         text: 'next js',
  //         timestamp: '2 hours ago'
  //     },
  // ]
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
      <AnimatePresence>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Post key={post.id} post={post} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Feed;
