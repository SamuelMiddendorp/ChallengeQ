import { QuestionSet } from "./model";
import * as fs from 'fs';

export const readQuestionSetFromFile = (fileName: string) : QuestionSet => {
    let file = fs.readFileSync(fileName, "utf8");
    let questionSet: QuestionSet = JSON.parse(file);

    return questionSet;
}
 