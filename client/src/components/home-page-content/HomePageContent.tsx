import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useIsBigScreen } from "../../consts/consts";
import { useLogout } from "@hilma/auth";
import { useUser } from "../../contexts/UserContext";

import './HomePageContent.scss';

export const HomePageContent: React.FC = () => {
    const isBigScreen = useIsBigScreen();
    const logout = useLogout();
    const navigate = useNavigate();
    const { user, setUser } = useUser();

    const navigateToCreateQuiz = () => navigate('/create-quiz');

    const navigateToMyQuizzes = () => navigate('/my-quizzes');

    return (
        <>
            <Link
                to={'/login'}
                className="logout"
                onClick={() => logout()}
            >
                <img src="logout.svg" alt="logout" />
                <span>יציאה</span>
            </Link>
            <div className="home-page-interface">
                <h1 className="home-page-header"> {!isBigScreen ? <><span>משחק</span>טריוויה</> : 'חידונים מטורפים'} </h1>
                {isBigScreen ? <p>בחנו את החברים שלכם בטריוויה שאתם יצרתם!</p> : null}
                {isBigScreen ? <p className="greeting">שלום, {user.username}</p> : null}
                <div className="home-page-buttons">
                    <Button
                        className="create-button"
                        variant="contained"
                        onClick={navigateToCreateQuiz}
                    >
                        <img
                            src="svg/magic-wand.svg"
                            alt="magic-wand" />
                        <span>צור חידון {isBigScreen ? 'חדש' : null}</span>
                    </Button>
                    <Button
                        className="my-quizzes-button"
                        variant="contained"
                        onClick={navigateToMyQuizzes}
                    >החידונים שלי
                    </Button>
                </div>
            </div>
            <div className='banana-monkey-div'>
                <img
                    className="banana-monkey-img"
                    src="svg/banana-monkey.svg"
                    alt="monkey with banana"
                />
            </div>
            {!isBigScreen && <img
                className="leaves-top-right"
                src="svg/leaves-top-right.svg"
                alt="banana leaves" />}
        </>
    );
}

