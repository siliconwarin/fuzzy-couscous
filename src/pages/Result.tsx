
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { UserAnswer, QuizResult } from "@/types/quiz";
import { Trophy, RotateCcw, Share2 } from "lucide-react";

const Result = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('scam-quiz-results');
    if (!savedData) {
      navigate('/');
      return;
    }

    const { answers } = JSON.parse(savedData);

    // Calculate results
    const correctAnswers = answers.filter((a: UserAnswer) => a.isCorrect).length;
    const carefulAnswers = answers.filter((a: UserAnswer) => a.personality === 'careful').length;
    const trustingAnswers = answers.filter((a: UserAnswer) => a.personality === 'trusting').length;

    let personality: 'careful' | 'trusting' | 'balanced';
    if (carefulAnswers > trustingAnswers) {
      personality = 'careful';
    } else if (trustingAnswers > carefulAnswers) {
      personality = 'trusting';
    } else {
      personality = 'balanced';
    }

    const quizResult: QuizResult = {
      score: correctAnswers,
      totalQuestions: answers.length,
      personality,
      answers
    };

    setResult(quizResult);
  }, [navigate]);

  const handleRestart = () => {
    localStorage.removeItem('scam-quiz-results');
    localStorage.removeItem('scam-quiz-user-id');
    navigate('/');
  };

  const getPersonalityInfo = (personality: string) => {
    switch (personality) {
      case 'careful':
        return {
          title: '🛡️ นักสงสัยที่ดี',
          description: 'คุณมีความระมัดระวังสูงและคิดก่อนที่จะตัดสินใจ ซึ่งช่วยป้องกันการตกเป็นเหยื่อของการฉ้อโกงได้ดี',
          color: 'bg-quiz-correct text-white'
        };
      case 'trusting':
        return {
          title: '💝 คนใจดี',
          description: 'คุณมีใจที่เชื่อใจคนอื่นง่าย ควรเพิ่มความระมัดระวังในการตัดสินใจทางการเงินและข้อมูลส่วนตัว',
          color: 'bg-quiz-orange text-white'
        };
      case 'balanced':
        return {
          title: '⚖️ สมดุลดี',
          description: 'คุณมีการตัดสินใจที่สมดุลระหว่างความเชื่อใจและความระมัดระวัง',
          color: 'bg-quiz-blue text-white'
        };
      default:
        return {
          title: '🎯 ผลลัพธ์',
          description: 'ขอบคุณที่เข้าร่วมทำแบบทดสอบ',
          color: 'bg-gray-500 text-white'
        };
    }
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-quiz-blue to-quiz-blue-dark flex items-center justify-center">
        <div className="text-white text-xl">กำลังโหลด...</div>
      </div>
    );
  }

  const personalityInfo = getPersonalityInfo(result.personality);
  const scorePercentage = Math.round((result.score / result.totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-quiz-blue to-quiz-blue-dark p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <Card className="mb-6">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Trophy className="w-16 h-16 text-quiz-orange" />
            </div>
            <CardTitle className="text-2xl text-quiz-blue-dark">
              ผลการทดสอบของคุณ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score */}
            <div className="text-center">
              <div className="text-4xl font-bold text-quiz-blue-dark mb-2">
                {result.score}/{result.totalQuestions}
              </div>
              <div className="text-lg text-muted-foreground">
                คะแนน {scorePercentage}%
              </div>
            </div>

            {/* Personality Result */}
            <div className="text-center">
              <Badge className={`${personalityInfo.color} text-lg px-4 py-2 mb-3`}>
                {personalityInfo.title}
              </Badge>
              <p className="text-sm leading-relaxed text-gray-700">
                {personalityInfo.description}
              </p>
            </div>

            {/* Answer breakdown */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">รายละเอียดคำตอบ:</h4>
              <div className="space-y-2">
                {result.answers.map((answer, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span>ข้อ {index + 1}</span>
                    <div className="flex gap-2">
                      <Badge variant={answer.isCorrect ? "default" : "destructive"}>
                        {answer.isCorrect ? "ถูก" : "ผิด"}
                      </Badge>
                      <Badge variant="outline">
                        {answer.personality === 'careful' ? 'ระมัดระวัง' : 'เชื่อใจง่าย'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button onClick={handleRestart} variant="outline" className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                ทำใหม่
              </Button>
              <Button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'ผลการทดสอบความตระหนักรู้เรื่องการฉ้อโกง',
                      text: `ฉันได้คะแนน ${result.score}/${result.totalQuestions} และเป็น${personalityInfo.title}`,
                    });
                  }
                }}
                className="flex-1 bg-quiz-blue hover:bg-quiz-blue-dark"
              >
                <Share2 className="w-4 h-4 mr-2" />
                แชร์
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tips card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-quiz-blue-dark">
              💡 เคล็ดลับป้องกันการฉ้อโกง
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• ไม่คลิกลิงก์จากข้อความต้องสงสัย</li>
              <li>• ตรวจสอบแอพกู้เงินใน website ธนาคารแห่งประเทศไทย</li>
              <li>• ไม่ให้ข้อมูลส่วนตัวกับคนแปลกหน้า</li>
              <li>• สงสัยเมื่อไหร่ให้ถามคนอื่นก่อนตัดสินใจ</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Result;
