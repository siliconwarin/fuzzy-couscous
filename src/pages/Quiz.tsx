"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ScenarioSection } from "@/components/ScenarioSection";
import { ExplanationOverlay } from "@/components/ExplanationOverlay";
import { QuestionSection } from "@/components/QuestionSection";
import { quizQuestions } from "@/data/dataQuiz";
import type { UserAnswer } from "@/types/quiz";

const Quiz = () => {
	const navigate = useNavigate();
	const [isDark, setIsDark] = useState(false);
	const [showExplanation, setShowExplanation] = useState(false);
	const [hasAnswered, setHasAnswered] = useState(false);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
	const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
	
		
	useEffect(() => {
		const setVh = () => {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		};
		setVh();
		window.addEventListener('resize', setVh);
		return () => window.removeEventListener('resize', setVh);
	}, []);

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

	// Simple layout with fixed sections
	return (
		<div className="flex flex-col h-screen max-h-screen overflow-hidden bg-white dark:bg-gray-900">
			{/* Progress Bar */}
			<div className="px-4 pt-4">
				<div className="h-2 bg-gray-200 rounded-full overflow-hidden">
					<div 
						className="h-full bg-green-500 transition-all duration-500"
						style={{ width: `${progress}%` }}
					></div>
				</div>
			</div>

			{/* Main Content */}
			<main className="flex-1 overflow-y-auto">
				<ScenarioSection quiz={currentQuiz} hasAnswered={hasAnswered} />
			</main>

			{/* Question/Answer Section - Fixed at bottom */}
			<div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
				{showExplanation ? (
					<ExplanationOverlay
						show={showExplanation}
						hasAnswered={hasAnswered}
						quiz={currentQuiz}
						selectedChoiceIndex={selectedChoiceIndex}
						isLastQuestion={isLastQuestion}
						onNext={handleNextQuestion}
					/>
				) : (
					<QuestionSection
						quiz={currentQuiz}
						showExplanation={false}
						onClick={handleQuestionClick}
					/>
				)}
			</div>
		</div>
	);
};

export default Quiz;
