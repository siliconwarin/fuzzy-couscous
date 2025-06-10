"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { QuizExplanation } from "@/types/quiz";
import { motion, AnimatePresence } from "framer-motion";

interface ExplanationModalProps {
	explanation: QuizExplanation;
	isCorrect: boolean;
	onNext: () => void;
	isLastQuestion: boolean;
	isOpen: boolean;
	onClose: () => void;
}

const ExplanationModal: React.FC<ExplanationModalProps> = ({
	explanation,
	isCorrect,
	onNext,
	isLastQuestion,
	isOpen,
	onClose,
}) => {
	const explanationText = isCorrect
		? explanation.correct
		: explanation.incorrect;

	if (!isOpen) return null;

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-safe-area-inset-bottom">
					{/* Modal Content - No backdrop overlay */}
					<motion.div
						initial={{ y: 100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 100, opacity: 0 }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
						className="w-full max-w-md mx-auto bg-yellow-400 rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-500"
					>
						{/* Content */}
						<div className="p-4 space-y-4">
							<div className="text-sm text-gray-900 leading-relaxed font-medium">
								<p className="whitespace-pre-line">{explanationText}</p>
							</div>

							{/* Red Flags Section */}
							{explanation.redFlags && explanation.redFlags.length > 0 && (
								<div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
									<h4 className="font-bold text-red-600 mb-2 text-sm flex items-center gap-1">
										🚩 สัญญาณเตือนภัย:
									</h4>
									<ul className="space-y-1">
										{explanation.redFlags.map((flag, index) => (
											<li
												key={index}
												className="text-xs text-red-600 flex items-start leading-snug"
											>
												<span className="text-red-400 mr-2 shrink-0">•</span>
												<span className="font-medium">{flag}</span>
											</li>
										))}
									</ul>
								</div>
							)}

							{/* Action Button */}
							<Button
								onClick={() => {
									onNext();
									onClose();
								}}
								className="w-full min-h-[52px] text-base font-bold rounded-2xl bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
							>
								<span className="flex items-center justify-center gap-2">
									{isLastQuestion ? "ดูผลลัพธ์" : "ข้อถัดไป"}
									<ArrowRight className="w-4 h-4" />
								</span>
							</Button>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default ExplanationModal;
