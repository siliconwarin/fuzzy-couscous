import React from "react";

interface SMSBubbleProps {
	content: string;
	redflag?: string;
	showRedFlag?: boolean;
}

const SMSBubble: React.FC<SMSBubbleProps> = ({
	content,
	redflag,
	showRedFlag = false,
}) => {
	const renderContentWithHighlight = () => {
		if (!redflag || !showRedFlag) {
			return (
				<span className="whitespace-pre-line text-gray-800">{content}</span>
			);
		}

		const parts = content.split(redflag);
		return (
			<span className="whitespace-pre-line text-gray-800">
				{parts.map((part, index, array) => (
					<React.Fragment key={index}>
						{part}
						{index < array.length - 1 && (
							<span className="bg-pink-500 text-white px-2 py-1 rounded font-bold animate-pulse shadow-lg">
								{redflag}
							</span>
						)}
					</React.Fragment>
				))}
			</span>
		);
	};

	return (
		<div className="bg-blue-100 rounded-xl p-3 mx-3 relative">
			<div className="absolute -left-2 top-3 w-0 h-0 border-t-[8px] border-t-transparent border-r-[8px] border-r-blue-100 border-b-[8px] border-b-transparent"></div>
			<p className="text-sm leading-relaxed">{renderContentWithHighlight()}</p>
		</div>
	);
};

interface SmsCardProps {
	content: string;
	highlight?: string;
	showRedFlag?: boolean;
	isAnswered?: boolean;
	shouldTearAway?: boolean;
}

export const SmsCard: React.FC<SmsCardProps> = ({
	content,
	highlight,
	showRedFlag = false,
	shouldTearAway = false,
}) => {
	return (
		<div className="relative h-full">
			{/* Layer 1: Original Content - Tears away downward with rotation */}
			<div
				className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
					shouldTearAway
						? "opacity-0 transform rotate-[10deg] translate-y-full scale-95"
						: "opacity-100 transform rotate-0 translate-y-0 scale-100"
				}`}
			>
				<div className="space-y-3 p-3">
					{/* Contact Header */}
					<div className="flex items-center gap-2 mb-4">
						<div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
							<span className="text-white text-xs">📱</span>
						</div>
						<div>
							<div className="text-sm font-medium text-gray-800">ธนาคาร</div>
							<div className="text-xs text-gray-500">วันนี้ 10:30</div>
						</div>
					</div>

					{/* SMS Content */}
					<SMSBubble content={content} showRedFlag={false} />
				</div>
			</div>

			{/* Layer 2: Red Flag Content - Reveals from top */}
			<div
				className={`absolute inset-0 transition-all duration-800 ease-out ${
					shouldTearAway && showRedFlag
						? "opacity-100 transform translate-y-0"
						: "opacity-0 transform -translate-y-4"
				}`}
				style={{
					transitionDelay: shouldTearAway ? "500ms" : "0ms",
				}}
			>
				<div className="space-y-3 p-3">
					{/* Contact Header */}
					<div className="flex items-center gap-2 mb-4">
						<div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
							<span className="text-white text-xs">📱</span>
						</div>
						<div>
							<div className="text-sm font-medium text-gray-800">ธนาคาร</div>
							<div className="text-xs text-gray-500">วันนี้ 10:30</div>
						</div>
					</div>

					{/* SMS Content with Red Flag */}
					<SMSBubble content={content} redflag={highlight} showRedFlag={true} />
				</div>
			</div>

			{/* Spacer to maintain height */}
			<div className="invisible">
				<div className="space-y-3 p-3">
					<div className="flex items-center gap-2 mb-4">
						<div className="w-8 h-8 bg-blue-500 rounded-full"></div>
						<div>
							<div className="text-sm">ธนาคาร</div>
							<div className="text-xs">วันนี้ 10:30</div>
						</div>
					</div>
					<SMSBubble content={content} />
				</div>
			</div>
		</div>
	);
};
