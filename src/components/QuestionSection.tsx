import { QuestionButton } from "@/components/QuestionButton";
import type { QuizQuestion } from "@/types/quiz";

interface QuestionSectionProps {
	quiz: QuizQuestion;
	showExplanation: boolean;
	onClick: (index: number) => void;
}

export const QuestionSection = ({
	quiz,
	showExplanation,
	onClick,
}: QuestionSectionProps) => (
	<div className="pt-4 pb-4 px-2 w-full">
		<p className="text-sm md:text-base text-foreground dark:text-foreground mb-3 text-start leading-relaxed break-words whitespace-pre-line">
			{quiz.scenario}
		</p>
		<div className="space-y-3 flex flex-col items-center">
			{quiz.choices.map((choice, index) => (
				<QuestionButton
					key={choice.id}
					text={choice.text}
					onClick={() => onClick(index)}
					isVisible={!showExplanation}
				/>
			))}
		</div>
	</div>
);
