import { useState } from "react";
import {
  ChevronDownIcon,
  CheckIcon,
  EllipsisHorizontalIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion as m } from "framer-motion";
import StatusSelectButton from "./StatusSelectButton";

function Task({}) {
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [status, setStatus] = useState("Not Started");

  return (
    <div className="task-card-shadow w-[22rem] border border-gray-200 border-b-gray-300 flex flex-col p-3 rounded-2xl gap-y-2">
      <div className="flex justify-between items-start">
        <div className="font-bold text-md max-w-64">
          Remember to do that thing that you need to do
        </div>
        <EllipsisHorizontalIcon className="h-5 w-5 rounded-md bg-gray-200/80" />
      </div>
      <div className="flex justify-between items-start">
        <div className="bg-gray-200/80 rounded-lg px-2 py-1 flex items-center gap-x-2 cursor-pointer text-xs">
          {/* <GlobeAmericasIcon className="h-3 w-3" /> */}
          <p>Global</p>
        </div>
        <p className="bg-gray-200/80 rounded-lg px-2 py-1 flex items-center gap-x-2 cursor-pointer text-xs">
          10m
        </p>
        {/* <div className="h-5 w-5 rounded-md bg-gray-300"></div> */}
      </div>
      <div className="text-sm">
        This is the task description that can even be a few lines based on how
        long it is. Sometimes there may be a due date, sometimes there may not.
      </div>
      <section className="flex justify-between items-end pt-1">
        <p className="bg-gray-200/80 hover:bg-gray-300/60 text-gray-800 rounded-lg px-2 py-1 flex items-center gap-x-2 cursor-pointer text-sm">
          No Due Date
        </p>

        <StatusSelectButton
          status={status}
          setStatus={setStatus}
          statusMenuOpen={statusMenuOpen}
          setStatusMenuOpen={setStatusMenuOpen}
        />
      </section>
    </div>
  );
}

export default Task;
