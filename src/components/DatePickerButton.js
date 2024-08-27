import React from "react";

function DatePickerButton({ dueDate, dueTime, dueTimeBool }) {
  return (
    <div>
      <p className="transition-all ease-in-out duration-200 border  rounded-lg px-2 py-1 flex items-center gap-x-[.35rem] cursor-pointer text-sm bg-gray-100 hover:bg-gray-200/75 border-gray-200 border-b-gray-300 not-started-select-shadow">
        {dueDate} {dueTimeBool ? "@ " + dueTime : ""}
      </p>
    </div>
  );
}

export default DatePickerButton;
