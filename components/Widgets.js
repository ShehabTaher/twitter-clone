import { SearchIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import News from "./News";
import { AnimatePresence, motion } from "framer-motion";

const Widgets = () => {
  const [articles, setArticles] = useState(null);
  const [users, setUsers] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [articleNum, setArticleNum] = useState(3);
  const [userNum, setUserNum] = useState(3);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch(
          "https://saurav.tech/NewsAPI/everything/cnn.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setArticles(result);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    }
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://randomuser.me/api/?results=30&inc=name,login,picture"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setUsers(result);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    }
    fetchUsers();
    fetchArticles();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!articles) {
    return <div>Data not available.</div>;
  }

  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5">
      <div className="w-[90%] xl:w-[70%] sticky top-0 bg-white py-1.5 z-50">
        <div className="flex items-center p-3 rounded-full bg-red-300 relative">
          <SearchIcon className="h-5 z-50 text-gray-500 " />
          <input
            type="text"
            className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100"
            placeholder="Search twitter"
          />
        </div>
      </div>

      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[70%]">
        <h4 className="font-bold text-xl px-4">What&apos;s happening</h4>
        <AnimatePresence>
          {articles?.articles.slice(0, articleNum).map((article) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <News article={article} />
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          onClick={() => setArticleNum(articleNum + 3)}
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
        >
          Show more
        </button>
      </div>
      <div className="sticky top-16 text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl w-[90%] xl:w-[70%]">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        <AnimatePresence>
          {users?.results.slice(0, userNum).map((user) => (
            <motion.div
              key={user.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div
                key={user.login.username}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition duration-500 ease-out"
              >
                <img
                  className="rounded-full"
                  width="40"
                  src={user.picture.thumbnail}
                  alt=""
                />
                <div className="truncate ml-4 leading-5">
                  <h4 className="font-bold hover:underline text-[14px] truncate">
                    {user.login.username}
                  </h4>
                  <h5 className="text-[13px] text-gray-500 truncate">
                    @{user.name.first + "" + user.login.last}
                  </h5>
                </div>

                <button className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold">
                  Follow
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          onClick={() => setUserNum(userNum + 3)}
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default Widgets;
