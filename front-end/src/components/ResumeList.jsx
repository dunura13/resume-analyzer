import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ResumeList() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResumes() {
      try {
        const res = await axios.get("http://127.0.0.1:5000/resumes");
        setResumes(res.data);
      } catch (err) {
        alert("Failed to load resumes");
      } finally {
        setLoading(false);
      }
    }

    fetchResumes();
  }, []);

  if (loading) return <p>Loading resumes...</p>;

  if (resumes.length === 0) return <p>No resumes stored yet.</p>;

  return (
    <div>
      <h2>Saved Resumes</h2>
      {resumes.map((item, index) => (
        <div key={index} style={{ border: "1px solid #ccc", marginBottom: 12, padding: 12 }}>
          <h3>Score: {item.score}</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{item.feedback}</pre>
          <details>
            <summary>View Resume Text</summary>
            <pre style={{ whiteSpace: "pre-wrap", maxHeight: 200, overflowY: "auto" }}>
              {item.resume}
            </pre>
          </details>
        </div>
      ))}
    </div>
  );
}