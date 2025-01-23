import React, { useState } from "react";
import Results from "./Results";

function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);

  const handleFetchResults = async () => {
    if (!url.trim()) return;
    try {
      const response = await fetch(`/api/fetchQuiz?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }
      const htmlText = await response.text();
      setData(htmlText);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleFetchResults();
    }
  };

  return (
    <div className="container">
      <h1>Quiz Result Calculator</h1>
      <input
        type="text"
        placeholder="Enter URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyPress={handleKeyPress}  // Listen for Enter key press
      />
      <button onClick={handleFetchResults}>Get Results</button>

      {data && <Results htmlData={data} />}

      {/* Footer Section */}
      <footer>
        Made by Atul Kumar
      </footer>

      <style jsx>{`
        footer {
          margin-top: 20px;
          padding: 10px;
          font-size: 14px;
          color: #888;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default App;
