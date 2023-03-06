import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { Quiz } from "../interfaces/PlayQuizInterfaces";
import { testQuiz } from "../components/play-quiz/developmentData";
import { Question } from "../interfaces/PlayQuizInterfaces";
import axios from 'axios';
import { useLocation } from "react-router-dom";

export interface PlayQuizContextType {
    quiz: Quiz;
    currentQuestion: Question;
    setCurrentQuestion: Dispatch<SetStateAction<Question>>;
    correctAnswers: number;
    setCorrectAnswers: Dispatch<SetStateAction<number>>;
    score: number;
    setScore: Dispatch<SetStateAction<number>>;
    nickname: string;
    setNickname: Dispatch<SetStateAction<string>>;
}

export const PlayQuizContext = createContext<PlayQuizContextType | null>(null);

export const usePlayQuiz = () => {
    const result = useContext(PlayQuizContext);
    if (!result) throw new Error("You forgot to put the PlayQuizProvider!");
    return result;
}

export const PlayQuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [score, setScore] = useState<number>(0);
    const [correctAnswers, setCorrectAnswers] = useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = useState<Question>(testQuiz.questions[0]);
    const [quiz, setQuiz] = useState<Quiz>(testQuiz);
    const [nickname, setNickname] = useState<string>('');
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const id = searchParams.get('id');

    useEffect(() => {
        try {
            fetchQuiz();
        } catch (error) {
            console.log(error)
        }
    }, [])

    const fetchQuiz = async () => {
        let { data } = await axios.get(`http://localhost:8080/api/quiz/${id}`);
        setQuiz(data[0]);
        setCurrentQuestion(data[0].questions[0]);
    }

    return (
        <PlayQuizContext.Provider value={{
            quiz: quiz,
            currentQuestion,
            setCurrentQuestion,
            correctAnswers,
            setCorrectAnswers,
            score,
            setScore,
            nickname,
            setNickname
        }}>
            {children}
        </PlayQuizContext.Provider>
    );
}

