// This represents a single todo item. You can mark it as completed, edit it, or delete it.

import React, { useState } from "react";
import { Todo } from "../interfaces/todo";

// Props we expect from parent:
// - the todo itself
// - updating/deleting flags to control UI while API calls are happening
// - callbacks for toggling, saving, and deleting
interface Props {
  todo: Todo;
  updating: boolean;
  deleting: boolean;
  onToggle: (id: number, completed: boolean) => Promise<void>;
  onSave: (id: number, title: string, description: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const TodoItem: React.FC<Props> = ({
  todo,
  updating,
  deleting,
  onToggle,
  onSave,
  onDelete,
}) => {
  // Local state for editing mode and input values
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [localError, setLocalError] = useState<string | null>(null);
  
  // If we're updating but not deleting, consider it "saving"
  const saving = updating && !deleting;

  // Toggle completed state
  const handleToggle = async () => {
    setLocalError(null); // reset any previous error
    try {
      await onToggle(todo.id, !todo.completed);
    } catch (err: any) {
      setLocalError(err?.message || "Failed to update");
    }
  };

  // Save changes when editing
  const handleSave = async () => {
    setLocalError(null);

    if (!title.trim()) {
      setLocalError("Title required"); // can't save empty title
      return;
    }

    try {
      await onSave(todo.id, title.trim(), description.trim());
      setEditing(false); // exit editing mode on success
    } catch (err: any) {
      setLocalError(err?.message || "Failed to save");
    }
  };

  // Delete the todo
  const handleDelete = async () => {
    setLocalError(null);

    // Confirm before deleting
    if (!window.confirm("Delete this todo?")) return;

    try {
      await onDelete(todo.id);
    } catch (err: any) {
      setLocalError(err?.message || "Failed to delete");
    }
  };

  return (
    <div className={`card todo-item ${todo.completed ? "completed" : ""}`}>
      {/* Left: checkbox toggle */}
      <div className="left">
        <label className="switch">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            disabled={updating || deleting} // don't let user toggle while busy
          />
          <span className="slider"></span>
        </label>
      </div>

      {/* Center: title, description, or editing inputs */}
      <div className="center">
        {!editing ? (
          <>
            <div className="title">{todo.title}</div>
            {todo.description && <div className="desc">{todo.description}</div>}
            <div className="meta">
              {todo.updatedAt ? new Date(todo.updatedAt).toLocaleString() : ""}
            </div>
          </>
        ) : (
          <>
            {/* Show inputs when editing */}
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={saving}
            />
            <textarea
              className="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              disabled={saving}
            />
          </>
        )}
      </div>

      {/* Right: action buttons */}
      <div className="right">
        {/* Show a spinner while saving */}
        {updating && !editing && <div className="spinner small" aria-hidden />}

        {editing ? (
          <>
            {/* Save & cancel buttons in edit mode */}
            <button className="btn small" onClick={handleSave} disabled={saving}>
              Save
            </button>
            <button
              className="btn ghost small"
              onClick={() => setEditing(false)}
              disabled={saving}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            {/* Edit & delete buttons */}
            <button
              className="btn small"
              onClick={() => setEditing(true)}
              disabled={updating || deleting} // prevent editing while busy
            >
              Edit
            </button>
            <button
              className="btn danger small"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </>
        )}
      </div>

      {/* Show local error messages below */}
      {localError && <div className="error">{localError}</div>}
    </div>
  );
};

export default TodoItem;