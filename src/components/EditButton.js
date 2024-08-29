import React from "react";
import { PencilIcon } from "@heroicons/react/24/outline";

function EditButton({ editState, setEditState }) {
  return (
    <div onClick={() => setEditState(!editState)} className="pt-1">
      <div className="transition-all ease-in-out duration-200  rounded-lg px-2 py-1 flex items-center gap-x-[.35rem] cursor-pointer text-sm justify-center    hover:bg-gray-100 text-gray-400 hover:text-black">
        <PencilIcon className="h-4 w-4" />
      </div>
    </div>
  );
}

export default EditButton;
