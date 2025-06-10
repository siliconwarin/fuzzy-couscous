"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addAnswerToSession, getUserSession } from "@/utils/userSession";
import { quizQuestions } from "@/data/quizData";
import ProgressBar from "@/components/ProgressBar";
import AdCard from "@/components/AdCard";
import SmsCard from "@/components/SmsCard";
import ExplanationModal from "@/components/ExplanationModal";
import ChoiceButton from "@/components/ChoiceButton";
import MobileFrame from "@/components/MobileFrame";

const Quiz = () => {
	const navigate = useNavigate();
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [isAnswered, setIsAnswered] = useState(false);
	const [shouldTearAway, setShouldTearAway] = useState(false);
	const [showRedFlag, setShowRedFlag] = useState(false);
	const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
	const [showExplanationModal, setShowExplanationModal] = useState(false);

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
			questionId: currentQuestion.id.toString(),
			choiceId,
			isCorrect: selectedChoice.isCorrect,
			personality: selectedChoice.personality,
		});

		// Animation sequence following the exact flow:
		// 1. Answer selected → Start tear away animation
		// 2. Original content tears away downward with rotation
		// 3. Red flag content reveals from top
		// 4. Show explanation modal
		setTimeout(() => {
			setShouldTearAway(true); // Start tear away animation

			setTimeout(() => {
				setShowRedFlag(true); // Reveal red flag content from top

				setTimeout(() => {
					setShowExplanationModal(true); // Show explanation modal
				}, 1200); // Wait for red flag reveal to complete
			}, 600); // Wait for tear away to start
		}, 400); // Initial delay after answer selection
	};

	const handleNext = () => {
		if (isLastQuestion) {
			navigate("/survey");
		} else {
			// Reset all states for next question
			setCurrentQuestionIndex((prev) => prev + 1);
			setSelectedAnswer(null);
			setIsAnswered(false);
			setShouldTearAway(false);
			setShowRedFlag(false);
			setShowExplanationModal(false);
		}
	};

	const renderQuestionContent = () => {
		if (currentQuestion.type === "ads") {
			return (
				<AdCard
					title="เงินสดด่วน อนุมัติไว"
					content={currentQuestion.smsContent || ""}
					image={currentQuestion.image}
					highlight={currentQuestion.redflag}
					showRedFlag={showRedFlag} // คง showRedFlag ไว้ เพราะ AdCard และ SmsCard ยังใช้ในการตัดสินใจว่าจะแสดง redFlagContent หรือ normalContent เมื่อ shouldTearAway เป็น true
					// isAnswered={isAnswered} // ลบออก
					shouldTearAway={shouldTearAway}
				/>
			);
		}

		return (
			<SmsCard
				content={currentQuestion.smsContent || ""}
				highlight={currentQuestion.redflag}
				showRedFlag={showRedFlag} // คง showRedFlag ไว้
				// isAnswered={isAnswered} // ลบออก
				shouldTearAway={shouldTearAway}
			/>
		);
	};

	const questionCardOutput = renderQuestionContent();
	let normalCardContent: React.ReactNode;
	let redFlagCardContent: React.ReactNode | undefined;

	if (
		typeof questionCardOutput === "object" &&
		questionCardOutput !== null &&
		"normalContent" in questionCardOutput
	) {
		// กรณี AdCard/SmsCard return object { normalContent, redFlagContent }
		normalCardContent = (questionCardOutput as { normalContent: JSX.Element })
			.normalContent;
		redFlagCardContent = (questionCardOutput as { redFlagContent: JSX.Element })
			.redFlagContent;
	} else {
		// กรณี AdCard/SmsCard return JSX.Element โดยตรง
		normalCardContent = questionCardOutput as JSX.Element;
		// redFlagChildren ใน MobileFrame สามารถเป็น undefined ได้ ถ้าไม่มีเนื้อหาเฉพาะสำหรับ red flag
		// หรือจะให้แสดง normalContent ซ้ำก็ได้ ขึ้นอยู่กับการออกแบบ
		redFlagCardContent = normalCardContent;
	}

	return (
		<div
			className={`h-screen w-full overflow-hidden relative transition-all duration-1000 ${
				isAnswered
					? "bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800"
					: "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600"
			}`}
		>
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-10">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px)`,
						backgroundSize: "40px 40px",
					}}
				/>
			</div>

			{/* Main Container */}
			<div className="h-full w-full max-w-md mx-auto relative z-10 flex flex-col pt-safe-area-inset-top pb-safe-area-inset-bottom">
				{/* Fixed Progress Header */}
				<div className="flex-none mb-4">
					<div className="bg-white/90 backdrop-blur-md rounded-xl mx-4 shadow-lg">
						<ProgressBar
							current={progress}
							total={totalQuestions}
							answered={isAnswered}
						/>
					</div>
				</div>

				{/* Mobile Frame with Content */}
				<div className="flex-1 flex flex-col justify-center px-4">
					<MobileFrame
						shouldTearAway={shouldTearAway}
						// isAnswered={isAnswered} // ลบออก
						className="w-full max-w-xs mx-auto"
						redFlagChildren={redFlagCardContent} // ส่ง redFlagContent ที่เตรียมไว้
					>
						{normalCardContent} {/* ส่ง normalContent ที่เตรียมไว้ */}
					</MobileFrame>
				</div>

				{/* Scenario Text - Hidden when answered */}
				{!isAnswered && (
					<div className="flex-none px-4 pb-4 mt-4">
						<div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg">
							<h2 className="text-sm font-medium text-center text-gray-800 leading-relaxed">
								{currentQuestion.scenario}
							</h2>
						</div>
					</div>
				)}

				{/* Choice Buttons - Hidden when answered */}
				{!isAnswered && (
					<div className="flex-none px-4 pb-4">
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
					</div>
				)}
			</div>

			{/* Explanation Modal */}
			<ExplanationModal
				explanation={currentQuestion.explanation}
				isCorrect={isCorrectAnswer}
				onNext={handleNext}
				isLastQuestion={isLastQuestion}
				isOpen={showExplanationModal}
				onClose={() => setShowExplanationModal(false)}
			/>
		</div>
	);
};

export default Quiz;
