"use client";
import { updated } from "@/redux/features/TodoSlice";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { TodoSlice } from "@/redux/features/TodoSlice";

const page = ({ params }) => {
  const oldData = useSelector((state) => state.todo);

  let filteringData = oldData.filter((item) => item.id === params.id);
  console.log("this is filer>>>>>>", filteringData);

  const dispatch = useDispatch();
  const router = useRouter();
  const [newdata, newsetdata] = useState({
    newname: "",
    newwork: "",
  });

  // handle adding
  const handle_Add = (event) => {
    newsetdata({ ...newdata, [event.target.name]: event.target.value });
  };

  // handle submitting
  const handle_submite = (new_id) => {
    dispatch(
      updated({
        id: new_id,
        name: newdata.newname,
        work: newdata.newwork,
      })
    );

    alert("data has been updated");
    router.push("/");
  };

  return (
    <div className="grid grid-cols-1 justify-items-center mt-10">
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder={
            Array.isArray(filteringData) && filteringData.length > 0
              ? filteringData[0]?.name
              : "UpdateName"
          }
          className="py-2 px-10 outline-none border-2 border-green-600"
          name="newname"
          onChange={handle_Add}
        />
        <input
          type="text"
          placeholder={
            Array.isArray(filteringData) && filteringData.length > 0
              ? filteringData[0]?.work
              : "UpdateWork"
          }
          className="py-2 px-10 outline-none border-2 border-green-600"
          name="newwork"
          onChange={handle_Add}
        />
        <button
          className="py-2 bg-green-600 text-white"
          onClick={() => handle_submite(params.id)}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default page;
