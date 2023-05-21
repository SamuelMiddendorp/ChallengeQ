export interface QuestionRequest{
    name: string,
    description: string,
    answers: Map<string, string>,
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