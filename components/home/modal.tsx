/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X } from "lucide-react";
import Button from "@/components/ui/Button";

const Modal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    setStep(4); // Success state
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setStep(1), 300); // Reset step after animation
  };

  const progressWidth = step === 4 ? 100 : (step / 3) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-midnight/85 backdrop-blur-sm z-10000 flex items-center justify-center"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-warm-white rounded-[30px] w-[90%] max-w-137.5 p-12 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="absolute top-6 right-6 w-10 h-10 bg-cream hover:bg-midnight hover:text-warm-white p-0"
            >
              <X className="w-6 h-6" />
            </Button>

            {step !== 4 && (
              <div className="mb-10">
                <div className="w-full h-1.5 bg-cream rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-linear-to-r from-gold to-sage rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressWidth}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="text-center text-sm text-slate mt-2 font-medium">
                  Step {step} of 3
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="font-playfair text-[2.2rem] font-bold text-midnight mb-2">
                    Let's Get Started
                  </h2>
                  <p className="text-slate mb-8">
                    Tell us a bit about yourself
                  </p>
                  <div className="space-y-6">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full p-4 border-2 border-cream rounded-[15px] focus:border-gold focus:outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full p-4 border-2 border-cream rounded-[15px] focus:border-gold focus:outline-none"
                    />
                  </div>
                  <Button
                    onClick={nextStep}
                    variant="primary"
                    fullWidth
                    className="mt-8"
                  >
                    Next
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="font-playfair text-[2.2rem] font-bold text-midnight mb-2">
                    Choose Your Account
                  </h2>
                  <p className="text-slate mb-8">
                    Select the account type that suits your needs
                  </p>
                  <select className="w-full p-4 border-2 border-cream rounded-[15px] focus:border-gold focus:outline-none appearance-none bg-white">
                    <option>Current Account</option>
                    <option>Business Account</option>
                    <option>Wealth Management</option>
                  </select>
                  <div className="flex gap-4 mt-8">
                    <Button
                      onClick={prevStep}
                      variant="secondary"
                      fullWidth
                    >
                      Back
                    </Button>
                    <Button
                      onClick={nextStep}
                      variant="primary"
                      fullWidth
                    >
                      Next
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="font-playfair text-[2.2rem] font-bold text-midnight mb-2">
                    Almost There
                  </h2>
                  <p className="text-slate mb-8">Review and accept our terms</p>
                  <label className="flex items-start gap-3 text-sm text-slate cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-6 h-6 accent-gold"
                    />
                    <span>
                      I agree to the{" "}
                      <a href="#" className="text-gold underline">
                        Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-gold underline">
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </label>
                  <div className="flex gap-4 mt-8">
                    <Button
                      onClick={prevStep}
                      variant="secondary"
                      fullWidth
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      variant="primary"
                      fullWidth
                    >
                      Submit
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="s4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="mx-auto mb-6 flex justify-center text-green-500">
                    <CheckCircle className="w-24 h-24" strokeWidth={2} />
                  </div>
                  <h2 className="font-playfair text-[2.2rem] font-bold text-green-600 mb-2">
                    Success
                  </h2>
                  <p className="text-slate mb-8">
                    Welcome to Brightstream. We'll be in touch shortly.
                  </p>
                  <Button
                    onClick={handleClose}
                    variant="primary"
                    className="px-10"
                  >
                    Continue
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
