"use client";

import React from "react";

interface SMSBubbleProps {
	content: string;
	redflag?: string;
	showRedFlag?: boolean;
	isScam?: boolean;
}

const SMSBubble: React.FC<SMSBubbleProps> = ({
	content,
	redflag,
	showRedFlag = false,
	isScam = false,
}) => {
	const renderContentWithHighlight = () => {
		if (!redflag || !showRedFlag) {
			return (
				<span className="whitespace-pre-line text-gray-800">{content}</span>
			);
		}

		const parts = content.split(redflag);
		return (
			<span className="whitespace-pre-line text-gray-800">
				{parts.map((part, index, array) => (
					<React.Fragment key={index}>
						{part}
						{index < array.length - 1 && (
							<span className="bg-pink-500 text-white px-2 py-1 rounded font-bold animate-pulse shadow-lg">
								{redflag}
							</span>
						)}
					</React.Fragment>
				))}
			</span>
		);
	};

	return (
		<div
			className={`rounded-xl p-3 mx-3 relative shadow-sm ${
				isScam
					? "bg-red-100 border-2 border-red-400 animate-pulse"
					: "bg-blue-100"
			}`}
		>
			<div
				className={`absolute -left-2 top-3 w-0 h-0 border-t-[8px] border-t-transparent border-r-[8px] border-b-[8px] border-b-transparent ${
					isScam ? "border-r-red-100" : "border-r-blue-100"
				}`}
			></div>
			<p className="text-sm leading-relaxed">{renderContentWithHighlight()}</p>

			{/* Warning overlay สำหรับ scam */}
			{isScam && (
				<div className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 py-0.5 rounded animate-bounce">
					🚨
				</div>
			)}
		</div>
	);
};

interface SmsCardProps {
	content: string;
	highlight?: string;
	showRedFlag?: boolean;

	shouldTearAway?: boolean;
}

const SmsCard: React.FC<SmsCardProps> = ({
	content,
	highlight,
	showRedFlag = false,

	shouldTearAway = false,
}) => {
	// เนื้อหาปกติ (อยู่ในเครื่องเดิมที่จะร่วง)
	const normalContent = (
		<div className="space-y-3 p-3">
			{/* Contact Header */}
			<div className="flex items-center gap-2 mb-4">
				<div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
					<span className="text-white text-xs">📱</span>
				</div>
				<div>
					<div className="text-sm font-medium text-gray-800">ธนาคาร</div>
					<div className="text-xs text-gray-500">วันนี้ 10:30</div>
				</div>
			</div>

			{/* SMS Content */}
			<SMSBubble content={content} showRedFlag={false} />
		</div>
	);

	// เนื้อหา Red Flag (สำหรับเครื่องใหม่)
	const redFlagContent = (
		<div className="space-y-3 p-3">
			{/* Contact Header - Scam Warning */}
			<div className="flex items-center gap-2 mb-4">
				<div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-sm animate-pulse">
					<span className="text-white text-xs">💀</span>
				</div>
				<div>
					<div className="text-sm font-medium text-red-800 flex items-center gap-1">
						<span className="line-through">ธนาคาร</span>
						<span className="bg-red-600 text-white px-2 py-0.5 rounded text-xs animate-pulse">
							FAKE!
						</span>
					</div>
					<div className="text-xs text-red-600 font-bold">
						🚨 นี่คือข้อความฉ้อโกง! 🚨
					</div>
				</div>
			</div>

			{/* SMS Content with Red Flag */}
			<div className="relative">
				<SMSBubble
					content={content}
					redflag={highlight}
					showRedFlag={true}
					isScam={true}
				/>

				{/* Floating Warning Messages */}
				<div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full shadow-lg animate-bounce z-10">
					🚩 SCAM!
				</div>
			</div>

			{/* Warning Information Panel */}
			<div className="bg-red-900 border-2 border-red-400 rounded-lg p-3 mt-4 animate-pulse">
				<h4 className="text-red-200 font-bold text-xs mb-2 flex items-center gap-1">
					⚠️ สัญญาณเตือนการฉ้อโกง:
				</h4>
				<ul className="space-y-1">
					<li className="text-red-200 text-xs flex items-start">
						<span className="text-red-400 mr-1">•</span>
						ลิงก์ปลอม / URL น่าสงสัย
					</li>
					<li className="text-red-200 text-xs flex items-start">
						<span className="text-red-400 mr-1">•</span>
						เร่งรัดให้กดลิงก์ทันที
					</li>
					<li className="text-red-200 text-xs flex items-start">
						<span className="text-red-400 mr-1">•</span>
						อ้างปัญหาบัญชีเร่งด่วน
					</li>
				</ul>
			</div>
		</div>
	);

	// ถ้าต้องการให้มือถือร่วง ให้ return เป็น object ที่มีทั้ง 2 เนื้อหา
	if (shouldTearAway) {
		return {
			normalContent,
			redFlagContent: showRedFlag ? redFlagContent : normalContent,
		};
	}

	// ถ้าไม่ร่วง ให้แสดงแบบเดิม
	return normalContent;
};

export default SmsCard;
