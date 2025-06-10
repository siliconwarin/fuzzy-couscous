import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addAnswerToSession, getUserSession } from "@/utils/userSession";
import { quizQuestions } from "@/data/quizData";
import ProgressBar from "@/components/ProgressBar";
import { AdCard } from "@/components/AdCard";
import { SmsCard } from "@/components/SmsCard";
import ExplanationCard from "@/components/ExplanationCard";
import ChoiceButton from "@/components/ChoiceButton";

const Quiz = () => {
	const navigate = useNavigate();
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [showExplanation, setShowExplanation] = useState(false);
	// Enhanced state management for paper tear effect
	const [isAnswered, setIsAnswered] = useState(false);
	const [shouldTearAway, setShouldTearAway] = useState(false);
	const [showRedFlag, setShowRedFlag] = useState(false);
	const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
	const currentQuestion = quizQuestions[currentQuestionIndex];
	const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
	const progress = currentQuestionIndex + 1;
	const totalQuestions = quizQuestions.length;

	useEffect(() => {
		const session = getUserSession();
		if (!session) {
			navigate("/");
		}
	}, [navigate]);

	const handleAnswerSelect = (choiceId: string) => {
		if (isAnswered) return;

		const selectedChoice = currentQuestion.choices.find(
			(c) => c.id === choiceId
		);
		if (!selectedChoice) return;

		setSelectedAnswer(choiceId);
		setIsAnswered(true);
		setIsCorrectAnswer(selectedChoice.isCorrect);

		addAnswerToSession({
			questionId: currentQuestion.id,
			choiceId,
			isCorrect: selectedChoice.isCorrect,
			personality: selectedChoice.personality,
		});

		// Paper Tear Timeline
		setTimeout(() => {
			setShouldTearAway(true);
			setTimeout(() => {
				setShowRedFlag(true);
				setTimeout(() => {
					setShowExplanation(true);
				}, 2500);
			}, 500);
		}, 1500);
	};

	const handleNext = () => {
		if (isLastQuestion) {
			navigate("/survey");
		} else {
			// Reset all states for next question
			setCurrentQuestionIndex((prev) => prev + 1);
			setSelectedAnswer(null);
			setShowExplanation(false);
			setIsAnswered(false);
			setShouldTearAway(false);
			setShowRedFlag(false);
		}
	};

	const renderQuestionCard = () => {
		if (currentQuestion.type === "ads" && currentQuestion.image) {
			return (
				<AdCard
					title="เงินสดด่วน อนุมัติไว"
					image={currentQuestion.image}
					highlight={currentQuestion.redflag}
					answered={isAnswered}
					shouldTearAway={shouldTearAway}
					showRedFlag={showRedFlag}
				/>
			);
		}

		return (
			<SmsCard
				content={currentQuestion.smsContent}
				highlight={currentQuestion.redflag}
				answered={isAnswered}
				shouldTearAway={shouldTearAway}
				showRedFlag={showRedFlag}
			/>
		);
	};

	return (
		<div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
			{/* Safe area for mobile */}
			<div className="h-screen w-full max-w-md mx-auto bg-white shadow-xl flex flex-col">
				{/* Fixed header with progress */}
				<div className="flex-none bg-white border-b border-gray-200">
					<div className="pt-safe-area-inset-top">
						<ProgressBar current={progress} total={totalQuestions} />
					</div>
				</div>

				{/* Main content */}
				<div
					className={`flex-1 flex flex-col transition-colors duration-1000 ${
						isAnswered
							? "bg-gradient-to-br from-blue-900 to-indigo-900"
							: "bg-white"
					}`}
				>
					{/* Question section */}
					<div className="flex-none px-4 pt-4">
						{renderQuestionCard()}

						<div
							className={`mt-4 p-3 rounded-xl transition-all duration-1000 ${
								isAnswered ? "text-white" : "text-gray-800"
							} ${showExplanation ? "opacity-0" : "opacity-100"}`}
						>
							<h2 className="text-base font-bold leading-tight text-center">
								{currentQuestion.scenario}
							</h2>
						</div>
					</div>

					{/* Choices/Explanation section */}
					<div className="flex-1 flex flex-col justify-center px-4 pb-safe-area-inset-bottom">
						{!showExplanation ? (
							<div className="space-y-2">
								{currentQuestion.choices.map((choice) => (
									<ChoiceButton
										key={choice.id}
										choice={choice}
										onClick={() => handleAnswerSelect(choice.id)}
										isSelected={selectedAnswer === choice.id}
										disabled={isAnswered}
									/>
								))}
							</div>
						) : (
							<div className="flex-1 flex items-start">
								<ExplanationCard
									explanation={currentQuestion.explanation}
									isCorrect={isCorrectAnswer}
									onNext={handleNext}
									isLastQuestion={isLastQuestion}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Quiz;
