import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface FormFooterProps {
  currentStep?: number;
  totalSteps?: number;
  onPrevious?: () => void;
  onNext?: () => void;
  isConsentChecked?: boolean;
  onConsentChange?: (checked: boolean) => void;
  isLastStep?: boolean;
  onSubmit?: () => void;
}

const FormFooter = ({
  currentStep = 1,
  totalSteps = 9,
  onPrevious = () => {},
  onNext = () => {},
  isConsentChecked = false,
  onConsentChange = () => {},
  isLastStep = false,
  onSubmit = () => {},
}: FormFooterProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#3D8D7A] border-t border-white/10 p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Checkbox
          id="consent"
          checked={isConsentChecked}
          onCheckedChange={(checked) => onConsentChange(checked as boolean)}
        />
        <Label htmlFor="consent" className="text-sm text-muted-foreground">
          I agree to share my preferences data
        </Label>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        {isLastStep ? (
          <Button
            onClick={onSubmit}
            disabled={!isConsentChecked}
            className="flex items-center gap-2"
          >
            Submit
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={onNext}
            disabled={currentStep === totalSteps}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormFooter;
