import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface FormProgressProps {
  currentStep?: number;
  totalSteps?: number;
  className?: string;
}

const FormProgress = ({
  currentStep = 1,
  totalSteps = 9,
  className = "",
}: FormProgressProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={cn("w-full space-y-4 bg-white p-4", className)}>
      <Progress value={progress} className="w-full" />

      <div className="flex justify-center gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index + 1 <= currentStep ? "bg-primary" : "bg-gray-200",
            )}
          />
        ))}
      </div>

      <div className="text-center text-sm text-gray-500">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
};

export default FormProgress;
