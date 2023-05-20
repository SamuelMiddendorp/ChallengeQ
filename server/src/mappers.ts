import { UserState } from "./model";

export const mapToScoreBoardEntry = (userState: UserState) => {
    return {
        userName: userState.userName,
        points: userState.points
    };
}