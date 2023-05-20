export interface Question{ 
    name: string,
    description: string,
    answers: Map<string, string>,
    correctAnswer: string
    points: number
}

export interface QuestionSet{
    name: string,
    questions: Question[]
}

export interface UserState{
    userName: string,
    points: number,
    currentQuestion: number
}

export interface Scoreboard{
    players: ScoreboardEntry[]
}

export interface ScoreboardEntry{
    userName: string,
    points: number
}
