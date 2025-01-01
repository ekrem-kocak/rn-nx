import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { todoService, Todo } from '@rn-nx/core';

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (userId: string) => {
    const todos = await todoService.getTodos(userId);
    return todos;
  }
);

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async ({ title, userId }: { title: string; userId: string }) => {
    const todo = await todoService.addTodo({
      title,
      completed: false,
      userId,
      createdAt: new Date(),
    });
    return todo;
  }
);

export const toggleTodo = createAsyncThunk(
  'todos/toggleTodo',
  async ({ id, completed }: { id: string; completed: boolean }) => {
    await todoService.updateTodo(id, { completed });
    return { id, completed };
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: string) => {
    await todoService.deleteTodo(id);
    return id;
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Bir hata oluştu';
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const todo = state.todos.find((t) => t.id === action.payload.id);
        if (todo) {
          todo.completed = action.payload.completed;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
