export interface QuizQuestion {
  id: number;
  type: "sms" | "ads" | "chat";
  scenario: string;
  smsContent: string;
  redflag?: string;
  image?: string;
  choices: QuizChoice[];
  explanation: QuizExplanation;
}

export interface QuizChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  personality: 'careful' | 'trusting';
}

export interface QuizExplanation {
  correct: string;
  incorrect: string;
  redFlags: string[];
}

export interface UserAnswer {
  questionId: number;
  choiceId: string;
  isCorrect: boolean;
  personality: "careful" | "trusting";
}

export interface SurveyData {
  age: string;
  experience: string;
  frequency: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  personality: 'careful' | 'trusting' | 'balanced';
  answers: UserAnswer[];
}

export interface UserSession {
  uuid: string;
  answers: UserAnswer[];
  startedAt: Date;
  completedAt?: Date;
}
