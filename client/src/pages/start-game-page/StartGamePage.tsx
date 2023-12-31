import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Preview } from '../../components/preview/Preview';
import { useIsBigScreen } from '../../consts/consts';
import { usePlayQuiz } from '../../contexts/PlayQuizContext';
import { Loading } from '../loading/Loading';
import './StartGamePage.scss';

export const StartGamePage: React.FC = () => {

    const isBigScreen = useIsBigScreen();
    const navigate = useNavigate();
    const { quiz, isPreview, fetchQuiz } = usePlayQuiz();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        if (id) {
            fetchQuiz();
        }
        // eslint-disable-next-line
    }, [id]);

    const startGame = () => {
        navigate(`/quiz-nickname?id=${id}`);
    };



    if (!quiz) {
        return <div className='align-loading'>
            <Loading /></div>;
    }

    return (
        <div className='start-game-page-div'>
            {isBigScreen && isPreview &&
                <Preview />
            }
            <div className="start-game-container">
                {!isBigScreen &&
                    <div className="header-logo">
                        <h3 className="header-title">BANANAS.Games</h3>
                        <img src="./svg/Layer32.svg" alt="BANANAS.Games" />
                    </div>
                }
                <h1 className='big-title'>{quiz.title}</h1>
                {!isBigScreen &&
                    <h2 className='quiz-description'>{quiz.description}</h2>
                }
                <img
                    src={quiz.image}
                    alt="quiz"
                    className='quiz-image'
                />
                <button
                    onClick={startGame}
                    className='start-game-btn'>התחילו לשחק
                    <img
                        src="/svg/IconAwesome-play.svg"
                        alt=" start play" />
                </button>
            </div>
            {!isBigScreen &&
                <img
                    src="svg/bottom-left-leaf.svg"
                    alt="banana leaf"
                    className='banana-leaf-left' />
            }
        </div>
    );
};