import type { UserSession, UserAnswer } from "@/types/quiz";

export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const initializeUserSession = (): UserSession => {
  const uuid = generateUUID();
  const session: UserSession = {
    uuid,
    answers: [],
    startedAt: new Date()
  };
  
  localStorage.setItem('scam-quiz-session', JSON.stringify(session));
  return session;
};

export const getUserSession = (): UserSession | null => {
  const stored = localStorage.getItem('scam-quiz-session');
  if (!stored) return null;
  
  try {
    const session = JSON.parse(stored);
    session.startedAt = new Date(session.startedAt);
    if (session.completedAt) {
      session.completedAt = new Date(session.completedAt);
    }
    return session;
  } catch {
    return null;
  }
};

export const updateUserSession = (session: UserSession): void => {
  localStorage.setItem('scam-quiz-session', JSON.stringify(session));
};

export const addAnswerToSession = (answer: UserAnswer): void => {
  const session = getUserSession();
  if (!session) return;
  
  session.answers = session.answers.filter(a => a.questionId !== answer.questionId);
  session.answers.push(answer);
  updateUserSession(session);
};

export const completeSession = (): void => {
  const session = getUserSession();
  if (!session) return;
  
  session.completedAt = new Date();
  updateUserSession(session);
};

export const getPersonalityResult = (answers: UserAnswer[]): { type: "careful" | "trusting", score: number } => {
  const carefulCount = answers.filter(a => a.personality === "careful").length;
  const totalAnswers = answers.length;
  const score = Math.round((carefulCount / totalAnswers) * 100);
  
  return {
    type: carefulCount >= totalAnswers / 2 ? "careful" : "trusting",
    score
  };
};
