export interface Question{ 
    name: string,
    description: string,
    answers: Map<string, string>,
    correctAnswer: string
    points: number
}

export interface QuestionSet{
    name: string,
    questions: Question[],
    id: string
}

export interface UserState{
    userName: string,
    points: number,
    currentQuestionId: string,
}

export interface Scoreboard{
    players: ScoreboardEntry[]
}

export interface ScoreboardEntry{
    userName: string,
    points: number
}
