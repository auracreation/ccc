import React from "react";
import PreferenceForm from "./PreferenceForm/PreferenceForm";
import { sendPreferenceEmail } from "@/lib/email";
import { useToast } from "@/components/ui/use-toast";

const defaultQuestions = [
  {
    title: "Gift Preferences",
    description: "What types of gifts do you generally prefer?",
    inputLabel: "Gift Types",
    placeholder: "E.g., Electronics, Books, Clothing...",
  },
  {
    title: "Favorite Colors",
    description: "What are your favorite colors?",
    inputLabel: "Colors",
    placeholder: "E.g., Blue, Green, Red...",
  },
  {
    title: "Hobbies",
    description: "What are your main hobbies?",
    inputLabel: "Hobbies",
    placeholder: "E.g., Reading, Gaming, Cooking...",
  },
];

const Home = () => {
  const { toast } = useToast();

  const handleSubmit = async (answers: string[]) => {
    try {
      const result = await sendPreferenceEmail(answers, defaultQuestions);
      if (result.success) {
        toast({
          title: "Success",
          description: "Your preferences have been submitted successfully!",
        });
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit preferences. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#3D8D7A]">
      <header className="border-b border-border bg-card p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground">
            Gift Preferences
          </h1>
          <p className="text-muted-foreground mt-2">
            Help us understand your preferences to create the perfect wishlist
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8">
        <PreferenceForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
};

export default Home;
