import React, { useEffect, useState } from "react";
import parseHTML from "./fetchData";

function Results({ htmlData }) {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!htmlData) {
      setError("No HTML data provided.");
      return;
    }

    try {
      const calculatedResult = parseHTML(htmlData);
      setResult(calculatedResult);
    } catch (err) {
      setError("Error parsing HTML data. Please check the input format.");
      console.error("Parsing error:", err);
    }
  }, [htmlData]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="results">
      {result ? (
        <div>
          <h2>Results:</h2>
          <table className="result-table">
            <thead>
              <tr>
                <th>Section</th>
                <th>Correct</th>
                <th>Wrong</th>
                <th>Not Attempted</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {["Reasoning", "GK", "Maths", "English"].map((section) => (
                <tr key={section}>
                  <td>{section}</td>
                  <td>{result?.[section]?.correct ?? 0}</td>
                  <td>{result?.[section]?.wrong ?? 0}</td>
                  <td>{result?.[section]?.not_attempted ?? 0}</td>
                  <td>{result?.[section]?.marks ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total Marks: {result?.totalMarks ?? 0}</h3>
        </div>
      ) : (
        <p>Processing...</p>
      )}
    </div>
  );
}

export default Results;
