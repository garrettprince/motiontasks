import React from "react";

function CancelButton({ setEditState }) {
  return (
    <div
      onClick={() => setEditState(false)}
      className="transition-all ease-in-out duration-200  rounded-lg px-2 py-1 flex items-center justify-center gap-x-[.35rem] cursor-pointer text-sm w-20 bg-white border border-gray-300 border-b-gray-300 hover:bg-gray-100 not-started-select-shadow "
    >
      Cancel
    </div>
  );
}

export default CancelButton;
