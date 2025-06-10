import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { initializeUserSession } from "@/utils/userSession";

const Index: React.FC = () => {
	const navigate = useNavigate();

	const handleStartQuiz = () => {
		initializeUserSession();
		navigate("/quiz");
	};

	return (
		<div className="h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4 overflow-hidden">
			<Card className="w-full max-w-md mx-auto flex flex-col h-full max-h-[90vh]">
				<CardHeader className="text-center pt-safe-area-inset-top">
					<CardTitle className="text-xl font-bold text-blue-900 mb-1">
						🛡️ Scam Savvy
					</CardTitle>
					<p className="text-sm text-blue-700">ทดสอบความรู้เรื่องการหลอกลวงออนไลน์</p>
				</CardHeader>

				<CardContent className="flex-1 flex flex-col justify-between space-y-4 overflow-y-auto p-4">
					<div className="bg-blue-50 p-3 rounded-lg">
						<h3 className="font-semibold text-blue-800 mb-1 text-base">วิธีเล่น:</h3>
						<ul className="text-xs text-blue-700 space-y-0.5">
							<li>• อ่านสถานการณ์ที่กำหนดให้</li>
							<li>• เลือกคำตอบที่คุณคิดว่าถูกต้อง</li>
							<li>• เรียนรู้เหตุผลและสัญญาณเตือนภัย</li>
							<li>• ใช้เวลาประมาณ 5 นาที</li>
						</ul>
					</div>

					<Button
						onClick={handleStartQuiz}
						className="w-full text-base py-3 min-h-[48px]"
						size="lg"
					>
						เริ่มเล่น 🎮
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default Index;
