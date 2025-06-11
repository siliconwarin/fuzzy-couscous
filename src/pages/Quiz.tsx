"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatMessage } from "@/components/ChatMessage";
import { QuestionButton } from "@/components/QuestionButton";
import { quizQuestions } from "@/data/dataQuiz";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import AdCard from "@/components/AdCard";
import type { UserAnswer } from "@/types/quiz";

const Quiz = () => {
	const navigate = useNavigate();
	const [isDark, setIsDark] = useState(false);
	const [showExplanation, setShowExplanation] = useState(false);
	const [hasAnswered, setHasAnswered] = useState(false);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
	const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(
		null
	);
	const isMobile = useIsMobile();

	const currentQuiz = quizQuestions[currentQuestionIndex];
	const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
	const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isDark]);

	const handleQuestionClick = (questionIndex: number) => {
		console.log(`Question ${questionIndex + 1} clicked`);
		const selectedChoice = currentQuiz.choices[questionIndex];

		setSelectedChoiceIndex(questionIndex);
		setHasAnswered(true);
		setIsDark(true);
		setShowExplanation(true);

		// Save user answer
		const userAnswer: UserAnswer = {
			questionId: currentQuiz.id.toString(),
			choiceId: selectedChoice.id,
			isCorrect: selectedChoice.isCorrect,
			personality: selectedChoice.personality,
		};

		setUserAnswers((prev) => [...prev, userAnswer]);
	};

	const handleNextQuestion = () => {
		if (isLastQuestion) {
			// Save answers to localStorage for survey/result pages
			const quizData = {
				answers: userAnswers,
				completedAt: new Date().toISOString(),
			};
			localStorage.setItem("scam-quiz-results", JSON.stringify(quizData));

			// Navigate to survey
			navigate("/survey");
		} else {
			// Move to next question
			setCurrentQuestionIndex((prev) => prev + 1);
			setShowExplanation(false);
			setHasAnswered(false);
			setIsDark(false);
			setSelectedChoiceIndex(null);
		}
	};

	return (
		<motion.div
			className="flex flex-col justify-between px-4 w-full"
			style={{
				height: isMobile ? "calc(var(--vh, 1vh) * 100)" : "100vh",
				paddingBottom: isMobile ? "env(safe-area-inset-bottom)" : undefined,
			}}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.4 }}
		>
			{/* Top: Progress */}
			<div className="pt-4">
				<div className="h-2 bg-gray-200 rounded-full overflow-hidden">
					<div
						className="h-full bg-green-500 transition-all duration-500"
						style={{ width: `${progress}%` }}
					></div>
				</div>
			</div>

			{/* Scenario Section */}
			{currentQuiz.type === "ads" ? (
				<div className="flex flex-col flex-shrink-0 px-4 pt-4 mt-4">
					<div className="bg-white overflow-y-auto shadow-inner max-h-[calc(50vh-64px)] min-h-[40dvh]">
						<AdCard
							title={currentQuiz.redflag} // หรือ currentQuiz.title
							content={currentQuiz.content}
							image={currentQuiz.image}
							redflag={currentQuiz.redflag}
							hasAnswered={hasAnswered}
							type={currentQuiz.type}
							showRedflagInList={false} // ถ้า title เป็น redflag
						/>
					</div>
				</div>
			) : (
				<div className="flex flex-col flex-shrink-0 px-4 pt-4 mt-4">
					<ChatHeader />
					<div className="bg-white overflow-y-auto shadow-inner max-h-[calc(50vh-64px)] min-h-[40dvh]">
						<ChatMessage
							message={currentQuiz.content}
							redflag={currentQuiz.redflag}
							hasAnswered={hasAnswered}
						/>
					</div>
				</div>
			)}

			{/* Bottom Section */}
			<div className="relative w-full max-w-md mx-auto flex-grow px-4 pb-[env(safe-area-inset-bottom)]">
				{/* Explanation Overlay */}
				<div
					className={`absolute inset-0 transition-opacity duration-500 z-10 px-4 ${
						showExplanation && hasAnswered
							? "opacity-100 pointer-events-auto"
							: "opacity-0 pointer-events-none"
					}`}
				>
					<div className="p-4 space-y-4 bg-yellow-400 shadow-2xl border-4 border-yellow-500 mt-4">
						<div className="text-sm text-gray-900 leading-relaxed font-medium">
							<p className="whitespace-pre-line">
								{selectedChoiceIndex !== null &&
								currentQuiz.choices[selectedChoiceIndex]?.isCorrect
									? currentQuiz.explanation.correct
									: currentQuiz.explanation.incorrect}
							</p>
						</div>
						{currentQuiz.explanation.redFlags?.length > 0 && (
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
							onClick={handleNextQuestion}
							className="w-full min-h-[52px] text-base font-bold rounded-2xl bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-2"
						>
							{isLastQuestion ? "ไปแบบสำรวจ" : "ข้อถัดไป"}
						</button>
					</div>
				</div>

				{/* Questions */}
				<div
					className={`transition-opacity duration-500 ${
						showExplanation && hasAnswered
							? "opacity-0 pointer-events-none"
							: "opacity-100 pointer-events-auto"
					}`}
				>
					<div className="pt-4 pb-4 px-2 w-full">
						<p className="text-sm md:text-base text-foreground dark:text-foreground mb-3 text-start leading-relaxed break-words whitespace-pre-line">
							{currentQuiz.scenario}
						</p>
						<div className="space-y-3 flex flex-col items-center">
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
		</motion.div>
	);
};

export default Quiz;
