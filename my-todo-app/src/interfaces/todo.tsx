// This defines the shape of a single To-Do item in our app
export interface Todo {
  id: number;               // Unique identifier for the todo
  title: string;            // The main task name/title
  description: string;      // Optional extra details about the task
  completed: boolean;       // Has the task been completed or not
  createdAt?: string;       // Timestamp when it was created (optional)
  updatedAt?: string;       // Timestamp when it was last updated (optional)
}

// This defines the shape of the response we expect from our "API"
export interface ApiResponse<T> {
  success: boolean; // Did the API call succeed or fail?
  data?: T;         // The actual data returned (if successful)
  error?: string;   // Error message (if something went wrong)
}