export interface Question{ 
    name: string,
    description: string,
    answers: Map<string, string>,
    correctAnswer: string
    points: number
}
export interface UserState{
    userName: string,
    message: string[]   
}
export interface QuestionSet{
    name: string,
    questions: Question[],
}