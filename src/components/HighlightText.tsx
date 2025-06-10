import type React from "react";

interface HighlightTextProps {
	children: React.ReactNode;
	isHighlighted: boolean;
}

export const HighlightText = ({
	children,
	isHighlighted,
}: HighlightTextProps) => {
	return (
		<span className={`${isHighlighted ? "highlight-pink" : ""}`}>
			{children}
		</span>
	);
};
