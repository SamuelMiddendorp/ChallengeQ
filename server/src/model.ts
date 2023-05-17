export interface Question{ 
    name: string,
    text: string,
    answers: Map<string, string>,
    correctAnswer: string
}