import { SearchIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import News from "./News";

const Widgets = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [articleNum, setArticleNum] = useState(3);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://saurav.tech/NewsAPI/everything/cnn.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
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
        <h4 className="font-bold text-xl px-4">What's happening</h4>
        {data?.articles.slice(0, articleNum).map((article) => (
          <News key={article.title} article={article} />
        ))}
        <button
          onClick={() => setArticleNum(articleNum + 3)}
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default Widgets;
