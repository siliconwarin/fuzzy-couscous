import type { QuizQuestion } from "@/types/quiz";

interface ExplanationOverlayProps {
	show: boolean;
	hasAnswered: boolean;
	quiz: QuizQuestion;
	selectedChoiceIndex: number | null;
	isLastQuestion: boolean;
	onNext: () => void;
}

export const ExplanationOverlay = ({
	show,
	hasAnswered,
	quiz,
	selectedChoiceIndex,
	isLastQuestion,
	onNext,
}: ExplanationOverlayProps) => (
	<div
		className={`w-full transition-all duration-300 transform ${
			show && hasAnswered
				? "opacity-100 translate-y-0"
				: "opacity-0 translate-y-4 pointer-events-none"
		}`}
	>
		<div className="p-4 space-y-4 bg-yellow-400 shadow-2xl border-4 border-yellow-500 relative">
			<div className="text-sm text-gray-900 leading-relaxed font-medium">
				<p className="whitespace-pre-line">
					{selectedChoiceIndex !== null &&
					quiz.choices[selectedChoiceIndex]?.isCorrect
						? quiz.explanation.correct
						: quiz.explanation.incorrect}
				</p>
			</div>
			{quiz.explanation.redFlags?.length > 0 && (
				<div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
					<h4 className="font-bold text-red-600 mb-2 text-sm flex items-center gap-1">
						🚩 สัญญาณเตือนภัย:
					</h4>
					<ul className="space-y-1">
						{quiz.explanation.redFlags.map((flag, index) => (
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
			<button
				onClick={onNext}
				className="w-full min-h-[52px] text-base font-bold rounded-2xl bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-2"
			>
				{isLastQuestion ? "ไปแบบสำรวจ" : "ข้อถัดไป"}
			</button>
		</div>
	</div>
);
