import { useState } from "react";
import {
  ChevronDownIcon,
  CheckIcon,
  EllipsisHorizontalIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion as m } from "framer-motion";
import StatusSelectButton from "./StatusSelectButton";
import DatePickerButton from "./DatePickerButton";
import OptionMenu from "./OptionMenu";

function Task({}) {
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [status, setStatus] = useState("Not Started");
  const [dueDate, setDueDate] = useState("October 12");
  const [dueTimeBool, setDueTimeBool] = useState(true);
  const [dueTime, setDueTime] = useState("12pm");
  //   const [borderColor, setBorderColor] = useState("transparent");

  return (
    <div className="task-card-shadow w-[22rem] border border-gray-200 border-b-gray-300 flex flex-col p-4 rounded-2xl gap-y-2 transition-colors duration-500">
      {/* Title and Option Menu Container */}
      <div className="flex justify-between items-start mt-[-.2rem]">
        <div className="font-bold text-lg max-w-64">
          Remember to do that thing that you need to do
        </div>
        <OptionMenu />
      </div>

      {/* Description Container */}
      <section className="flex flex-col gap-y-1 items-start pb-1">
        <label className="text-xs text-gray-400 pl-1">Description</label>
        <textarea className="border border-gray-200 border-b-gray-300 rounded-lg px-2 py-1 items-center gap-x-[.35rem] cursor-text text-sm h-[7rem] w-full resize-none">
          This is the task description that can even be a few lines based on how
          long it is. Sometimes there may be a due date, sometimes there may
          not.
        </textarea>
      </section>

      {/* Date and Status Container */}
      <section className="flex justify-between items-start pt-1">
        <div className="flex flex-col gap-y-1 items-start">
          <label className="text-xs text-gray-400 pl-1">Due Date</label>
          <DatePickerButton
            dueDate={dueDate}
            dueTime={dueTime}
            dueTimeBool={dueTimeBool}
          />
        </div>
        <div className="flex flex-col gap-y-1 items-end">
          <label className="text-xs text-gray-400 pr-1">Status</label>
          <StatusSelectButton
            status={status}
            setStatus={setStatus}
            statusMenuOpen={statusMenuOpen}
            setStatusMenuOpen={setStatusMenuOpen}
          />
        </div>
      </section>

      {/* Stalled Context Container */}
      {status === "Stalled" && (
        <section className="flex flex-col gap-y-1 items-start pt-2">
          <label className="text-xs text-gray-400 pl-1">Stalled Context</label>
          <textarea className="border border-gray-200 border-b-gray-300 rounded-lg px-2 py-1 items-center gap-x-[.35rem] cursor-text text-sm h-[3.5rem] w-full resize-none"></textarea>
        </section>
      )}
    </div>
  );
}

export default Task;
