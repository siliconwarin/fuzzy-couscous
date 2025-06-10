import { v4 as uuidv4 } from "uuid";
import type { UserAnswer, SurveyData } from "@/types/quiz";

const USER_SESSION_KEY = "scam-quiz-user-id";
const RESULTS_KEY = "scam-quiz-results";

export const initializeUserSession = (): string => {
	const existingId = localStorage.getItem(USER_SESSION_KEY);
	if (existingId) {
		return existingId;
	}

	const userId = uuidv4();
	localStorage.setItem(USER_SESSION_KEY, userId);

	// Initialize empty results
	localStorage.setItem(
		RESULTS_KEY,
		JSON.stringify({
			userId,
			answers: [],
			surveyData: null,
			startTime: new Date().toISOString(),
		})
	);

	return userId;
};

export const getUserSession = (): string | null => {
	return localStorage.getItem(USER_SESSION_KEY);
};

export const addAnswerToSession = (answer: UserAnswer): void => {
	const resultsData = localStorage.getItem(RESULTS_KEY);
	if (!resultsData) {
		return;
	}

	const results = JSON.parse(resultsData);
	results.answers.push(answer);
	localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
};

export const addSurveyDataToSession = (surveyData: SurveyData): void => {
	const resultsData = localStorage.getItem(RESULTS_KEY);
	if (!resultsData) {
		return;
	}

	const results = JSON.parse(resultsData);
	results.surveyData = surveyData;
	results.endTime = new Date().toISOString();
	localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
};
