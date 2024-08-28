import React from "react";

function TaskActionButtons({ editState, setEditState }) {
  return (
    <div className="flex justify-between w-full gap-x-2">
      <button className="transition-all ease-in-out duration-200 border  rounded-lg px-2 py-1 flex items-center justify-center gap-x-[.35rem] cursor-pointer text-sm bg-red-100 hover:bg-red-200/75 border-red-200 border-b-red-300 delete-button-shadow w-20 text-red-700">
        Delete
      </button>
      
      <button
        onClick={() => setEditState(false)}
        className="transition-all ease-in-out duration-200 border  rounded-lg px-2 py-1 flex items-center justify-center gap-x-[.35rem] cursor-pointer text-sm bg-green-100 hover:bg-green-200/75 border-green-200 border-b-green-300 not-started-select-shadow w-20 completed-select-shadow text-green-700"
      >
        Save
      </button>
    </div>
  );
}

export default TaskActionButtons;
