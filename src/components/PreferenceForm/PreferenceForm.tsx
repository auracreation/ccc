import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormColumn from "./FormColumn";
import FormProgress from "./FormProgress";
import FormFooter from "./FormFooter";

interface PreferenceFormProps {
  onSubmit?: (answers: string[]) => void;
  questions?: Array<{
    title: string;
    description: string;
    inputLabel: string;
    placeholder: string;
  }>;
}

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
  {
    title: "Clothing Size",
    description: "What's your general clothing size?",
    inputLabel: "Size",
    placeholder: "E.g., Medium, Large, XL...",
  },
  {
    title: "Dietary Preferences",
    description: "Do you have any dietary preferences or restrictions?",
    inputLabel: "Dietary Info",
    placeholder: "E.g., Vegetarian, Gluten-free...",
  },
  {
    title: "Favorite Brands",
    description: "What are some of your favorite brands?",
    inputLabel: "Brands",
    placeholder: "E.g., Nike, Apple, Samsung...",
  },
  {
    title: "Music Preferences",
    description: "What types of music do you enjoy?",
    inputLabel: "Music Genres",
    placeholder: "E.g., Rock, Jazz, Pop...",
  },
  {
    title: "Book Genres",
    description: "What types of books do you like to read?",
    inputLabel: "Book Genres",
    placeholder: "E.g., Fiction, Biography, Science...",
  },
  {
    title: "Additional Notes",
    description: "Any other preferences you'd like to share?",
    inputLabel: "Notes",
    placeholder: "Add any additional information...",
  },
];

const PreferenceForm = ({
  onSubmit = () => {},
  questions = defaultQuestions,
}: PreferenceFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<string[]>(
    new Array(questions.length).fill(""),
  );
  const [errors, setErrors] = useState<string[]>(
    new Array(questions.length).fill(""),
  );
  const [isConsentChecked, setIsConsentChecked] = useState(false);

  const handleNext = () => {
    if (!answers[currentStep - 1].trim()) {
      const newErrors = [...errors];
      newErrors[currentStep - 1] = "This field is required";
      setErrors(newErrors);
      return;
    }
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep - 1] = value;
    setAnswers(newAnswers);

    const newErrors = [...errors];
    newErrors[currentStep - 1] = "";
    setErrors(newErrors);
  };

  const handleSubmit = () => {
    if (!answers[currentStep - 1].trim()) {
      const newErrors = [...errors];
      newErrors[currentStep - 1] = "This field is required";
      setErrors(newErrors);
      return;
    }
    onSubmit(answers);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <FormProgress
          currentStep={currentStep}
          totalSteps={questions.length}
          className="mb-8"
        />

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="flex justify-center items-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <FormColumn
                title={questions[currentStep - 1].title}
                description={questions[currentStep - 1].description}
                inputLabel={questions[currentStep - 1].inputLabel}
                inputPlaceholder={questions[currentStep - 1].placeholder}
                value={answers[currentStep - 1]}
                onChange={handleAnswerChange}
                error={errors[currentStep - 1]}
                isActive={true}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <FormFooter
        currentStep={currentStep}
        totalSteps={questions.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        isConsentChecked={isConsentChecked}
        onConsentChange={setIsConsentChecked}
        isLastStep={currentStep === questions.length}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default PreferenceForm;
