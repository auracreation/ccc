import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FormColumnProps {
  title?: string;
  description?: string;
  inputLabel?: string;
  inputPlaceholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  isActive?: boolean;
}

const FormColumn = ({
  title = "Question Title",
  description = "Please provide your answer below",
  inputLabel = "Your Answer",
  inputPlaceholder = "Type your answer here...",
  value = "",
  onChange = () => {},
  error = "",
  isActive = true,
}: FormColumnProps) => {
  const columnVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <motion.div
      className="w-full max-w-lg mx-auto bg-background p-6"
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      exit="exit"
      variants={columnVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Card className="p-6 shadow-lg border border-border">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="answer">{inputLabel}</Label>
            <Input
              id="answer"
              type="text"
              placeholder={inputPlaceholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={`w-full ${error ? "border-red-500" : ""}`}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default FormColumn;
