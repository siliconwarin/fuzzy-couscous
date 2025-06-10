import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SmsContent } from "./SmsContent";

interface AdContentProps {
	title: string;
	image?: string;
	highlight?: string;
	showRedFlag?: boolean;
}

const AdContent: React.FC<AdContentProps> = ({
	title,
	image,
	highlight,
	showRedFlag = false,
}) => (
	<div className="bg-blue-700 p-3 rounded-lg flex items-center space-x-3">
		<div className="flex-1 text-white">
			<div className="text-yellow-300 text-base font-bold mb-2">
				<SmsContent
					content={title}
					highlight={showRedFlag ? highlight : undefined}
				/>
			</div>
			<div className="space-y-1 text-xs">
				<div>ไม่ตรวจสอบเครดิต</div>
				<div>ไม่ต้องใช้เอกสารใดๆ</div>
				<div>ดอกน้อยร้อยละ 0.5</div>
				<div>เงินเข้าใน 3 นาที</div>
			</div>
		</div>
		{image && (
			<div className="w-16 h-16 shrink-0">
				<img
					src={image}
					alt="Advertisement character"
					className="w-full h-full object-cover rounded-full"
				/>
			</div>
		)}
	</div>
);

interface AdCardProps {
	title: string;
	image?: string;
	highlight?: string;
	answered: boolean;
	shouldTearAway?: boolean;
	showRedFlag?: boolean;
}

export const AdCard: React.FC<AdCardProps> = ({
	title,
	image,
	highlight,
	shouldTearAway = false,
	showRedFlag = false,
}) => (
	<Card className="transition-all duration-300 shadow-lg relative overflow-hidden">
		<CardContent className="p-0 relative">
			{/* Layer 1: Original Content (will be torn away) */}
			<div
				className={`absolute inset-0 p-3 transition-all duration-1000 ease-in-out ${
					shouldTearAway
						? "transform translate-y-full opacity-0 rotate-180 scale-95"
						: "transform translate-y-0 opacity-100 rotate-0 scale-100"
				}`}
			>
				<AdContent
					title={title}
					image={image}
					highlight={highlight}
					showRedFlag={false}
				/>
			</div>

			{/* Layer 2: Content with Red Flag (revealed after tear) */}
			<div
				className={`absolute inset-0 p-3 transition-all duration-1000 ease-out delay-300 ${
					shouldTearAway
						? "opacity-100 transform scale-100 translate-y-0"
						: "opacity-0 transform scale-95 translate-y-4"
				}`}
			>
				<AdContent
					title={title}
					image={image}
					highlight={highlight}
					showRedFlag={showRedFlag}
				/>
			</div>

			{/* Spacer to maintain height */}
			<div className="invisible">
				<AdContent title={title} image={image} />
			</div>
		</CardContent>
	</Card>
);
