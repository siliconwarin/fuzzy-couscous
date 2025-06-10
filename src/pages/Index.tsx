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
		<div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4">
			<Card className="w-full max-w-md mx-auto">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl font-bold text-blue-900 mb-2">
						🛡️ Scam Savvy
					</CardTitle>
					<p className="text-blue-700">ทดสอบความรู้เรื่องการหลอกลวงออนไลน์</p>
				</CardHeader>

				<CardContent className="space-y-6">
					<div className="bg-blue-50 p-4 rounded-lg">
						<h3 className="font-semibold text-blue-800 mb-2">วิธีเล่น:</h3>
						<ul className="text-sm text-blue-700 space-y-1">
							<li>• อ่านสถานการณ์ที่กำหนดให้</li>
							<li>• เลือกคำตอบที่คุณคิดว่าถูกต้อง</li>
							<li>• เรียนรู้เหตุผลและสัญญาณเตือนภัย</li>
							<li>• ใช้เวลาประมาณ 5 นาที</li>
						</ul>
					</div>

					<Button
						onClick={handleStartQuiz}
						className="w-full text-lg py-6"
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
