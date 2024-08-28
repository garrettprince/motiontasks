import { useState, useEffect } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion as m } from "framer-motion";
import StatusSelectButton from "./StatusSelectButton";
import DatePickerButton from "./DatePickerButton";
import EditButton from "./EditButton";
import TaskActionButtons from "./TaskActionButtons";
import CancelButton from "./CancelButton";

function Task({}) {
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [status, setStatus] = useState("Not Started");
  const [dueDate, setDueDate] = useState("October 12");
  const [dueTimeBool, setDueTimeBool] = useState(true);
  const [dueTime, setDueTime] = useState("12pm");
  const [editState, setEditState] = useState(true);
  //   const [borderColor, setBorderColor] = useState("transparent");

  return (
    <m.div
      className={`task-card-shadow ${
        editState ? "w-[23rem]" : "w-[22rem]"
      } border border-gray-200 border-b-gray-300 flex flex-col p-4 rounded-2xl gap-y-2 transition-all duration-500`}
    >
      {/* Title and Edit Button Container */}
      <section className="flex justify-between items-start mt-[-.2rem] ">
        <div>
          <AnimatePresence>
            {editState && (
              <m.label
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-xs text-gray-400 pl-1"
              >
                Title
              </m.label>
            )}
          </AnimatePresence>
          <div className="font-medium text-lg max-w-64">
            Remember to do that thing that you need to do
          </div>
        </div>
        <div className="">
          <EditButton editState={editState} setEditState={setEditState} />
        </div>
      </section>

      {/* Description Container */}
      <section className="flex flex-col gap-y-1 items-start pb-1">
        <AnimatePresence>
          {editState && (
            <m.label
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-gray-400 pl-1"
            >
              Description
            </m.label>
          )}
        </AnimatePresence>
        <textarea className="border border-gray-200 border-b-gray-300 rounded-lg px-2 py-1 items-center gap-x-[.35rem] cursor-text text-sm h-[7rem] w-full resize-none"></textarea>
      </section>

      {/* Date and Status Container */}
      <section className="flex justify-between w-full pt-1 gap-x-4">
        <div className="flex flex-col gap-y-1  w-full">
          <AnimatePresence>
            {editState && (
              <m.label
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-xs text-gray-400 pl-1"
              >
                Due Date
              </m.label>
            )}
          </AnimatePresence>
          <DatePickerButton
            dueDate={dueDate}
            dueTime={dueTime}
            dueTimeBool={dueTimeBool}
          />
        </div>
        <div className="flex flex-col gap-y-1 items-end w-full">
          <AnimatePresence>
            {editState && (
              <m.label
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-xs text-gray-400 pr-1"
              >
                Status
              </m.label>
            )}
          </AnimatePresence>
          <StatusSelectButton
            status={status}
            setStatus={setStatus}
            statusMenuOpen={statusMenuOpen}
            setStatusMenuOpen={setStatusMenuOpen}
          />
        </div>
      </section>

      {/* Task Actions Container */}
      {/* {!editState && (
        <div className="flex justify-end">
            <EditButton editState={editState} setEditState={setEditState} />
        </div>
      )} */}
      {editState && (
        <div className="flex flex-col gap-y-1 items-start pt-2">
          <AnimatePresence>
            <m.label
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-gray-400 pl-1"
            >
              Task Actions
            </m.label>

            <div className="flex items-center w-full justify-between">
              <CancelButton setEditState={setEditState} />
              <div>
                <TaskActionButtons
                  editState={editState}
                  setEditState={setEditState}
                />
              </div>
            </div>
          </AnimatePresence>
        </div>
      )}

      {/* Stalled Context Container */}
      {/* {status === "Stalled" && (
        <section className="flex flex-col gap-y-1 items-start pt-2">
          <label className="text-xs text-gray-400 pl-1">Stalled Context</label>
          <textarea className="border border-gray-200 border-b-gray-300 rounded-lg px-2 py-1 items-center gap-x-[.35rem] cursor-text text-sm h-[3.5rem] w-full resize-none"></textarea>
        </section>
      )} */}
    </m.div>
  );
}

export default Task;
