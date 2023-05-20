export interface Question{ 
    name: string,
    description: string,
    answers: Map<string, string>,
    correctAnswer: string
    points: number
}
export interface QuestionRequest{
    name: string,
    description: string,
    answers: Map<string, string>,
}

export interface QuestionSet{
    name: string,
    questions: Question[]
}

export interface PlayerState{
    usernameSet: boolean,
    username: string,
    points: number,
    currentQuestion: number
}

export interface Scoreboard{
    players: ScoreboardEntry[]
}

export interface ScoreboardEntry{
    username: string,
    points: number
}

export interface AnswerResponse{
    answer: string
}
export interface UserDetailsResponse{
    username: string
}
