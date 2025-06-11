export interface UserAnswer {
	questionId: string;
	choiceId: string;
	isCorrect: boolean;
	personality: "careful" | "trusting";
}

export interface SurveyData {
	age: string;
	gender: string;
	education: string;
	experience: string;
	frequency: string;
	digitalLiteracy: string;
	previousScamExperience: boolean;
}

export interface QuizResult {
	score: number;
	totalQuestions: number;
	personality: "careful" | "trusting" | "balanced";
	answers: UserAnswer[];
}

export interface QuizExplanation {
	correct: string;
	incorrect: string;
	redFlags: string[];
}

export interface QuizChoice {
	id: string;
	text: string;
	isCorrect: boolean;
	personality: "careful" | "trusting";
}

export interface QuizExplanation {
	correct: string;
	incorrect: string;
	redFlags: string[];
}

export interface QuizQuestion {
	id: number;
	type: "sms" | "ads" | "social" | "chat";
	scenario: string;
	smsContent: string;
	redflag: string;
	image?: string;
	choices: QuizChoice[];
	explanation: QuizExplanation;
}
