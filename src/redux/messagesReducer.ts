import { messagesAPI } from "./../api/messagesAPI";
import { AppDispatchType } from "./store";

type ActionType = any;
export type MessageType = {
    user_id: string;
    photo: string;
    message: string;
    id: string | number;
    event: string;
    date: string;
    image:string
};
const initialState = {
    messages: [] as Array<MessageType>,
};

export type InitialStateType = typeof initialState;

export function messagesReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {
    switch (action.type) {
        case "SET-MESSAGES":
            return { ...state, messages: action.messages.reverse() };
        case "NEW-MESSAGE":
            return { ...state, messages: [action.message, ...state.messages ] };
        default:
            return state;
    }
}

export const newMessageAC = (message: any) => ({
    type: "NEW-MESSAGE",
    message,
});

const setMessagesAC = (messages: Array<MessageType>) => {
    return {
        type: "SET-MESSAGES",
        messages,
    };
};

export const getMessagesTC = () => async (dispatch: AppDispatchType) => {
    await messagesAPI.getMessages().then((res) => dispatch(setMessagesAC(res.data)));
};
