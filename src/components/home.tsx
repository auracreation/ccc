import React, { useState, useRef } from "react";
import PreferenceForm from "./PreferenceForm/PreferenceForm";
import SubmitDialog from "./SubmitDialog";

const Home = () => {
  const formRef = useRef<{ reset: () => void }>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error">(
    "success",
  );

  const handleSubmit = (answers: string[]) => {
    try {
      console.log("Form submitted:", answers);
      // TODO: Send to backend
      setSubmitStatus("success");
      setDialogOpen(true);
      formRef.current?.reset();
    } catch (error) {
      setSubmitStatus("error");
      setDialogOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PreferenceForm ref={formRef} onSubmit={handleSubmit} />
      <SubmitDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        status={submitStatus}
      />
    </div>
  );
};

export default Home;
