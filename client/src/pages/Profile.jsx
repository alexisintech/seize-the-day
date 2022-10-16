import { useState, useEffect } from "react";
const api_base = "http://localhost:2222";

export default function Profile() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    fetch(api_base + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error: ", err));
  };

  const completeTodo = async (id) => {
    const data = await fetch(api_base + "/todos/complete/" + id, {
      method: "PUT",
    }).then((res) => res.json());

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }

        return todo;
      })
    );
  };

  const createTodo = async () => {
    const data = await fetch(api_base + "/todos/createTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());

    console.log(data);

    setTodos([...todos, data]);

    setPopupActive(false);
    setNewTodo("");
  };

  const deleteTodo = async (id) => {
    const data = await fetch(api_base + "/todos/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setTodos((todos) => todos.filter((todo) => todo._id !== data.result._id));
  };

  return (
    <div className="App">
      <h1>Welcome!</h1>

      <h2>What I will try to accomplish today:</h2>
      <div className="todos">
        {todos.length > 0 ? (
          todos
            .filter((todo) => !todo.complete)
            .map((todo) => (
              <div className="todo-container">
                <div
                  className={"todo"}
                  key={todo._id}
                  onClick={() => completeTodo(todo._id)}
                >
                  <div className="checkbox"></div>

                  <div className="text">{todo.text}</div>
                </div>
                <div className="delete-container">
                  <div
                    className="delete-todo"
                    onClick={() => deleteTodo(todo._id)}
                  >
                    x
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p class="no-tasks">You currently have no tasks</p>
        )}
      </div>

      <h2>What I have accomplished today:</h2>
      <div className="todos">
        {todos
          .filter((todo) => todo.complete)
          .map((todo) => (
            <div className="todo-container">
              <div
                className={"todo is-complete fade-in"}
                key={todo._id}
                onClick={() => completeTodo(todo._id)}
              >
                <div className="checkbox"></div>

                <div className="text">{todo.text}</div>
              </div>
              <div className="delete-container">
                <div
                  className="delete-todo"
                  onClick={() => deleteTodo(todo._id)}
                >
                  x
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>

      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            X
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="button" onClick={createTodo}>
              Create Task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
