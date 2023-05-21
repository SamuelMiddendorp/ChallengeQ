import { QuestionRequest, ScoreboardEntry } from "./contract";
import { PlayerState, Question } from "./model";

export const mapToScoreBoardEntry = (userState: PlayerState) : ScoreboardEntry => {
    return {
        username: userState.username,
        points: userState.points
    };
}
export const mapToQuestionResponse = (question: Question) : QuestionRequest => {
    return {
        name: question.name,
        description: question.description,
        answers: question.answers
    }
}