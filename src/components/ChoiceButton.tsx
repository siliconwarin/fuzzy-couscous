import type { QuizChoice } from "@/types/quiz";

interface ChoiceButtonProps {
	choice: QuizChoice;
	onClick: () => void;
	isSelected?: boolean;
	disabled?: boolean;
}

const ChoiceButton = ({
	choice,
	onClick,
	isSelected,
	disabled,
}: ChoiceButtonProps) => {
	return (
		<div className="container mx-auto">
			<button
				onClick={onClick}
				disabled={disabled}
				className={`
          relative w-full p-3 text-center font-medium tracking-wide
          border-2 rounded-full transition-all duration-300 ease-in-out
          overflow-hidden transform cursor-pointer touch-manipulation min-h-[48px]
          ${
						isSelected
							? choice.isCorrect
								? "border-green-500 bg-green-500 scale-[1.02] ring-1 ring-green-200 shadow-md"
								: "border-red-500 bg-red-500 scale-[1.02] ring-1 ring-red-200 shadow-md"
							: disabled
							? "border-gray-200 bg-gray-50 cursor-not-allowed"
							: "border-blue-300 bg-linear-to-r from-blue-50 to-indigo-50 active:scale-[0.98] active:bg-blue-100"
					}
        `}
				style={{
					boxShadow: isSelected
						? choice.isCorrect
							? "0 0 15px rgba(34, 197, 94, 0.2)"
							: "0 0 15px rgba(239, 68, 68, 0.2)"
						: !disabled
						? "0 2px 10px rgba(0, 0, 0, 0.05)"
						: "none",
				}}
			>
				{/* Star animations - only show when answer is correct */}
				{isSelected && choice.isCorrect && (
					<>
						{/* Star 1 */}
						<div className="star-1 absolute pointer-events-none animate-star-1">
							<svg
								className="w-4 h-4 text-yellow-300 drop-shadow-md"
								viewBox="0 0 784.11 815.53"
								fill="currentColor"
							>
								<path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
							</svg>
						</div>

						{/* Star 2 */}
						<div className="star-2 absolute pointer-events-none animate-star-2">
							<svg
								className="w-3 h-3 text-yellow-200 drop-shadow-md"
								viewBox="0 0 784.11 815.53"
								fill="currentColor"
							>
								<path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
							</svg>
						</div>

						{/* Star 3 */}
						<div className="star-3 absolute pointer-events-none animate-star-3">
							<svg
								className="w-2 h-2 text-yellow-100 drop-shadow-md"
								viewBox="0 0 784.11 815.53"
								fill="currentColor"
							>
								<path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
							</svg>
						</div>
					</>
				)}

				{/* Shadow effect */}
				<div
					className={`
            absolute inset-0 rounded-full -z-10 top-1
            transition-all duration-300 ease-out
            ${
							isSelected
								? choice.isCorrect
									? "bg-green-400"
									: "bg-red-400"
								: disabled
								? "bg-gray-100"
								: "bg-linear-to-r from-blue-100 to-indigo-100"
						}
          `}
				/>

				<div className="flex items-center justify-between w-full relative z-10">
					{/* Choice text */}
					<span
						className={`text-xs leading-normal font-medium ${
							isSelected
								? "text-white"
								: disabled
								? "text-gray-400"
								: "text-gray-800"
						}`}
					>
						{choice.text}
					</span>

					{/* Check/X icon for selected states */}
					{isSelected && (
						<div className="shrink-0 ml-2">
							{choice.isCorrect ? (
								<svg
									className="w-3.5 h-3.5 text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
							) : (
								<svg
									className="w-3.5 h-3.5 text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							)}
						</div>
					)}
				</div>

				{/* Custom styles for star animations */}
				<style>{`
          .star-1 {
            top: 15%;
            left: 15%;
          }
          .star-2 {
            top: 40%;
            left: 40%;
          }
          .star-3 {
            top: 35%;
            left: 35%;
          }
          .star-4 {
            top: 15%;
            left: 35%;
          }
          .star-5 {
            top: 20%;
            left: 40%;
          }
          .star-6 {
            top: 5%;
            left: 45%;
          }

          @keyframes starFloat1 {
            0% { 
              opacity: 0; 
              transform: translate(0, 0) scale(0.5); 
            }
            20% { 
              opacity: 1; 
              transform: translate(-20px, -40px) scale(1); 
            }
            100% { 
              opacity: 0.8; 
              transform: translate(-40px, -80px) scale(0.8); 
              filter: drop-shadow(0 0 15px rgba(253, 224, 71, 0.9));
            }
          }

          @keyframes starFloat2 {
            0% { 
              opacity: 0; 
              transform: translate(0, 0) scale(0.3); 
            }
            30% { 
              opacity: 1; 
              transform: translate(10px, -30px) scale(1); 
            }
            100% { 
              opacity: 0.7; 
              transform: translate(20px, -60px) scale(0.7); 
              filter: drop-shadow(0 0 12px rgba(253, 224, 71, 0.8));
            }
          }

          @keyframes starFloat3 {
            0% { 
              opacity: 0; 
              transform: translate(0, 0) scale(0.2); 
            }
            40% { 
              opacity: 1; 
              transform: translate(15px, 40px) scale(1); 
            }
            100% { 
              opacity: 0.6; 
              transform: translate(30px, 80px) scale(0.6); 
              filter: drop-shadow(0 0 10px rgba(253, 224, 71, 0.7));
            }
          }

          @keyframes starFloat4 {
            0% { 
              opacity: 0; 
              transform: translate(0, 0) scale(0.4); 
            }
            25% { 
              opacity: 1; 
              transform: translate(25px, 10px) scale(1); 
            }
            100% { 
              opacity: 0.8; 
              transform: translate(50px, 20px) scale(0.8); 
              filter: drop-shadow(0 0 8px rgba(253, 224, 71, 0.8));
            }
          }

          @keyframes starFloat5 {
            0% { 
              opacity: 0; 
              transform: translate(0, 0) scale(0.3); 
            }
            35% { 
              opacity: 1; 
              transform: translate(30px, 5px) scale(1); 
            }
            100% { 
              opacity: 0.7; 
              transform: translate(60px, 10px) scale(0.7); 
              filter: drop-shadow(0 0 12px rgba(253, 224, 71, 0.8));
            }
          }

          @keyframes starFloat6 {
            0% { 
              opacity: 0; 
              transform: translate(0, 0) scale(0.2); 
            }
            45% { 
              opacity: 1; 
              transform: translate(10px, -15px) scale(1); 
            }
            100% { 
              opacity: 0.5; 
              transform: translate(20px, -30px) scale(0.5); 
              filter: drop-shadow(0 0 8px rgba(253, 224, 71, 0.6));
            }
          }

          .animate-star-1 {
            animation: starFloat1 2s ease-out forwards;
          }
          .animate-star-2 {
            animation: starFloat2 2.2s ease-out 0.1s forwards;
          }
          .animate-star-3 {
            animation: starFloat3 2.4s ease-out 0.2s forwards;
          }
          .animate-star-4 {
            animation: starFloat4 2.1s ease-out 0.15s forwards;
          }
          .animate-star-5 {
            animation: starFloat5 2.3s ease-out 0.25s forwards;
          }
          .animate-star-6 {
            animation: starFloat6 2s ease-out 0.3s forwards;
          }

          /* Mobile optimizations */
          @media (max-width: 768px) {
            .star-1, .star-2, .star-3, .star-4, .star-5, .star-6 {
              transform-origin: center;
            }
            
            @keyframes starFloat1 {
              0% { 
                opacity: 0; 
                transform: translate(0, 0) scale(0.3); 
              }
              20% { 
                opacity: 1; 
                transform: translate(-15px, -30px) scale(0.8); 
              }
              100% { 
                opacity: 0.8; 
                transform: translate(-30px, -60px) scale(0.6); 
              }
            }
            
            @keyframes starFloat2 {
              100% { 
                opacity: 0.7; 
                transform: translate(15px, -45px) scale(0.5); 
              }
            }
            
            @keyframes starFloat3 {
              100% { 
                opacity: 0.6; 
                transform: translate(20px, 60px) scale(0.4); 
              }
            }
          }
        `}</style>
			</button>
		</div>
	);
};

export default ChoiceButton;
