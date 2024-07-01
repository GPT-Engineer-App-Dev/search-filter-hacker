import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Story from "../components/Story";
import Skeleton from "../components/Skeleton";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["topStories"],
    queryFn: fetchTopStories
  });

  const filteredStories = data?.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl text-center">Hacker News Top 100 Stories</h1>
      <input
        type="text"
        placeholder="Search stories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block mx-auto my-4 p-2 border rounded"
      />
      {isLoading ? (
        <Skeleton />
      ) : (
        <ul className="space-y-4">
          {filteredStories.map(story => (
            <Story key={story.id} {...story} />
          ))}
        </ul>
      )}
    </div>
  );
}

async function fetchTopStories() {
  const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
  const storyIds = await response.json();
  const stories = await Promise.all(
    storyIds.slice(0, 100).map(async (id) => {
      const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      return storyResponse.json();
    })
  );
  return stories;
}

export default Home;