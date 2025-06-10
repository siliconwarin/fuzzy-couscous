import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { SurveyData } from "@/types/quiz";

interface SurveyFormProps {
	onSubmit: (data: SurveyData) => void;
}

const SurveyForm = ({ onSubmit }: SurveyFormProps) => {
	const [formData, setFormData] = useState<SurveyData>({
		age: "",
		experience: "",
		frequency: "",
	});

	const handleSubmit = () => {
		if (formData.age && formData.experience && formData.frequency) {
			onSubmit(formData);
		}
	};

	return (
		<div className="h-screen bg-linear-to-br from-quiz-blue to-quiz-blue-dark flex flex-col items-center justify-center p-4 overflow-hidden">
			<Card className="w-full max-w-md flex flex-col h-full max-h-[90vh]">
				<CardHeader className="pt-safe-area-inset-top flex-none">
					<CardTitle className="text-center text-quiz-blue-dark text-xl">
						ข้อมูลเพิ่มเติม
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4 flex-1 overflow-y-auto p-3">
					<div>
						<Label className="text-sm font-medium">อายุของคุณ</Label>
						<RadioGroup
							value={formData.age}
							onValueChange={(value) =>
								setFormData((prev) => ({ ...prev, age: value }))
							}
							className="mt-1 space-y-1"
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="under-25" id="under-25" />
								<Label htmlFor="under-25" className="text-sm">
									ต่ำกว่า 25 ปี
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="25-40" id="25-40" />
								<Label htmlFor="25-40" className="text-sm">
									25-40 ปี
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="over-40" id="over-40" />
								<Label htmlFor="over-40" className="text-sm">
									มากกว่า 40 ปี
								</Label>
							</div>
						</RadioGroup>
					</div>

					<div>
						<Label className="text-sm font-medium">
							ประสบการณ์การใช้อินเทอร์เน็ต
						</Label>
						<RadioGroup
							value={formData.experience}
							onValueChange={(value) =>
								setFormData((prev) => ({ ...prev, experience: value }))
							}
							className="mt-1 space-y-1"
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="beginner" id="beginner" />
								<Label htmlFor="beginner" className="text-sm">
									เริ่มต้น
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="intermediate" id="intermediate" />
								<Label htmlFor="intermediate" className="text-sm">
									ปานกลาง
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="advanced" id="advanced" />
								<Label htmlFor="advanced" className="text-sm">
									ชำนาญ
								</Label>
							</div>
						</RadioGroup>
					</div>

					<div>
						<Label className="text-sm font-medium">
							ความถี่ในการใช้งานออนไลน์
						</Label>
						<RadioGroup
							value={formData.frequency}
							onValueChange={(value) =>
								setFormData((prev) => ({ ...prev, frequency: value }))
							}
							className="mt-1 space-y-1"
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="daily" id="daily" />
								<Label htmlFor="daily" className="text-sm">
									ทุกวัน
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="weekly" id="weekly" />
								<Label htmlFor="weekly" className="text-sm">
									หลายครั้งต่อสัปดาห์
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="monthly" id="monthly" />
								<Label htmlFor="monthly" className="text-sm">
									เป็นครั้งคราว
								</Label>
							</div>
						</RadioGroup>
					</div>

					<Button
						onClick={handleSubmit}
						disabled={
							!formData.age || !formData.experience || !formData.frequency
						}
						className="w-full bg-quiz-blue hover:bg-quiz-blue-dark text-white text-sm min-h-[44px] mt-auto mb-safe-area-inset-bottom"
					>
						ส่งข้อมูล
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default SurveyForm;
