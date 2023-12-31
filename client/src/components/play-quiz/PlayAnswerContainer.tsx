import React, { useEffect, useState } from 'react';
import { usePlayQuiz } from '../../contexts/PlayQuizContext';
import { PlayAnswer } from './PlayAnswer';
import './PlayQuizComponents.scss';

export const PlayAnswerContainer: React.FC = () => {

    const { currentQuestion } = usePlayQuiz();
    const [highlightCorrect, setHighlightCorrect] = useState<boolean>(false);
    const [haveImages, setHaveImages] = useState<boolean>(false);
    const [toggleClick, setToggleClick] = useState<boolean>(false);
    const answers = currentQuestion?.answers;

    useEffect(() => {
        if (answers?.some(answer => answer.image)) setHaveImages(true);
        else setHaveImages(false);
        // eslint-disable-next-line
    }, [currentQuestion]);

    return (
        <div className={haveImages ? 'play-answer-container-img' : 'play-answer-container'}>
            {answers?.map(answer => {
                return (
                    <PlayAnswer
                        key={answer.id}
                        answer={answer}
                        haveImages={haveImages}
                        highlightCorrect={highlightCorrect}
                        setHighlightCorrect={setHighlightCorrect}
                        toggleClick={toggleClick}
                        setToggleClick={setToggleClick}
                    />
                );
            })}
        </div>
    );
}

