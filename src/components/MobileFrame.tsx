import type React from "react";

interface MobileFrameProps {
	children: React.ReactNode;
	redFlagChildren?: React.ReactNode; // เนื้อหา Red Flag สำหรับเครื่องใหม่
	shouldTearAway?: boolean;

	className?: string;
}

const MobileFrame: React.FC<MobileFrameProps> = ({
	children,
	redFlagChildren,
	shouldTearAway = false,

	className = "",
}) => {
	return (
		<div className={`relative mx-auto ${className}`}>
			{/* เครื่องเดิม - ร่วงลงไป */}
			<div
				className={`transition-all duration-1500 ease-in ${
					shouldTearAway
						? "opacity-0 transform rotate-[25deg] translate-y-[200%] translate-x-8 scale-75"
						: "opacity-100 transform rotate-0 translate-y-0 scale-100"
				}`}
				style={{
					transformOrigin: "center bottom",
					zIndex: shouldTearAway ? 1 : 2,
				}}
			>
				{/* Phone Frame เดิม */}
				<div className="relative bg-white rounded-[24px] overflow-hidden border-[8px] border-gray-300 shadow-2xl">
					{/* Status Bar */}
					<div className="bg-gray-100 h-6 flex items-center justify-center">
						<div className="w-16 h-3 bg-gray-400 rounded-full"></div>
					</div>

					{/* Screen Content เดิม */}
					<div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-[400px]">
						{children}
					</div>
				</div>
			</div>

			{/* เครื่องใหม่ - ลอยขึ้นมาแทน (Red Flag) */}
			<div
				className={`absolute inset-0 transition-all duration-1200 ease-out ${
					shouldTearAway
						? "opacity-100 transform translate-y-0 scale-100 rotate-0"
						: "opacity-0 transform -translate-y-full scale-90 rotate-[-15deg]"
				}`}
				style={{
					transitionDelay: shouldTearAway ? "800ms" : "0ms",
					zIndex: shouldTearAway ? 2 : 1,
				}}
			>
				{/* Phone Frame ใหม่ - สีแดงเตือนภัย */}
				<div className="relative bg-red-50 rounded-[24px] overflow-hidden border-[8px] border-red-400 shadow-2xl animate-pulse">
					{/* Status Bar - สีแดง */}
					<div className="bg-red-200 h-6 flex items-center justify-center">
						<div className="w-16 h-3 bg-red-500 rounded-full animate-pulse"></div>
					</div>

					{/* Screen Content ใหม่ - Red Flag */}
					<div className="bg-gradient-to-b from-red-50 to-red-100 min-h-[400px] relative">
						{redFlagChildren || children}

						{/* Overlay Warning Effect */}
						<div className="absolute inset-0 bg-red-500 opacity-10 animate-pulse pointer-events-none"></div>
					</div>
				</div>

				{/* Warning Badge บนเครื่องใหม่ */}
				<div className="absolute -top-3 -right-3 bg-red-600 text-white text-sm px-3 py-1 rounded-full shadow-lg animate-bounce z-10">
					🚨 DANGER!
				</div>

				{/* Additional Warning Indicators */}
				<div
					className="absolute -left-3 top-10 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full shadow-lg animate-bounce z-10"
					style={{ animationDelay: "0.2s" }}
				>
					⚠️ SCAM
				</div>
			</div>

			{/* Spacer เพื่อรักษาขนาด */}
			<div className="invisible">
				<div className="relative bg-white rounded-[24px] overflow-hidden border-[8px] border-gray-300">
					<div className="bg-gray-100 h-6"></div>
					<div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-[400px]"></div>
				</div>
			</div>
		</div>
	);
};

export default MobileFrame;
