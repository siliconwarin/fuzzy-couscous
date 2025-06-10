"use client";

import { useState, useEffect } from "react";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatMessage } from "@/components/ChatMessage";
import { QuestionButton } from "@/components/QuestionButton";
import { quizQuestions } from "@/data/dataQuiz";

const Quiz = () => {
	const [isDark, setIsDark] = useState(false);
	/* 	const [currentStep, setCurrentStep] = useState(0); */
	const [showExplanation, setShowExplanation] = useState(false);
	/* 	const [highlightedText, setHighlightedText] = useState(""); */
	const [hasAnswered, setHasAnswered] = useState(false);

	// Use the first quiz question
	const currentQuiz = quizQuestions[0];

	// Apply dark mode to document
	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isDark]);

	const handleQuestionClick = (questionIndex: number) => {
		console.log(`Question ${questionIndex + 1} clicked`);

		/* 	setCurrentStep(1);
		setHighlightedText(currentQuiz.choices[questionIndex].text); */
		setHasAnswered(true);

		// Switch to dark theme when user answers
		setIsDark(true);
		setShowExplanation(true);
	};

	return (
		<div className="min-h-screen flex flex-col bg-background dark:bg-background transition-colors duration-300">
			<div className="flex flex-col flex-1 w-full max-w-md mx-auto bg-background dark:bg-background shadow-lg">
				{/* Chat Header - Fixed at top */}
				<div className="flex-shrink-0 mt-4 mx-4">
					<ChatHeader />
				</div>

				{/* Messages Area - Expanded by flex-1 */}
				<div className="mx-4 bg-white flex-1">
					<ChatMessage
						message={currentQuiz.smsContent}
						redflag={currentQuiz.redflag}
						hasAnswered={hasAnswered}
					/>
				</div>

				{/* Bottom Section - Questions or Explanation */}
				<div className="flex-1 min-h-[220px] relative">
					{/* Fade in/out Explanation */}
					<div
						className={`absolute inset-0 transition-opacity duration-500 ${
							showExplanation && hasAnswered
								? "opacity-100 pointer-events-auto z-10"
								: "opacity-0 pointer-events-none z-0"
						}`}
					>
						<div className="p-4 space-y-4 bg-yellow-400 rounded-2xl shadow-2xl border-4 border-yellow-500 w-full max-w-md mx-auto">
							<div className="text-sm text-gray-900 leading-relaxed font-medium">
								<p className="whitespace-pre-line">
									{currentQuiz.explanation.correct}
								</p>
							</div>
							{currentQuiz.explanation.redFlags &&
								currentQuiz.explanation.redFlags.length > 0 && (
									<div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
										<h4 className="font-bold text-red-600 mb-2 text-sm flex items-center gap-1">
											🚩 สัญญาณเตือนภัย:
										</h4>
										<ul className="space-y-1">
											{currentQuiz.explanation.redFlags.map((flag, index) => (
												<li
													key={index}
													className="text-xs text-red-600 flex items-start leading-snug"
												>
													<span className="text-red-400 mr-2 shrink-0">•</span>
													<span className="font-medium">{flag}</span>
												</li>
											))}
										</ul>
									</div>
								)}
							<button
								onClick={() => {
									setShowExplanation(false);
									setHasAnswered(false);
									setIsDark(false);
								}}
								className="w-full min-h-[52px] text-base font-bold rounded-2xl bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-2"
							>
								ดูผลลัพธ์
							</button>
						</div>
					</div>
					{/* Fade in/out Questions */}
					<div
						className={`transition-opacity duration-500 ${
							showExplanation && hasAnswered
								? "opacity-0 pointer-events-none"
								: "opacity-100 pointer-events-auto"
						}`}
					>
						<div className="pt-4 pb-4 px-8 bg-background dark:bg-background">
							<p className="text-md text-foreground dark:text-foreground mb-3 sm:mb-4 text-start leading-relaxed break-words whitespace-pre-line">
								{currentQuiz.scenario}
							</p>
							<div className="space-y-2 sm:space-y-3 flex flex-col items-center">
								{currentQuiz.choices.map((choice, index) => (
									<QuestionButton
										key={choice.id}
										text={choice.text}
										onClick={() => handleQuestionClick(index)}
										isVisible={!showExplanation}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Quiz;
