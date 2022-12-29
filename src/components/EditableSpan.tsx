import React, { ChangeEvent, useState, KeyboardEvent } from "react";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [localTitle, setLocalTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(localTitle)
    }

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => setLocalTitle(e.currentTarget.value)
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && offEditMode()

    return (
        editMode ?
            <input value={localTitle} onChange={changeLocalTitle} autoFocus onBlur={offEditMode} onKeyDown={onKeyDownHandler}/>
        : 
            <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}