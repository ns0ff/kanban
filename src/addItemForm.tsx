import React, { ChangeEvent, useState, KeyboardEvent } from "react";

type AddItemFormType = {
  addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {
  // Title and error local state
  let [title, setTitle] = useState<string>('')
  let [error, setError] = useState<boolean>(false)

  // Handlers
  const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(false)
    setTitle(e.currentTarget.value)
  }
  const onEnterAddItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItemHandler()
    }
  }
  const addItemHandler = () => {
    const trimmedTitle = title.trim()
    trimmedTitle ? props.addItem(trimmedTitle) : setError(true)
    setTitle('')
  }

  // Error message
  const errorStyles = {fontWeight: 'bold', olor: 'red'}
  const errorMessage = error ? <div style={errorStyles}>Please, enter title</div> : null

    return (
        <div>
        <input className={error ? 'error' : ''}
          value={title}
          onChange={setLocalTitleHandler}
          onKeyDown={onEnterAddItemHandler} />
        <button onClick={addItemHandler}>+</button>
        {errorMessage}
      </div>
    )
}