import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: uuidv4(), todo, isDone: false }]);
      setTodo("");
    }
  };
  return (
    <div className="App">
      <span className="heading">Taskify</span>

      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

      {/* {todos.length > 0 && <TodoList todos={todos} setTodos={setTodos} />} */}

      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
