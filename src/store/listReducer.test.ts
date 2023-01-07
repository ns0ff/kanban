import { v1 } from "uuid"
import { TodoListsType } from "../App"
import { REMOVE_LIST, listsReducer } from "./listReducer"

test ('correct list should be removed', () => {
    const listID1 = v1()
    const listID2 = v1()

    const initialState: Array<TodoListsType> = [
        {id: listID1, title: 'Camera setup checklist', filter: 'all'},
        {id: listID2, title: 'Gear cheklist', filter: 'all'}
    ]

    const finalState = listsReducer(initialState, {type: REMOVE_LIST, id: listID1})

    expect(finalState.length).toBe(1)
    expect(finalState[0].id).toBe(listID2)
})