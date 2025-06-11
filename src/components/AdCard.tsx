import React from 'react';
import type { AdContent } from '@/types/quiz';

interface AdCardProps {
  ad: AdContent;
  hasAnswered: boolean;
  redflag?: string;
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
  ad,
  hasAnswered,
  redflag,
  type = "ads",
  showRedflagInList = true,
}) => {
  const { title, description, image } = ad;
  const contentList = (description || '')
    .split('\n')
    .filter((line: string) => line.trim() !== '');

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

export default AdCard;
