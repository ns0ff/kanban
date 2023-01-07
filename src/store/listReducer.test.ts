import { v1 } from "uuid"
import { TodoListsType } from "../App"
import { RemoveListAC, listsReducer, AddListAC, RenameListAC, ChangeListFilterAC } from "./listReducer"

test ('correct list should be removed', () => {
    const listID1 = v1()
    const listID2 = v1()

    const initialState: Array<TodoListsType> = [
        {id: listID1, title: 'Camera setup checklist', filter: 'all'},
        {id: listID2, title: 'Gear cheklist', filter: 'all'}
    ]

    const finalState = listsReducer(initialState, RemoveListAC(listID1))

    expect(finalState.length).toBe(1)
    expect(finalState[0].id).toBe(listID2)
})

test ('correct list should be added', () => {
    const listID1 = v1()
    const listID2 = v1()
    const newListTitle = 'Another List'

    const initialState: Array<TodoListsType> = [
        {id: listID1, title: 'Camera setup checklist', filter: 'all'},
        {id: listID2, title: 'Gear cheklist', filter: 'all'}
    ]

    const finalState = listsReducer(initialState, AddListAC(newListTitle))

    expect(finalState.length).toBe(3)
    expect(finalState[2].title).toBe(newListTitle)
})

test ('list shoul be renamed', () => {
    const listID1 = v1()
    const listID2 = v1()
    const newListTitle = 'Another List'

    const initialState: Array<TodoListsType> = [
        {id: listID1, title: 'Camera setup checklist', filter: 'all'},
        {id: listID2, title: 'Gear cheklist', filter: 'all'}
    ]

    const finalState = listsReducer(initialState, RenameListAC(newListTitle, listID1))

    expect(finalState.length).toBe(2)
    expect(finalState[0].title).toBe(newListTitle)
})

test ('filter should be changed', () => {
    const listID1 = v1()
    const listID2 = v1()
    const newListFilter = 'completed'

    const initialState: Array<TodoListsType> = [
        {id: listID1, title: 'Camera setup checklist', filter: 'all'},
        {id: listID2, title: 'Gear cheklist', filter: 'all'}
    ]

    const finalState = listsReducer(initialState, ChangeListFilterAC(newListFilter, listID1))

    expect(finalState.length).toBe(2)
    expect(finalState[0].filter).toBe(newListFilter)
})