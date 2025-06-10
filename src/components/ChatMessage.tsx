interface ChatMessageProps {
	message: string;
	link?: string;
	hasAnswered: boolean;
}

export const ChatMessage = ({
	message,
	link,
	hasAnswered,
}: ChatMessageProps) => {
	return (
		<div className="flex justify-start">
			<div className="chat chat-start">
				<div className="chat-bubble">
					<p className="text-md text-chat-text dark:text-chat-text whitespace-pre-line leading-relaxed">
						{hasAnswered && link
							? // แสดง message พร้อม highlight redflag เมื่อตอบแล้ว
							  message.split(link).map((part, index, array) => (
									<span key={index}>
										{part}
										{index < array.length - 1 && (
											<span className="relative inline-block animate-highlight-glow">
												<span className="highlight-pink">{link}</span>
												<span className="absolute -top-2 -right-2 flex size-3">
													<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-highlight opacity-75"></span>
													<span className="relative inline-flex rounded-full size-3 bg-highlight"></span>
												</span>
											</span>
										)}
									</span>
							  ))
							: // แสดง message ปกติเมื่อยังไม่ตอบ
							  message}
					</p>
				</div>
			</div>
		</div>
	);
};
