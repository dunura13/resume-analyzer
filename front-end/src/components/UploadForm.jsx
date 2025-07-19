import React, { useState } from 'react';
import axios from 'axios';

export default function UploadForm({ setResult, setLoading }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a resume file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to analyze resume. Check your server and console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept=".pdf,.txt"
        onChange={handleFileChange}
        className="block"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Analyze Resume
      </button>
    </form>
  );
}