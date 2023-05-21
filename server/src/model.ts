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

export interface PlayerState{
    usernameSet: boolean,
    username: string,
    points: number,
    currentQuestion: number
}

