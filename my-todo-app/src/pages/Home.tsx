// The main page of our To-Do app.
// Handles fetching todos, adding, updating, and deleting them.
// Connects the UI (AddTodoForm & TodoList) to our mock API.

import React, { useEffect, useState } from "react";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
import { Todo } from "../interfaces/todo";
import * as api from "../api/mockAPI";

const Home: React.FC = () => {
  // Local state for todos
  const [todos, setTodos] = useState<Todo[]>([]);
  const [fetching, setFetching] = useState(false); // loading state
  const [globalError, setGlobalError] = useState<string | null>(null); // errors from API calls
  const [updatingIds, setUpdatingIds] = useState<number[]>([]); // track todos being updated
  const [deletingIds, setDeletingIds] = useState<number[]>([]); // track todos being deleted

  // Fetch todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch all todos from API
  const fetchTodos = async () => {
    setFetching(true);
    setGlobalError(null);

    const res = await api.getTodos();
    if (res.success && res.data) {
      setTodos(res.data);
    } else {
      setGlobalError(res.error || "Failed to fetch todos");
    }

    setFetching(false);
  };

  // Add a new todo
  const handleAdd = async (title: string, description: string) => {
    setGlobalError(null);

    const res = await api.addTodo({ title, description });
    if (res.success && res.data) {
      // Add new todo to the top of the list
      setTodos(prev => [res.data!, ...prev]);
    } else {
      setGlobalError(res.error || "Failed to add todo");
      throw new Error(res.error || "Failed to add");
    }
  };

  // Toggle completed status
  const handleToggle = async (id: number, completed: boolean) => {
    setGlobalError(null);
    setUpdatingIds(prev => [...prev, id]); // mark this todo as updating

    const res = await api.updateTodo(id, { completed });
    if (res.success && res.data) {
      setTodos(prev => prev.map(t => (t.id === id ? res.data! : t)));
    } else {
      setGlobalError(res.error || "Failed to toggle todo");
      throw new Error(res.error || "Failed to toggle");
    }

    setUpdatingIds(prev => prev.filter(x => x !== id)); // remove from updating
  };

  // Save changes after editing
  const handleSave = async (id: number, title: string, description: string) => {
    setGlobalError(null);
    setUpdatingIds(prev => [...prev, id]);

    const res = await api.updateTodo(id, { title, description });
    if (res.success && res.data) {
      setTodos(prev => prev.map(t => (t.id === id ? res.data! : t)));
    } else {
      setGlobalError(res.error || "Failed to save todo");
      throw new Error(res.error || "Failed to save");
    }

    setUpdatingIds(prev => prev.filter(x => x !== id));
  };

  // Delete a todo
  const handleDelete = async (id: number) => {
    setGlobalError(null);
    setDeletingIds(prev => [...prev, id]); // mark this todo as deleting

    const res = await api.deleteTodo(id);
    if (res.success) {
      setTodos(prev => prev.filter(t => t.id !== id));
    } else {
      setGlobalError(res.error || "Failed to delete todo");
      throw new Error(res.error || "Failed to delete");
    }

    setDeletingIds(prev => prev.filter(x => x !== id)); // remove from deleting
  };

  // Render
  return (
    <main style={{ width: "100%", padding: "20px 0", fontFamily: "sans-serif" }}>
      {/* Header */}
      <header
        style={{
          width: "100%",
          height: "60px",
          backgroundColor: "#334eac",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "white", fontSize: "1.5rem" }}>
          To-Do App (React + TypeScript)
        </h1>
      </header>

      {/* Main content container */}
      <div style={{ width: "80%", margin: "0 auto" }}>
        {/* Form for adding new todos */}
        <AddTodoForm onAdd={handleAdd} />

        {/* Show global error messages, if any */}
        {globalError && (
          <div style={{ color: "red", marginTop: "10px", fontSize: "0.9rem" }}>
            {globalError}
          </div>
        )}

        {/* List of todos */}
        <TodoList
          todos={todos}
          fetching={fetching}
          updatingIds={updatingIds}
          deletingIds={deletingIds}
          onToggle={handleToggle}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      </div>
    </main>
  );
};

export default Home;
