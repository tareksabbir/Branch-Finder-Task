/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 w-10 h-10 bg-cream rounded-full flex items-center justify-center text-2xl text-midnight hover:bg-midnight hover:text-warm-white transition-colors"
            >
              ×
            </button>

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
                  <button
                    onClick={nextStep}
                    className="w-full mt-8 bg-gold text-midnight py-4 rounded-full font-medium shadow-lg hover:-translate-y-0.5 transition-transform"
                  >
                    Next
                  </button>
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
                    <button
                      onClick={prevStep}
                      className="flex-1 bg-cream text-midnight py-4 rounded-full font-medium hover:bg-midnight hover:text-warm-white transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      className="flex-1 bg-gold text-midnight py-4 rounded-full font-medium shadow-lg hover:-translate-y-0.5 transition-transform"
                    >
                      Next
                    </button>
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
                    <button
                      onClick={prevStep}
                      className="flex-1 bg-cream text-midnight py-4 rounded-full font-medium hover:bg-midnight hover:text-warm-white transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 bg-gold text-midnight py-4 rounded-full font-medium shadow-lg hover:-translate-y-0.5 transition-transform"
                    >
                      Submit
                    </button>
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
                  <div className="w-24 h-24 mx-auto mb-6 text-green-500">
                    <svg viewBox="0 0 52 52">
                      <circle
                        cx="26"
                        cy="26"
                        r="25"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        d="M14.1 27.2l7.1 7.2 16.7-16.8"
                      />
                    </svg>
                  </div>
                  <h2 className="font-playfair text-[2.2rem] font-bold text-green-600 mb-2">
                    Success
                  </h2>
                  <p className="text-slate mb-8">
                    Welcome to Brightstream. We'll be in touch shortly.
                  </p>
                  <button
                    onClick={handleClose}
                    className="bg-gold text-midnight py-4 px-10 rounded-full font-medium shadow-lg"
                  >
                    Continue
                  </button>
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
