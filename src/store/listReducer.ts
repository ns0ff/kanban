import { TodoListsType } from "../App";

export const REMOVE_LIST = 'REMOVE-LIST' as const

type RemoveListAC = {
    type: typeof REMOVE_LIST
    id: string
}

export const listsReducer = (todolists: Array<TodoListsType>, action: any): Array<TodoListsType> => {
    switch (action.type) {
        case 'REMOVE-LIST' : 
                return todolists.filter(list => list.id !== action.id)
        default: 
            return todolists
    }
}