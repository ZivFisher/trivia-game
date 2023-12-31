import { useEffect, useRef, useState } from "react";
import LinearProgress from '@mui/material/LinearProgress';
import { usePlayQuiz } from "../../contexts/PlayQuizContext";
import '../../pages/play-quiz-page/PlayQuizPage.scss';

export const PlayProgressBar = () => {
    const [progress, setProgress] = useState<number>(0);
    const { quiz, currentQuestion } = usePlayQuiz();
    const currentIndex = useRef<number>(0);

    const numOfQuestions = quiz?.questions.length || 1;

    useEffect(() => {
        currentIndex.current++;
        setProgress(currentIndex.current / (numOfQuestions) * 100);
        // eslint-disable-next-line
    }, [currentQuestion]);

    return (
        <LinearProgress
            className="play-progress-bar"
            variant="determinate"
            value={progress}
        />
    );
};