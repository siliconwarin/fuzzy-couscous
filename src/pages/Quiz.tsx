"use client";

import { useState, useEffect } from "react";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatMessage } from "@/components/ChatMessage";
import { QuestionButton } from "@/components/QuestionButton";
import { HighlightText } from "@/components/HighlightText";
import { quizQuestions } from "@/data/dataQuiz";

const Quiz = () => {
	const [isDark, setIsDark] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const [showExplanation, setShowExplanation] = useState(false);
	const [highlightedText, setHighlightedText] = useState("");
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

		setCurrentStep(1);
		setHighlightedText(currentQuiz.choices[questionIndex].text);
		setHasAnswered(true);

		// Switch to dark theme when user answers
		setIsDark(true);
		setShowExplanation(true);
	};

	return (
		<div className="min-h-screen bg-background dark:bg-background transition-colors duration-300">
			{/* Mobile-First Layout Container */}
			<div className="flex flex-col h-screen max-w-md mx-auto bg-background dark:bg-background shadow-lg">
				{/* Chat Header - Fixed at top */}
				<div className="flex-shrink-0 mt-4 mx-4">
					<ChatHeader />
					{/* Messages Area - Scrollable middle section with padding */}
					<div className="flex-1 h-[350px] overflow-y-auto pt-4 pb-4 ">
						<div className="px-3 sm:px-4 space-y-3 sm:space-y-4">
							{/* SMS Message */}
							<ChatMessage
								message={currentQuiz.smsContent}
								link={currentQuiz.redflag}
								hasAnswered={hasAnswered}
							/>
						</div>
					</div>
				</div>

				{/* Bottom Section - Questions or Explanation */}
				<div className="flex-shrink-0">
					{showExplanation && hasAnswered ? (
						/* Explanation Section - Dark Theme */
						<div className="p-4 sm:p-5 bg-background dark:bg-background">
							<div className="p-4 sm:p-5 rounded-lg">
								<p className="text-xs sm:text-sm text-foreground dark:text-foreground leading-relaxed">
									กลโกงนี้เริ่มจากมิจฉาชีพโทรมาอ้างว่าคุณมีคดี
									และหลอกให้แอดไลน์ไปคุยต่อ พร้อมส่ง
									บัตรตำรวจหรือหมายเรียกปลอมมาให้ดู เพื่อ ทำให้คุณเชื่อและกลัว
									จากนั้นจะอ้างจำเป็นต้องโอน เงินเพื่อตรวจสอบเส้นทางการเงิน
									และกดดันให้ คุณรีบโอนโดยไม่ให้ปรึกษาใคร จำไว้ว่า{" "}
									<HighlightText isHighlighted={true}>
										{currentQuiz.redflag}
									</HighlightText>{" "}
									เป็นสัญญาณเตือนภัยที่ชัดเจน
								</p>
							</div>
						</div>
					) : (
						/* Questions Section - Light Theme */
						<div className="flex-1 h-[350px] pt-4 pb-4 px-8 bg-background dark:bg-background">
							<p className="text-md text-foreground dark:text-foreground mb-3 sm:mb-4 text-start leading-relaxed">
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
					)}
				</div>
			</div>
		</div>
	);
};

export default Quiz;
