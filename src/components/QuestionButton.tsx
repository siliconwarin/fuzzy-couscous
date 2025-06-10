import { Button } from "@/components/ui/button";

interface QuestionButtonProps {
	text: string;
	onClick: () => void;
	isVisible: boolean;
}

export const QuestionButton = ({
	text,
	onClick,
	isVisible,
}: QuestionButtonProps) => {
	if (!isVisible) return null;

	return (
		<Button
			onClick={onClick}
			variant="outline"
			className="w-[75%] max-w-2xl p-3 sm:p-4 text-left bg-card dark:bg-card hover:bg-accent dark:hover:bg-accent border border-border dark:border-border rounded-2xl transition-all duration-200 active:scale-[0.98] h-auto"
		>
			<span className="text-sm text-foreground dark:text-foreground leading-relaxed text-left">
				{text}
			</span>
		</Button>
	);
};
