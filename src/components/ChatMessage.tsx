import { Highlight } from "@/components/ui/hero-highlight";

interface ChatMessageProps {
	message: string;
	redflag?: string;
	hasAnswered: boolean;
}

export const ChatMessage = ({
	message = "",
	redflag = "redflag",
	hasAnswered,
}: ChatMessageProps) => {
	return (
		<div className="flex justify-start pl-4 pt-4">
			<div className="bubble bubble-bottom-left bg-primary">
				<p className="text-md text-chat-text dark:text-chat-text mb-3 sm:mb-4 text-start leading-relaxed break-words whitespace-pre-line">
					{redflag && message?.includes(redflag)
						? message.split(redflag).map((part, index, array) => (
								<span key={index}>
									{part}
									{index < array.length - 1 &&
										(hasAnswered ? (
											<Highlight className="inline-block px-1">
												{redflag}
											</Highlight>
										) : (
											<span className="text-blue-600 underline cursor-default select-text">
												{redflag}
											</span>
										))}
								</span>
						  ))
						: message}
				</p>
			</div>
		</div>
	);
};
