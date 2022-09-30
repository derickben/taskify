import { v4 as uuidv4 } from "uuid";
import { Todo } from "../model";

const ADD = "ADD",
  REMOVE = "REMOVE",
  DONE = "DONE";

type Actions =
  | { type: "ADD"; payload: string }
  | { type: "REMOVE"; payload: string }
  | { type: "DONE"; payload: string };

const TodoReducer = (state: Todo[], action: Actions) => {
  switch (action.type) {
    case ADD:
      return [...state, { id: uuidv4(), todo: action.payload, isDone: false }];

    case REMOVE:
      return state.filter((item) => item.id !== action.payload);

    case DONE:
      return state.map((item) =>
        item.id === action.payload ? { ...item, isDone: !item.isDone } : item
      );

    default:
      return state;
  }
};

export default TodoReducer;
