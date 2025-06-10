"use client";

import type React from "react";

interface MobileFrameProps {
	children: React.ReactNode;
	shouldTearAway?: boolean;
	isAnswered?: boolean;
	className?: string;
}

const MobileFrame: React.FC<MobileFrameProps> = ({
	children,
	className = "",
}) => {
	return (
		<div className={`relative mx-auto ${className}`}>
			{/* Phone Frame */}
			<div className="relative bg-white rounded-[24px] overflow-hidden border-[8px] border-gray-300 shadow-2xl">
				{/* Status Bar */}
				<div className="bg-gray-100 h-6 flex items-center justify-center">
					<div className="w-16 h-3 bg-gray-400 rounded-full"></div>
				</div>

				{/* Screen Content Container */}
				<div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-[400px] relative overflow-hidden">
					{children}
				</div>
			</div>
		</div>
	);
};

export default MobileFrame;
