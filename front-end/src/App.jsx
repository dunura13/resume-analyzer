import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import ResultDisplay from "./components/ResultDisplay";
import Loader from "./components/Loader";
import ResumeList from "./components/ResumeList";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Resume Analyzer</h1>

      <UploadForm setResult={setResult} setLoading={setLoading} />

      {loading && <Loader />}

      <ResultDisplay result={result} />

      <hr className="my-10" />

      <ResumeList />
    </div>
  );
}