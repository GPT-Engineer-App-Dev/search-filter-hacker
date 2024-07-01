function Story({ title, score, url }) {
  return (
    <li className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{score} upvotes</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read more</a>
    </li>
  );
}

export default Story;