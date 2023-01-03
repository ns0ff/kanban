import { Button, TextField } from "@mui/material";
import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import AddTaskIcon from '@mui/icons-material/AddTask';

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

    return (
        <div>
        <TextField 
          size="small"
          value={title}
          onChange={setLocalTitleHandler}
          onKeyDown={onEnterAddItemHandler} 
          variant='outlined'
          label='Title'
          error={error}
          helperText={error && 'Please, enter title' }
        />
        <Button
          sx={{fontSize: '16px', minWidth: 'fit-content'}}
          variant={'outlined'}
          onClick={addItemHandler}
          startIcon={<AddTaskIcon  fontSize="small"/>}
        >ADD</Button>
      </div>
    )
}