import { messagesAPI } from "../api/messagesAPI";
import { AppDispatchType } from "./store";

type ActionType = any;
export type MessagePayloadType = {
  user_id: string;
  message: string;
  event: string;
  image: string;
};

export type MessageType = {
  image: string;
  createdAt: string;
  user_id: string;
  id: string;
  message: string;
  event: string;
  user: {
    photo: string;
    first_name: string;
    last_name: string;
  };
};
const initialState = {
  messages: [] as Array<MessagePayloadType>,
};

export type InitialStateType = typeof initialState;

export function messagesReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {
  switch (action.type) {
    case "SET-MESSAGES":
      return { ...state, messages: action.messages.reverse() };
    case "NEW-MESSAGE":
      return { ...state, messages: [action.message, ...state.messages] };
    default:
      return state;
  }
}

export const newMessageAC = (message: any) => ({
  type: "NEW-MESSAGE",
  message,
});

const setMessagesAC = (messages: Array<MessagePayloadType>) => {
  return {
    type: "SET-MESSAGES",
    messages,
  };
};

export const getMessagesTC = () => async (dispatch: AppDispatchType) => {
  await messagesAPI.getMessages().then((res) => dispatch(setMessagesAC(res.data)));
};
