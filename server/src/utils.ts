import { AnswerResponse, QuestionSet, UserDetailsResponse } from "./model";
import * as fs from 'fs';

export const readQuestionSetFromFile = (fileName: string): QuestionSet => {
    let file = fs.readFileSync(fileName, "utf8");
    let questionSet: QuestionSet = JSON.parse(file);

    return questionSet;
}
export const matchResponse = (response: AnswerResponse | UserDetailsResponse, onAnswer: (response: AnswerResponse) => void, onUserDetails: (response: UserDetailsResponse) => void) => {
    if ("answer" in response) {
        onAnswer(response);
    }
    else{
        onUserDetails(response);
    }
}
