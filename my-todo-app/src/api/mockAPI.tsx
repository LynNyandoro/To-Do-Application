// This file fakes API requests for our To-Do app.
// We're just keeping the data in memory and using setTimeout to pretend there's network delay.

import { Todo, ApiResponse } from "../interfaces/todo";

// Keep track of the next ID for new todos
let _nextId = 4;

// Here's our little in-memory database of todos for testing
let _todos: Todo[] = [
  { id: 1, title: "Buy groceries", description: "Milk, eggs, bread", completed: false, createdAt: new Date().toISOString() },
  { id: 2, title: "Read a chapter", description: "Finish chapter 7 of the book", completed: false, createdAt: new Date().toISOString() },
  { id: 3, title: "Pay bills", description: "Electricity & internet", completed: true, createdAt: new Date().toISOString() }
];

// Randomly fail some requests to make it feel like a real network sometimes
const randomFail = (failProb = 0.08) => Math.random() < failProb;

// Fake network delay: between ~600ms and 1000ms
const delay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms + Math.random() * 400));

// Fetch all todos
export async function getTodos(): Promise<ApiResponse<Todo[]>> {
  await delay(); // wait a bit like a real API
  if (randomFail()) return { success: false, error: "Network error: failed to fetch todos" }; // oops, network failed
  return { success: true, data: _todos.map(t => ({ ...t })) }; // return a copy so nobody messes with our array
}

// Add a new todo
export async function addTodo(payload: { title: string; description: string }): Promise<ApiResponse<Todo>> {
  await delay();
  if (randomFail()) return { success: false, error: "Network error: failed to create todo" };

  const newTodo: Todo = {
    id: _nextId++, // give it a unique ID
    title: payload.title,
    description: payload.description,
    completed: false, // new todos start off incomplete
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  _todos = [newTodo, ..._todos]; // put the newest todo at the top
  return { success: true, data: { ...newTodo } }; // return a copy for safety
}

// Update an existing todo
export async function updateTodo(id: number, updates: Partial<Todo>): Promise<ApiResponse<Todo>> {
  await delay();
  if (randomFail()) return { success: false, error: "Network error: failed to update todo" };

  const idx = _todos.findIndex(t => t.id === id);
  if (idx === -1) return { success: false, error: "Todo not found" }; // can't update what doesn't exist

  // Merge changes and update the timestamp
  _todos[idx] = { ..._todos[idx], ...updates, updatedAt: new Date().toISOString() };
  return { success: true, data: { ..._todos[idx] } }; // send back the updated todo
}

// Delete a todo
export async function deleteTodo(id: number): Promise<ApiResponse<null>> {
  await delay();
  if (randomFail()) return { success: false, error: "Network error: failed to delete todo" };

  const idx = _todos.findIndex(t => t.id === id);
  if (idx === -1) return { success: false, error: "Todo not found" }; // nothing to delete

  _todos.splice(idx, 1); // remove it from our array
  return { success: true, data: null }; // deletion successful, nothing to return
}