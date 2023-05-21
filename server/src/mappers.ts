import { stringify } from "querystring";
import { QuestionRequest, Scoreboard, ScoreboardEntry } from "./contract";
import { PlayerState, Question } from "./model";

export const mapToScoreboardEntry = (userState: PlayerState) : ScoreboardEntry => {
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
export const mapToScoreboard = (userStates: Map<string, PlayerState>) : Scoreboard => {
    let playerStates: PlayerState[] = []
    
    userStates.forEach((value: PlayerState) => {
        playerStates = [...playerStates, value]
    })

    return {
        players: playerStates.map(mapToScoreboardEntry)
    }
    
}