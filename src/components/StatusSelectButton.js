import React from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";

function StatusSelectButton({
  statusMenuOpen,
  setStatusMenuOpen,
  status,
  setStatus,
}) {
  return (
    <div className="relative text-sm w-full">
      <m.div
        onClick={() => setStatusMenuOpen(!statusMenuOpen)}
        className={`transition-all ease-in-out duration-200 border rounded-lg px-3 py-1 flex items-center justify-between cursor-pointer ${
          status === "Not Started"
            ? "bg-gray-100 hover:bg-gray-200/75 border-gray-200 border-b-gray-300 not-started-select-shadow"
            : status === "Research"
            ? "bg-purple-100 text-purple-600 hover:bg-purple-200/75 border-purple-200 border-b-purple-300 research-select-shadow"
            : status === "In Progress"
            ? "bg-blue-100 text-blue-600 hover:bg-blue-200/75 border-blue-200 border-b-blue-300 in-progress-select-shadow"
            : status === "Stalled"
            ? "bg-orange-100 text-orange-600 hover:bg-orange-200/75 border-orange-200 border-b-orange-300 stalled-select-shadow"
            : "bg-green-100 text-green-600 hover:bg-green-200/75 border-green-200 border-b-green-300 completed-select-shadow"
        }`}
      >
        <div className="flex items-center gap-x-[.35rem]">
          <div
            className={`transition-all ease-in-out duration-200 h-[.35rem] w-[.35rem] rounded-full ${
              status === "Not Started"
                ? "bg-gray-500"
                : status === "Research"
                ? "bg-purple-500"
                : status === "In Progress"
                ? "bg-blue-500"
                : status === "Stalled"
                ? "bg-orange-500"
                : "bg-green-500"
            }`}
          ></div>
          <p>{status}</p>
        </div>
        <ChevronDownIcon className="h-[.6rem] w-[.6rem]" />
      </m.div>
      <AnimatePresence>
        {statusMenuOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute right-0 bg-white task-card-shadow border border-gray-200 rounded-xl mt-2 p-2 w-44"
            onClick={(e) => e.stopPropagation()}
          >
            {[
              "Not Started",
              "Research",
              "In Progress",
              "Stalled",
              "Completed",
            ].map((item) => (
              <div
                key={item}
                onClick={() => {
                  setStatus(item);
                  setStatusMenuOpen(false);
                }}
                className="cursor-pointer rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100"
              >
                {item}
                {status === item && <CheckIcon className="h-3 w-3" />}
              </div>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default StatusSelectButton;
