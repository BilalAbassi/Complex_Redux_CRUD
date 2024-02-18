"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "@/redux/features/TodoSlice";
import { nanoid } from "nanoid";
import { deleted } from "@/redux/features/TodoSlice";

const Inputs = () => {
  const dispatch = useDispatch();
  const [data, setdata] = useState({
    name: "",
    work: "",
  });

  // handle adding
  const handle_Add = (event) => {
    setdata({ ...data, [event.target.name]: event.target.value });
  };

  // handle submitting
  const handle_submite = (event) => {
    event.preventDefault();
    dispatch(
      add({
        id: nanoid(),
        name: data.name,
        work: data.work,
      })
    );
    alert("data has been addted");
    setdata("");
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <input
        type="text"
        placeholder="Name"
        className="py-2 px-10 outline-none border-2 border-green-600"
        name="name"
        onChange={handle_Add}
      />
      <input
        type="text"
        placeholder="Work"
        className="py-2 px-10 outline-none border-2 border-green-600"
        name="work"
        onChange={handle_Add}
      />
      <button className="py-2 bg-green-600 text-white" onClick={handle_submite}>
        Submite
      </button>
    </div>
  );
};

export default Inputs;
