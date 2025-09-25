import React from "react";
import { Todo } from "../interfaces/todo";
import TodoItem from "./TodoItem";

// Props we expect from the parent:
// - todos array
// - fetching flag to show loading state
// - arrays of IDs currently being updated or deleted
// - callbacks for toggling, saving, deleting individual todos
interface Props {
  todos: Todo[];
  fetching: boolean;
  updatingIds: number[];
  deletingIds: number[];
  onToggle: (id: number, completed: boolean) => Promise<void>;
  onSave: (id: number, title: string, description: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const TodoList: React.FC<Props> = ({
  todos,
  fetching,
  updatingIds,
  deletingIds,
  onToggle,
  onSave,
  onDelete,
}) => {
  // If we're still loading data from the API, show a friendly "Loading..." message
  if (fetching) {
    return <div style={{ textAlign: "center", marginTop: "20px" }}>Loading...</div>;
  }

  // If there are no todos yet, encourage the user to add one
  if (todos.length === 0) {
    return <div style={{ textAlign: "center", marginTop: "20px" }}>No To-Dos yet!</div>;
  }

  // Main container for the list
  return (
    <div
      style={{
        padding: "20px",
        marginBottom: "20px",
        margin: "0 auto",
        marginTop: "50px",
      }}
    >
      {/* Heading */}
      <h2 style={{ fontSize: "1.5rem", marginBottom: "15px", textAlign: "center" }}>
        Your To-Do List
      </h2>

      {/* White card background to hold the todo items */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: "20px",
          width: "80%",
          margin: "0 auto",
          marginTop: "30px",
        }}
      >
        {/* Using a table layout (though each TodoItem handles its own layout) */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              updating={updatingIds.includes(todo.id)} // check if this todo is being updated
              deleting={deletingIds.includes(todo.id)} // check if this todo is being deleted
              onToggle={onToggle}
              onSave={onSave}
              onDelete={onDelete}
            />
          ))}
        </table>
      </div>
    </div>
  );
};

export default TodoList;
