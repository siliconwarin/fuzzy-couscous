import React from "react";
import {
	Heart,
	MessageCircle,
	Share,
	Bookmark,
	MoreHorizontal,
} from "lucide-react";

// AdCard Component
interface AdCardProps {
	title: string;
	content: string;
	redflag?: string;
	hasAnswered: boolean;
	image?: string;
	type?: string;
	showRedflagInList?: boolean;
}

const Highlight = ({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<span className={`bg-yellow-200 px-1 py-0.5 rounded ${className}`}>
		{children}
	</span>
);

const AdCard: React.FC<AdCardProps> = ({
	title,
	content,
	redflag,
	hasAnswered,
	image,
	type = "ads",
	showRedflagInList = true,
}) => {
	const contentList = content
		.split("\n")
		.filter((line: string) => line.trim() !== "");

	const shouldShowRedflagInList = showRedflagInList && title !== redflag;

	return (
		<div className="w-full h-[280px] relative overflow-hidden bg-gradient-to-br from-orange-100 to-yellow-50">
			{/* Title */}
			<div className="absolute left-4 top-4 z-10 text-left space-y-2 max-w-[60%]">
				<h2 className="text-lg font-bold text-orange-700 animate-fade-in">
					{title}
				</h2>
				<ul className="text-sm text-orange-600 list-disc list-inside space-y-1">
					{contentList.map((line: string, idx: number) => (
						<li key={idx}>
							{redflag && shouldShowRedflagInList && line.includes(redflag)
								? type === "ads"
									? line
									: line.split(redflag).map((part, i, arr) => (
											<span key={i}>
												{part}
												{i < arr.length - 1 &&
													(hasAnswered ? (
														<Highlight className="inline-block px-1">
															{redflag}
														</Highlight>
													) : (
														<span className="text-blue-600 underline cursor-default select-text">
															{redflag}
														</span>
													))}
											</span>
									  ))
								: line}
						</li>
					))}
				</ul>
			</div>

			{/* Image */}
			<div className="absolute right-4 bottom-4 z-0 w-32 h-32 animate-bounce">
				{image && (
					<img
						src={image}
						width={128}
						height={128}
						className="object-contain"
						alt="Advertisement"
						onError={(e) => {
							(e.currentTarget as HTMLImageElement).src =
								"/placeholder.svg?height=80&width=80";
						}}
					/>
				)}
			</div>

			{/* BG Effect */}
			<div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-100 via-orange-100 to-transparent animate-pulse" />
		</div>
	);
};

const SocialFeedMockup = () => {
	const [isLiked, setIsLiked] = React.useState(false);
	const [likes, setLikes] = React.useState(1247);

	const handleLike = () => {
		setIsLiked(!isLiked);
		setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-4 flex items-center justify-center">
			{/* Mobile Frame */}
			<div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
				{/* Feed Header */}
				<div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
					<div className="flex items-center space-x-3">
						<div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
							<span className="text-white font-bold text-sm">BK</span>
						</div>
						<div>
							<h3 className="font-semibold text-gray-900 text-sm">
								ธนาคารกรุงเทพ
							</h3>
							<p className="text-gray-500 text-xs">2 ชั่วโมงที่แล้ว</p>
						</div>
					</div>
					<button className="p-2 hover:bg-gray-100 rounded-full">
						<MoreHorizontal className="w-5 h-5 text-gray-600" />
					</button>
				</div>

				{/* Main Content Card - Using AdCard */}
				<AdCard title={""} content={""} hasAnswered={false} />

				{/* Feed Footer */}
				<div className="bg-white p-4 border-t border-gray-100">
					{/* Action Buttons */}
					<div className="flex items-center justify-between mb-3">
						<div className="flex items-center space-x-4">
							<button
								onClick={handleLike}
								className={`flex items-center space-x-1 transition-all duration-200 ${
									isLiked
										? "text-red-500 scale-110"
										: "text-gray-600 hover:text-red-500"
								}`}
							>
								<Heart className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`} />
							</button>

							<button className="text-gray-600 hover:text-blue-500 transition-colors">
								<MessageCircle className="w-6 h-6" />
							</button>

							<button className="text-gray-600 hover:text-green-500 transition-colors">
								<Share className="w-6 h-6" />
							</button>
						</div>

						<button className="text-gray-600 hover:text-yellow-500 transition-colors">
							<Bookmark className="w-6 h-6" />
						</button>
					</div>

					{/* Stats */}
					<div className="space-y-1">
						<div className="text-sm font-semibold text-gray-900">
							{likes.toLocaleString()} คนถูกใจ
						</div>
						<button className="text-sm text-gray-500 hover:text-gray-700">
							ดูความคิดเห็นทั้งหมด 43 รายการ
						</button>
						<div className="text-xs text-gray-400 mt-2">
							เมื่อ 2 ชั่วโมงที่แล้ว
						</div>
					</div>
				</div>

				{/* Bottom Navigation Hint */}
				<div className="h-1 bg-gray-100"></div>
			</div>

			{/* Side Decorations */}
			<div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-32 bg-white/20 rounded-full blur-sm"></div>
			<div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-32 bg-white/20 rounded-full blur-sm"></div>
			<div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-white/20 rounded-full blur-sm"></div>
		</div>
	);
};

export default SocialFeedMockup;
