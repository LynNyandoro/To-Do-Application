import React, { useState } from "react";

// Props: we expect a function `onAdd` to be passed down that handles adding a new todo
interface Props {
  onAdd: (title: string, description: string) => Promise<void>;
}

// The AddTodoForm component
const AddTodoForm: React.FC<Props> = ({ onAdd }) => {
  // Local state for the form inputs and loading/error states
  const [title, setTitle] = useState(""); // What the user types for the todo title
  const [description, setDescription] = useState(""); // Optional description
  const [loading, setLoading] = useState(false); // Are we waiting for the API call to finish?
  const [localError, setLocalError] = useState<string | null>(null); // Any local validation or API error

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload
    setLocalError(null); // reset any previous error

    // Simple validation: make sure the title isn't empty
    if (!title.trim()) {
      setLocalError("Title is required");
      return; // stop if validation fails
    }

    setLoading(true); // show loading state
    try {
      // Call the parent-provided onAdd function with trimmed values
      await onAdd(title.trim(), description.trim());

      // Clear the form if successful
      setTitle("");
      setDescription("");
    } catch (err: any) {
      // Show an error if the API call fails
      setLocalError(err?.message || "Failed to add todo");
    } finally {
      setLoading(false); // stop loading no matter what
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        marginBottom: "20px",
        width: "80%",
        margin: "0 auto" // center it horizontally
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          marginBottom: "15px",
          textAlign: "center"
        }}
      >
        Add New To-Do
      </h2>

      {/* The form itself */}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        {/* Title input */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="title" style={{ marginBottom: "5px", fontWeight: 500 }}>
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading} // disable while waiting for API
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem"
            }}
          />
        </div>

        {/* Description input */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="description" style={{ marginBottom: "5px", fontWeight: 500 }}>
            Description (optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading} // same here
            rows={3}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              resize: "vertical" // allow user to adjust height
            }}
          />
        </div>

        {/* Show error messages if any */}
        {localError && (
          <div style={{ color: "red", fontSize: "0.9rem", textAlign: "center" }}>
            {localError}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading} // disable to prevent double clicks
          style={{
            backgroundColor: "#334eac",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "background 0.3s"
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2b3e96")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#334eac")}
        >
          {loading ? "Adding..." : "Add To-Do"}
        </button>
      </form>
    </div>
  );
};

export default AddTodoForm;
