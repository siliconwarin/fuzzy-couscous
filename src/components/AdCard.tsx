import React from "react";

interface AdCardProps {
	title: string;
	content: string;
	image?: string;
	highlight?: string;
	showRedFlag?: boolean;

	shouldTearAway?: boolean;
}

const AdCard: React.FC<AdCardProps> = ({
	title,
	content,
	image,
	highlight,
	showRedFlag = false,

	shouldTearAway = false,
}) => {
	const renderContentWithHighlight = (showFlag: boolean) => {
		if (!highlight || !showFlag) {
			return <span className="whitespace-pre-line">{content}</span>;
		}

		const parts = content.split(highlight);
		return (
			<span className="whitespace-pre-line">
				{parts.map((part, index, array) => (
					<React.Fragment key={index}>
						{part}
						{index < array.length - 1 && (
							<span className="bg-pink-500 text-white px-2 py-1 rounded font-bold animate-pulse shadow-lg">
								{highlight}
							</span>
						)}
					</React.Fragment>
				))}
			</span>
		);
	};

	// เนื้อหาปกติ (อยู่ในเครื่องเดิมที่จะร่วง)
	const normalContent = (
		<div className="p-3">
			<div className="bg-indigo-800 rounded-lg overflow-hidden shadow-lg">
				{/* Ad Header */}
				<div className="bg-pink-500 p-2 flex items-center">
					<span className="text-white font-bold">🏳️ {title}</span>
				</div>

				{/* Ad Content */}
				<div className="p-4 text-white space-y-2">
					<div className="text-sm">{renderContentWithHighlight(false)}</div>

					<div className="flex justify-end">
						{image && (
							<img
								src={image || "/placeholder.svg"}
								alt="Advertisement"
								className="w-20 h-20 object-contain rounded-lg"
								onError={(e) => {
									e.currentTarget.src = "/placeholder.svg?height=80&width=80";
								}}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);

	// เนื้อหา Red Flag (สำหรับเครื่องใหม่)
	const redFlagContent = (
		<div className="p-3">
			<div className="bg-red-900 rounded-lg overflow-hidden shadow-2xl border-2 border-red-400 animate-pulse">
				{/* Ad Header - แสดงเตือนภัย */}
				<div className="bg-red-600 p-2 flex items-center justify-between">
					<span className="text-white font-bold">🚨 {title}</span>
					<span className="text-yellow-300 animate-bounce">⚠️ SCAM!</span>
				</div>

				{/* Ad Content with Red Flag */}
				<div className="p-4 text-white space-y-2 relative">
					<div className="text-sm">{renderContentWithHighlight(true)}</div>

					<div className="flex justify-end">
						{image && (
							<div className="relative">
								<img
									src={image || "/placeholder.svg"}
									alt="Advertisement"
									className="w-20 h-20 object-contain rounded-lg opacity-75"
									onError={(e) => {
										e.currentTarget.src = "/placeholder.svg?height=80&width=80";
									}}
								/>
								{/* Warning overlay บนรูป */}
								<div className="absolute inset-0 bg-red-500 bg-opacity-30 rounded-lg flex items-center justify-center">
									<span className="text-white text-2xl animate-pulse">🚫</span>
								</div>
							</div>
						)}
					</div>

					{/* Warning Message */}
					<div className="bg-red-800 border-2 border-red-400 rounded-lg p-2 mt-3">
						<p className="text-yellow-300 text-xs font-bold animate-pulse">
							🔥 นี่คือ การฉ้อโกง! อย่าคลิกลิงก์หรือให้ข้อมูล!
						</p>
					</div>
				</div>
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

export default AdCard;
