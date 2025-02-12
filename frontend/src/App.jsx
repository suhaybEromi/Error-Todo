import { useState, useEffect } from "react";
import axios from "axios";
import image from "./assets/img/Group.png";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axios("http://localhost:4000/api/todos");
        setTodos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching todos:", error);
        setLoading(false);
        setError(true);
      }
    };

    getTodos();
  }, []);

  if (loading) {
    return <p className="text-center">loading...</p>;
  }
  if (error) {
    return <p>Error Please try again...</p>;
  }

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <h2>{todo.title}</h2>
            <p>
              <strong>Error:</strong> {todo.textError}
            </p>
            <p>
              <strong>Fix:</strong> {todo.textFix}
            </p>
            <p>
              <strong>Code:</strong> {todo.textCode}
            </p>
            <p>
              <strong>Created At: </strong>
              {new Date(todo.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
