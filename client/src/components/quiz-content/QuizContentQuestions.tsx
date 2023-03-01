import { useMediaQuery } from "@mui/material";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useQuizDetails } from "../../contexts/quizDetailsContext";
import { Answer } from "../../interfaces/quizDetailInterface";
import { QuestionDetails } from "../questions/QuestionDetails";
import { SavedQuestion } from "../saved-question/SavedQuestion";

interface QuestionContentQuestionsProps {
    copyQuestion: (copyQuestionIndex: number, answers: Answer[]) => void;
}

export const QuizContentQuestions: React.FC<QuestionContentQuestionsProps> = ({ copyQuestion }) => {
    const {
        setQuestions,
        questions,
        onChangeQuestionTitle,
        deleteQuestion,
        activeQuestion,
        setActiveQuestion
    } = useQuizDetails();

    const isBigScreen = useMediaQuery('(min-width:600px)');
    // Function to update list on drop
    const handleDrop = (droppedItem: any) => {
        // Ignore drop outside droppable container
        if (!droppedItem.destination) return;
        setQuestions(prev => {
            let updatedList = [...prev];
            // Remove dragged item
            const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
            // Add dropped item
            updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
            return updatedList;
        });
        setActiveQuestion(droppedItem.destination.index);
    };

    return (
        <DragDropContext onDragEnd={handleDrop}>
            <Droppable droppableId="list-container">
                {(provided) => (
                    <div
                        className="list-container"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {questions.map((question, index) => {
                            return <Draggable
                                key={question.id}
                                draggableId={`${question.id}`}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        className="item-container"
                                        ref={provided.innerRef}
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                    >
                                        {activeQuestion !== index && isBigScreen
                                            ? <SavedQuestion
                                                question={question}
                                                questionIndex={index}
                                            />
                                            : <QuestionDetails
                                                index={index}
                                                copyQuestion={copyQuestion}
                                                questionId={question.id}
                                                onChangeQuestionTitle={onChangeQuestionTitle}
                                                deleteQuestion={deleteQuestion}
                                                questionTitle={question.title}
                                            />
                                        }

                                    </div>
                                )}
                            </Draggable>
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}