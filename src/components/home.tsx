import React from "react";
import PreferenceForm from "./PreferenceForm/PreferenceForm";
const Home = () => {
  const handleSubmit = (answers: string[]) => {
    console.log("Form submitted:", answers);
    // TODO: Send to backend
  };

  return (
    <div className="min-h-screen bg-white">
      <PreferenceForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Home;
