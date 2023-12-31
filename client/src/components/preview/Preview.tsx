import { usePlayQuiz } from '../../contexts/PlayQuizContext'
import './Preview.scss'

export const Preview: React.FC = () => {
    const { backToEdit } = usePlayQuiz();
    return (
        <div className='preview-div'>
            <button className='preview-btn' onClick={backToEdit}>חזרה לעריכה</button>
            <p className='preview-par'>תצוגה מקדימה</p>
        </div>
    )
}