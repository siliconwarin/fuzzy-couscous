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
    <div className="w-full h-full overflow-hidden">
      <AnimatePresence>
        {!hasAnswered ? (
          <motion.div
            key="chat-content"
            initial={{ opacity: 1, rotate: 0, x: 0 }}
            exit={{
              opacity: 0,
              y: 300,
              x: -100,
              rotate: -15,
              transition: { 
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }
            }}
            className="space-y-2 h-full"
          >
            <div className="max-w-md mx-auto px-4 py-4">
              <ChatHeader />
              <ChatMessage message={quiz.message} hasAnswered={hasAnswered} />
              {quiz.ad && <AdCard ad={quiz.ad} hasAnswered={hasAnswered} />}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="scam-overlay"
            initial={{ opacity: 0, scale: 0.9, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ 
              type: 'spring',
              damping: 20,
              stiffness: 100
            }}
            className="absolute inset-0 bg-pink-400 flex items-center justify-center"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white text-center p-6">
              Scam!!
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
