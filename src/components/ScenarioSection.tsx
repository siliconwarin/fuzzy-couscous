import { motion, AnimatePresence } from "framer-motion";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatMessage } from "@/components/ChatMessage";
import AdCard from "@/components/AdCard";
import type { QuizQuestion } from "@/types/quiz";

interface ScenarioSectionProps {
  quiz: QuizQuestion;
  hasAnswered: boolean;
}

export const ScenarioSection = ({ quiz, hasAnswered }: ScenarioSectionProps) => {
  return (
    <div className="w-full h-full relative">
      {/* Background Layer (Always present) */}
      <div className="absolute inset-0 bg-pink-400 flex items-center justify-center">
        <h2 className="text-5xl md:text-6xl font-black text-white text-center p-6">
          Scam!!
        </h2>
      </div>

      {/* Content Layer */}
      <AnimatePresence>
        {!hasAnswered && (
          <motion.div
            key="chat-content"
            initial={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{
              opacity: 0,
              y: 300,
              x: -100,
              rotate: -50,
              transition: { 
                duration: 1, // Faster animation
                ease: [0.65, 0, 0.35, 1], // More snappy easing
              }
            }}
            className="relative z-10 h-full bg-white"
          >
            <div className="max-w-md mx-auto px-4 py-4">
              <ChatHeader />
              <ChatMessage message={quiz.message} hasAnswered={hasAnswered} />
              {quiz.ad && <AdCard ad={quiz.ad} hasAnswered={hasAnswered} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
