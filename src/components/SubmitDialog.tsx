import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface SubmitDialogProps {
  isOpen: boolean;
  onClose: () => void;
  status: "success" | "error";
}

const SubmitDialog = ({ isOpen, onClose, status }: SubmitDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-12 flex flex-col items-center gap-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          {status === "success" ? (
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <X className="w-8 h-8 text-red-600" />
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-2xl font-semibold mb-2">
            {status === "success" ? "Success!" : "Error"}
          </h2>
          <p className="text-gray-600">
            {status === "success"
              ? "Your preferences have been submitted successfully."
              : "Failed to submit preferences. Please try again."}
          </p>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitDialog;
