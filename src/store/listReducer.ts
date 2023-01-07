import { v1 } from "uuid";
import { FilterType, TodoListsType } from "../App";

export const REMOVE_LIST = 'REMOVE-LIST' as const
export const ADD_LIST = 'ADD-LIST' as const
export const RENAME_LIST = 'RENAME-LIST' as const
export const CHANGE_LIST_FILTER = 'CHANGE-LIST-FILTER' as const

type ActionsType = RemoveListAT | AddListAT | RenameListAT | ChangeListFilterAT
type RemoveListAT = {
    type: typeof REMOVE_LIST
    id: string
}
type AddListAT = {
    type: typeof ADD_LIST
    title: string
}
type RenameListAT = {
    type: typeof RENAME_LIST
    id: string
    title: string
}
type ChangeListFilterAT = {
    type: typeof CHANGE_LIST_FILTER
    id: string
    filter: FilterType
}

export const listsReducer = (lists: Array<TodoListsType>, action: ActionsType): Array<TodoListsType> => {
    switch (action.type) {
        case 'REMOVE-LIST' : 
                return lists.filter(list => list.id !== action.id)
        case 'ADD-LIST' : 
                 const newList: TodoListsType = {
                    id: v1(),
                    title: action.title,
                    filter: "all"
                  }
                  return [...lists, newList]
        case 'RENAME-LIST' : 
                 return lists.map(list => list.id === action.id ? {...list, title: action.title } : list)
        case 'CHANGE-LIST-FILTER' : 
                 return lists.map(list => list.id === action.id ? {...list, filter: action.filter } : list)
        default: 
            return lists
    }
}

export const RemoveListAC = (id: string): RemoveListAT => ({type: REMOVE_LIST, id })
export const AddListAC = (title: string): AddListAT => ({type: ADD_LIST, title})
export const RenameListAC = (title: string, id: string): RenameListAT => ({type: RENAME_LIST, id, title})
export const ChangeListFilterAC = (filter: FilterType, id: string): ChangeListFilterAT => ({type: CHANGE_LIST_FILTER, filter, id})