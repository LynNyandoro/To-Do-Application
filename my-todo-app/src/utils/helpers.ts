// A collection of small helper functions for todos and API simulation
// Filter todos based on completion status
export const filterTodos = (todos: any[], showCompleted: boolean) => {
  return todos.filter(todo => todo.completed === showCompleted);
};

// Simulate API errors
export const simulateApiError = (message?: string) => {
  return {
    success: false,             // always false because it's an error
    error: message || "Something went wrong", // default message if none provided
    data: null,                 // no data returned
  };
};

// Truncate text for display
export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text; // short text is fine
  return text.slice(0, maxLength) + "...";   // cut and add ellipsis
};