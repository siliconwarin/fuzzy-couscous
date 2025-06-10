"use client";

import type React from "react";

interface ProgressBarProps {
	current: number;
	total: number;
	answered: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
	current,
	total,
	answered,
}) => {
	// Calculate progress percentage based on completed questions
	// If the current question is answered, include it in the progress
	// If not, only count previously answered questions
	const completedQuestions = answered ? current : current - 1;
	const percentage = (completedQuestions / total) * 100;

	return (
		<div className="px-4 py-4">
			{/* Progress Bar */}

			{/* Background Bar */}
			<div className="h-2 w-full bg-blue-100 rounded-full overflow-hidden shadow-inner">
				<div
					className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700 ease-out shadow-sm"
					style={{ width: `${percentage}%` }}
				/>
			</div>

			{/* Progress Dots */}
			<div className="flex justify-between absolute -top-1 w-full">
				{Array.from({ length: total }, (_, i) => (
					<div
						key={i}
						className={`w-2 h-2 rounded-full transition-all duration-300 ${
							i < completedQuestions ? "bg-blue-600" : "bg-gray-300"
						}`}
					/>
				))}
			</div>
		</div>
	);
};

export default ProgressBar;
