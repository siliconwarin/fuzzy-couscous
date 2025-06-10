// ProgressBar.tsx - Mobile Optimized
import React from "react";

interface ProgressBarProps {
	current: number;
	total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
	const progressPercentage = (current / total) * 100;

	return (
		<div className="w-full px-3 pt-1.5 pb-1 fixed top-0 left-0 right-0 bg-background z-10 shadow-sm">
			<div className="flex justify-between items-center mb-0.5">
				<span className="text-xs font-medium text-primary">
					{Math.round(progressPercentage)}%
				</span>
			</div>
			<div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
				<div
					className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-out"
					style={{ width: `${progressPercentage}%` }}
				></div>
			</div>
		</div>
	);
};

export default ProgressBar;
