import { useState, useRef, useEffect } from "react"
import { Draggable } from "react-beautiful-dnd"
import { Todo } from "../model"
import "./styles.css"

type Props = {
  item: Todo
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  index: number
}

const SingleTodo = ({ item, todos, setTodos, index }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(item.todo)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleEdit = (id: string) => {
    if (!isEdit && !item.isDone) {
      setIsEdit(true)
    }
  }

  const handleDelete = (id: string) => {
    const filteredTodo = todos.filter((todo) => todo.id !== id)

    setTodos(filteredTodo)
  }

  const handleDone = (id: string) => {
    const checkedTodo = todos.map((item) =>
      item.id === id ? { ...item, isDone: !item.isDone } : item
    )
    setTodos(checkedTodo)
  }

  const handleSubmit = (e: React.FormEvent, id: string) => {
    e.preventDefault()
    const editedTodo = todos.map((item) =>
      item.id === id ? { ...item, todo: editTodo } : item
    )
    setTodos(editedTodo)
    setIsEdit(false)
  }

  useEffect(() => {
    if (isEdit) {
      inputRef.current?.focus()
    }
  }, [isEdit])

  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onSubmit={(e) => handleSubmit(e, item.id)}
        >
          {isEdit ? (
            <input
              className="todos__single--text"
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : item.isDone ? (
            <s className="todos__single--text">{item.todo}</s>
          ) : (
            <span className="todos__single--text">{item.todo}</span>
          )}

          <div>
            <span className="icon" onClick={() => handleEdit(item.id)}>
              <img
                className="image"
                src="/static/editIcon.svg"
                alt="edit icon"
              />
            </span>
            <span className="icon" onClick={() => handleDelete(item.id)}>
              <img
                className="image"
                src="/static/deleteIcon.svg"
                alt="delete icon"
              />
            </span>
            <span className="icon" onClick={() => handleDone(item.id)}>
              <img
                className="image"
                src="/static/doneIcon.svg"
                alt="done icon"
              />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  )
}

export default SingleTodo
