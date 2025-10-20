import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "Double dippable with any YSWS?",
    answer: "NOPE! Just submit to one ysws :)"
  },
  {
    question: "Who can participate?",
    answer: "Anyone who is a high/middle school student aged 13-19 years old!"
  },
  {
    question: "What counts as a food-related project?",
    answer: "Anything that involves food, snacks, recipes, restaurants, or even food-themed games."
  },

  {
    question: "Can I work in a team?",
    answer: "Nope! Earn your food yourself!"
  },
  {
    question: "Is there a time requirement?",
    answer: "At least 3 hours please"
  },
  {
    question: "When is the deadline?",
    answer: "We haven’t set one yet, but probably sometime around early-mid December 2025, as our sponsor will be able to sponsor in October."
  }
];

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div layout className="border-b border-gray-700 py-6">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"

        animate={{ color: isOpen ? "#191970" : "#100C08" }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-semibold">{faq.question}</h3>

        <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
        >
            <Plus className="w-6 h-6" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="answer"

            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}

            className="overflow-hidden"
          >
            <p className="pt-4 text-gray-900">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQSection() {
  return (
    <section id="faq" className=" py-24 min-h-screen ">
        <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-12 text-blue-900">
                Frequently Asked Questions
            </h2>
            <p className="text-center text-lg text-slate-900 mb-16">
                Have questions? We've got answers! If you have more questions, feel free to reach out to us on slack
            </p>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} faq={faq} />
                ))}
            </div>
        </div>
    </section>
  );
}