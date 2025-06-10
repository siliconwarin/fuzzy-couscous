import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { QuizExplanation } from "@/types/quiz";

interface ExplanationCardProps {
	explanation?: QuizExplanation;
	isCorrect: boolean;
	onNext: () => void;
	isLastQuestion: boolean;
}

const defaultExplanation: QuizExplanation = {
	correct: "คำตอบถูกต้อง",
	incorrect: "คำตอบไม่ถูกต้อง",
	redFlags: ["ไม่พบข้อมูลสัญญาณเตือนภัย"],
};

const ExplanationCard: React.FC<ExplanationCardProps> = ({
	explanation = defaultExplanation,
	isCorrect,
	onNext,
	isLastQuestion,
}) => {
	// Ensure we have a valid explanation object
	const safeExplanation = explanation || defaultExplanation;
	const redFlags = safeExplanation.redFlags || ["ไม่พบข้อมูลสัญญาณเตือนภัย"];
	const correctText = safeExplanation.correct || "คำตอบถูกต้อง";
	const incorrectText = safeExplanation.incorrect || "คำตอบไม่ถูกต้อง";

	return (
		<Card className="animate-slide-in-bottom shadow-lg border-t border-gray-200 rounded-t-xl rounded-b-none w-full">
			<CardContent className="p-3 space-y-3">
				<div
					className={`p-2.5 rounded-lg ${
						isCorrect
							? "bg-green-50 border-green-200"
							: "bg-red-50 border-red-200"
					} border`}
				>
					<h3
						className={`font-semibold mb-1 text-xs ${
							isCorrect ? "text-green-700" : "text-red-700"
						}`}
					>
						{isCorrect ? "✅ ถูกต้อง!" : "❌ ไม่ถูกต้อง"}
					</h3>
					<p
						className={`text-xs leading-snug ${
							isCorrect ? "text-green-600" : "text-red-600"
						}`}
					>
						{isCorrect ? correctText : incorrectText}
					</p>
				</div>

				{redFlags.length > 0 && (
					<div>
						<h4 className="font-semibold text-red-500 mb-1 text-xs">
							🚩 สัญญาณเตือนภัย:
						</h4>
						<ul className="space-y-0.5">
							{redFlags.map((flag, index) => (
								<li
									key={index}
									className="text-xs text-red-500 flex items-start leading-snug"
								>
									<span className="text-red-400 mr-1.5 shrink-0">•</span>
									<span>{flag}</span>
								</li>
							))}
						</ul>
					</div>
				)}

				<Button
					onClick={onNext}
					className="w-full min-h-[44px] text-sm py-2.5"
					size="lg"
				>
					{isLastQuestion ? "ไปกรอกแบบสำรวจ" : "คำถามถัดไป"}
				</Button>
			</CardContent>
		</Card>
	);
};

export default ExplanationCard;
