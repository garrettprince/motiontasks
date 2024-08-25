import { useState } from "react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion as m } from "framer-motion";
function Task() {
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [status, setStatus] = useState("Not Started");

  return (
    <div className="bg-gray-100 w-96 flex flex-col p-4 rounded-2xl gap-y-2">
      <div className="flex justify-between items-start">
        <div className="font-bold text-xl max-w-72">
          Remember to do that thing that yo
        </div>
        <div className="h-5 w-5 rounded-md bg-gray-300"></div>
      </div>
      <div className="">
        This is the task description that can even be a few lines based on how
        long it is
      </div>
      <section className="flex justify-between items-end pt-2">
        <p className="bg-gray-200/80 rounded-lg px-2 py-1 flex items-center gap-x-2 cursor-pointer text-sm border border-gray-300 border-2">Due 4/11 @ 12pm</p>
        <div className="relative text-sm">
          <m.div
            onClick={() => setStatusMenuOpen(!statusMenuOpen)}
            className={`rounded-lg px-2 py-1 flex items-center gap-x-2 cursor-pointer ${
              status === "Not Started"
                ? "bg-gray-100"
                : status === "Research"
                ? "bg-blue-100"
                : status === "In Progress"
                ? "bg-orange-100"
                : status === "Stalled"
                ? "bg-red-100"
                : "bg-green-100"
            }`}
          >
            <div
              className={`h-2 w-2 rounded-full ${
                status === "Not Started"
                  ? "bg-gray-500"
                  : status === "Research"
                  ? "bg-blue-500"
                  : status === "In Progress"
                  ? "bg-orange-500"
                  : status === "Stalled"
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
            ></div>
            <p>{status}</p>
            <ChevronDownIcon className="h-3 w-3" />
          </m.div>
          <AnimatePresence>
            {statusMenuOpen && (
              <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.1 }}
                className="absolute right-0 bg-white shadow-md rounded-lg mt-2 p-2 w-44"
              >
                <div
                  onClick={() => {
                    setStatus("Not Started");
                    setStatusMenuOpen(false);
                  }}
                  className="cursor-pointer p-1 flex items-center justify-between hover:bg-gray-100"
                >
                  Not Started
                  {status === "Not Started" && <CheckIcon className="h-3 w-3" />}
                </div>
                <div
                  onClick={() => {
                    setStatus("Research");
                    setStatusMenuOpen(false);
                  }}
                  className="cursor-pointer p-1 flex items-center justify-between hover:bg-gray-100"
                >
                  Research
                  {status === "Research" && <CheckIcon className="h-3 w-3" />}
                </div>
                <div
                  onClick={() => {
                    setStatus("In Progress");
                    setStatusMenuOpen(false);
                  }}
                  className="cursor-pointer p-1 flex items-center justify-between hover:bg-gray-100"
                >
                  In Progress
                  {status === "In Progress" && <CheckIcon className="h-3 w-3" />}
                </div>
                <div
                  onClick={() => {
                    setStatus("Stalled");
                    setStatusMenuOpen(false);
                  }}
                  className="cursor-pointer p-1 flex items-center justify-between hover:bg-gray-100"
                >
                  Stalled
                  {status === "Stalled" && <CheckIcon className="h-3 w-3" />}
                </div>
                <div
                  onClick={() => {
                    setStatus("Completed");
                    setStatusMenuOpen(false);
                  }}
                  className="cursor-pointer p-1 flex items-center justify-between hover:bg-gray-100"
                >
                  Completed
                  {status === "Completed" && <CheckIcon className="h-3 w-3" />}
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

export default Task;
