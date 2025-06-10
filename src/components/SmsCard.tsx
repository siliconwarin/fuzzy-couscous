import React from "react";
import { Card, CardContent } from "@/components/ui/card";

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
			return <span className="whitespace-pre-line">{content}</span>;
		}

		const parts = content.split(redflag);
		return (
			<span className="whitespace-pre-line">
				{parts.map((part, index, array) => (
					<React.Fragment key={index}>
						{part}
						{index < array.length - 1 && (
							<span className="bg-pink-400 text-white px-1 py-0.5 rounded animate-pulse font-medium">
								{redflag}
							</span>
						)}
					</React.Fragment>
				))}
			</span>
		);
	};

	return (
		<div className="bg-blue-100 rounded-xl p-3 max-w-xs ml-3 relative">
			{/* SMS tail */}
			<div className="absolute -left-1.5 top-3 w-0 h-0 border-t-[6px] border-t-transparent border-r-[6px] border-r-blue-100 border-b-[6px] border-b-transparent"></div>

			<p className="text-xs text-gray-800 leading-normal">
				{renderContentWithHighlight()}
			</p>
		</div>
	);
};

interface SmsCardProps {
	content: string;
	highlight?: string;
	answered: boolean;
	shouldTearAway?: boolean;
	showRedFlag?: boolean;
}

export const SmsCard: React.FC<SmsCardProps> = ({
	content,
	highlight,
	shouldTearAway = false,
	showRedFlag = false,
}) => (
	<Card className="transition-all duration-300 shadow-lg relative overflow-hidden">
		<CardContent className="p-0 relative">
			{/* Phone Frame */}
			<div className="bg-white rounded-lg overflow-hidden border-2 border-gray-300 shadow-xl relative">
				{/* Phone Header with Circle Avatar */}
				<div className="bg-gray-200 p-2 flex justify-center items-center">
					<div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
						<span className="text-white text-sm">📱</span>
					</div>
				</div>

				{/* SMS Content Area - Layer System */}
				<div className="bg-white p-3 min-h-[25vh] relative">
					{/* Layer 1: Original Content (will be torn away) */}
					<div
						className={`absolute inset-0 p-3 transition-all duration-1000 ease-in-out ${
							shouldTearAway
								? "transform translate-y-full opacity-0 rotate-180 scale-95"
								: "transform translate-y-0 opacity-100 rotate-0 scale-100"
						}`}
					>
						<SMSBubble content={content} showRedFlag={false} />
					</div>

					{/* Layer 2: Content with Red Flag (revealed after tear) */}
					<div
						className={`absolute inset-0 p-3 transition-all duration-1000 ease-out delay-300 ${
							shouldTearAway
								? "opacity-100 transform scale-100 translate-y-0"
								: "opacity-0 transform scale-95 translate-y-4"
						}`}
					>
						<SMSBubble
							content={content}
							redflag={highlight}
							showRedFlag={showRedFlag}
						/>
					</div>

					{/* Spacer to maintain height */}
					<div className="invisible">
						<SMSBubble content={content} />
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);
