import { FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePlayQuiz } from '../../contexts/PlayQuizContext';
import { useIsBigScreen } from '../../consts/consts';
import { AlertDialog } from '../../components/alert-dialog/AlertDialog';
import { Preview } from '../../components/preview/Preview';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';
import './QuizResults.scss';

export const QuizResults: FC = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const scoreId = searchParams.get('scoreId');
    const isBigScreen = useIsBigScreen();
    const { quiz, score, correctAnswers, isPreview } = usePlayQuiz();
    const questions = quiz?.questions;

    const handleShare = (onClick: () => void) => {
        navigator.clipboard.writeText(`http://localhost:3000/quiz-shared-result?scoreId=${scoreId}`);
        return <Button
            className='share-btn'
            onClick={onClick}
        >
            <img
                className='logo'
                src="./svg/Icon-awesome-share.svg"
                alt="share button"
            />שתף תוצאה
        </Button>;
    };

    const navigateToHome = () => {
        navigate('/login');
    };

    return (
        <div className='quiz-results-big-container'>
            {isBigScreen && isPreview &&
                <Preview />
            }
            <div className='quiz-results-container'>
                <img
                    className='confetti-animation'
                    src="./animation/confetti.gif"
                    alt="confetti animatios" />
                {isBigScreen
                    ?
                    <>
                        <LinearProgress variant='determinate' value={100} />
                        <div className="content">
                            <img
                                className='dancing-monkey-img'
                                src="./svg/Group878.svg"
                                alt="dancing monkey"
                            />
                            <h1>ענית נכון על {correctAnswers} שאלות. ציונך: {score}</h1>
                            {scoreId
                                ?
                                <>
                                    <p className='share-description-par'>
                                        שתף את התוצאה שלך עם חברים ואתגר גם אותם במבחן!
                                    </p>
                                    <AlertDialog
                                        question="הקישור הועתק"
                                        description="מצויין! עכשיו אתה יכול לשתף את החידון שלך עם חברים"
                                        showCancelButton={false}
                                        triggerButton={handleShare}
                                    />
                                </>
                                : null}
                        </div></>
                    :
                    <Dialog
                        className='quiz-results-dialog'
                        open={!isBigScreen}
                    >
                        <img
                            className='dancing-monkey'
                            src="./svg/Group597.svg"
                            alt="dancing monkey" />
                        <DialogTitle className='dialog-title'>הצלחת {correctAnswers} מתוך {questions?.length}</DialogTitle>
                        <DialogContent className='dialog-content'>
                            ציונך: {score}
                        </DialogContent>
                        {scoreId
                            ?
                            <DialogActions>
                                <AlertDialog
                                    question="הקישור הועתק"
                                    description="מצויין! עכשיו אתה יכול לשתף את החידון שלך עם חברים"
                                    showCancelButton={false}
                                    triggerButton={handleShare}
                                    className='copy-link-popup'
                                />
                                <Button
                                    className='home-btn'
                                    variant="contained"
                                    onClick={navigateToHome}
                                >
                                    <img
                                        className='logo'
                                        src="./svg/home.svg"
                                        alt="Home Button"
                                    />
                                    עמוד הבית
                                </Button>
                            </DialogActions>
                            : null}
                    </Dialog>
                }
            </div>
        </div>
    );
};
