"use client";

import React from "react";

interface AdCardProps {
	content: string;
	image?: string;
	highlight?: string;
	showRedFlag?: boolean;
	isAnswered?: boolean;
	shouldTearAway?: boolean;
}

export const AdCard: React.FC<AdCardProps> = ({
	content,
	image,
	highlight,
	shouldTearAway = false,
}) => {
	const renderContentWithHighlight = (showFlag: boolean) => {
		if (!highlight || !showFlag) {
			return <span className="whitespace-pre-line">{content}</span>;
		}

		const parts = content.split(highlight);
		return (
			<span className="whitespace-pre-line">
				{parts.map((part, index, array) => (
					<React.Fragment key={index}>
						{part}
						{index < array.length - 1 && (
							<span className="bg-pink-500 text-white px-2 py-1 rounded font-bold animate-pulse shadow-lg">
								{highlight}
							</span>
						)}
					</React.Fragment>
				))}
			</span>
		);
	};

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
				<div className="bg-indigo-800 rounded-lg overflow-hidden">
					{/* Ad Header */}
					<div className="flex items-center justify-center p-3 sm:p-4 bg-secondary dark:bg-muted border-b border-border dark:border-border">
						<div className="size-8 bg-white relative"></div>
					</div>

					{/* Ad Content */}
					<div className="p-4 text-white space-y-2">
						<div className="text-sm">{renderContentWithHighlight(false)}</div>

						<div className="flex justify-end">
							{image && (
								<img
									src={image || "/placeholder.svg"}
									alt="Advertisement"
									className="w-20 h-20 object-contain rounded-lg"
									onError={(e) => {
										e.currentTarget.src = "/placeholder.svg?height=80&width=80";
									}}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
