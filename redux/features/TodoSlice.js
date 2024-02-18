"use client";
import { createSlice, current } from "@reduxjs/toolkit";

const gettingdata = JSON.parse(localStorage.getItem("todoData"));
const preData = [
  {
    id: 1,
    name: "jim",
    work: "dev",
  },
  {
    id: 2,
    name: "kim",
    work: "sale",
  },
  {
    id: 3,
    name: "tim",
    work: "ceo",
  },
];

let initialState;

// if (gettingdata && Array.isArray(gettingdata) && gettingdata.length > 0) {
//   initialState = [...preData, ...gettingdata];
// } else {
//   initialState = preData;
// }

if (gettingdata && Array.isArray(gettingdata) && gettingdata.length > 0) {
  // Use Set to keep track of unique ids
  const uniqueIds = new Set();

  // Filter out duplicates based on id
  initialState = [...preData, ...gettingdata].filter((item) => {
    if (!uniqueIds.has(item.id)) {
      uniqueIds.add(item.id);
      return true;
    }
    return false;
  });
} else {
  initialState = preData;
}

export const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
      let Data = JSON.stringify(current(state));
      localStorage.setItem("todoData", Data);
    },
    deleted: (state, action) => {
      const newState = state.filter((item) => item.id !== action.payload.id);
      let newData = JSON.stringify(newState);
      localStorage.setItem("todoData", newData);
      return newState;
    },
    updated: (state, action) => {
      let newState = state.map((item) => {
        if (item.id === action.payload.id) {
          // If the item matches, update it with the payload data
          return action.payload;
        } else {
          // Otherwise, keep the item unchanged
          return item;
        }
      });

      // Convert the new state to JSON and update local storage
      let newData = JSON.stringify(newState);
      localStorage.setItem("todoData", newData);

      // Return the new state
      return newState;
    },
  },
  // prepare(value){

  // }
});

export const { add, deleted, updated } = TodoSlice.actions;
export default TodoSlice.reducer;
