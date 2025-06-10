interface ChatMessageProps {
	message: string;
	redflag?: string;
	hasAnswered: boolean;
}

export const ChatMessage = ({
	message,
	redflag = "redflag",
	hasAnswered,
}: ChatMessageProps) => {
	return (
		<div className="flex justify-start pl-4 pt-4">
			<div className="bubble bubble-bottom-left bg-primary">
				<p className="text-md text-chat-text dark:text-chat-text mb-3 sm:mb-4 text-start leading-relaxed break-words whitespace-pre-line">
					{redflag && message.includes(redflag)
						? message.split(redflag).map((part, index, array) => (
								<span key={index}>
									{part}
									{index < array.length - 1 &&
										(hasAnswered ? (
											<span className="relative inline-block animate-highlight-glow">
												<span className="highlight-pink">{redflag}</span>
												<span className="absolute -top-2 -right-2 flex size-3">
													<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-highlight opacity-75"></span>
													<span className="relative inline-flex rounded-full size-3 bg-highlight"></span>
												</span>
											</span>
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
