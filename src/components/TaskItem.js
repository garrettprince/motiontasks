import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Formik, Form, Field } from "formik";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Check, Pencil, Trash2 } from "lucide-react";

function TaskItem({
  task,
  isEditing,
  setEditingTaskId,
  handleUpdate,
  handleDelete,
}) {
  const editingTaskInputRef = useRef(null);

  const renderEditingForm = () => (
    <Formik
      initialValues={{
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: new Date(task.due_date),
      }}
      onSubmit={(values) => {
        handleUpdate(task.id, "title", values.title);
        handleUpdate(task.id, "description", values.description);
        setEditingTaskId(null);
      }}
    >
      {({ values, setFieldValue, isSubmitting, resetForm }) => (
        <Form>
          <div className="flex">
            <p className="text-[.6rem] text-gray-500 bg-gray-100 py-1 px-2 rounded-lg mb-2 flex font-medium">
              TASK {task.id}
            </p>
          </div>
          <Field
            as={Input}
            name="title"
            className="font-medium text-md mb-2 full p-2 focus:border-gray-300 rounded-lg focus:ring-inset-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent border-none shadow-none transition-all duration-150 ease-in-out"
            autoComplete="off"
            placeholder="Task title"
            required
            ref={editingTaskInputRef}
          />
          <Field
            as="textarea"
            name="description"
            className="w-full p-2 font-medium focus:border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none mb-2 transition-all duration-150 ease-in-out focus:ring-inset-2 text-xs"
            rows={2}
            placeholder="Task description"
            autoComplete="off"
            required
            style={{ height: "auto", minHeight: "3rem" }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
          <Select
            layoutId="status"
            name="status"
            onValueChange={(value) => {
              setFieldValue("status", value);
              handleUpdate(task.id, "status", value);
            }}
            value={values.status}
            required
          >
            <SelectTrigger
              className={`transition-all ease-in-out duration-100 border rounded-lg px-2 py-1 flex items-center justify-between cursor-pointer h-6 mb-3 ${
                values.status === "Not Started"
                  ? "bg-white hover:bg-gray-100 border-gray-200  focus:ring-gray-400 "
                  : values.status === "Research"
                  ? "bg-purple-100 text-purple-600 hover:bg-purple-200/75 border-purple-200  focus:ring-purple-400"
                  : values.status === "In Progress"
                  ? "bg-blue-100 text-blue-600 hover:bg-blue-200/75 border-blue-200  focus:ring-blue-400"
                  : values.status === "Stalled"
                  ? "bg-orange-100 text-orange-600 hover:bg-orange-200/75 border-orange-200  focus:ring-orange-400"
                  : "bg-green-100 text-green-600 hover:bg-green-200/75 border-green-200  focus:ring-green-400"
              } focus:outline-none focus:ring-2 focus:ring-offset-1`}
            >
              <div className="flex items-center">
                <div
                  className={`w-[0.35rem] h-[0.35rem] rounded-full mr-2 ${
                    values.status === "Not Started"
                      ? "bg-gray-400"
                      : values.status === "Research"
                      ? "bg-purple-600"
                      : values.status === "In Progress"
                      ? "bg-blue-600"
                      : values.status === "Stalled"
                      ? "bg-orange-600"
                      : "bg-green-600"
                  }`}
                ></div>
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem className="h-6 rounded-lg" value="Not Started">
                Not Started
              </SelectItem>
              <SelectItem className="h-6 rounded-lg" value="Research">
                Research
              </SelectItem>
              <SelectItem className="h-6 rounded-lg" value="In Progress">
                In Progress
              </SelectItem>
              <SelectItem className="h-6 rounded-lg" value="Stalled">
                Stalled
              </SelectItem>
              <SelectItem className="h-6 rounded-lg" value="Completed">
                Completed
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="flex justify-between space-x-2">
            <Button
              type="button"
              className="w-20 h-6 rounded-lg"
              variant="outline"
              size="sm"
              onClick={() => {
                resetForm();
                setEditingTaskId(null);
              }}
            >
              Cancel
            </Button>
            <div className="flex justify-between space-x-2">
              <div>
                <Button
                  type="button"
                  className="h-6 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 transition-all ease-in-out duration-150 border border-red-300 focus:ring-red-400"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(task.id)}
                  tabIndex="-1"
                >
                  <Trash2 className="w-3 h-3 mr-1 mb-[.1rem]" />
                  <span>Delete</span>
                </Button>
              </div>
              <Button
                type="submit"
                className="w-20 h-6 rounded-lg"
                variant="outline"
                size="sm"
                disabled={isSubmitting}
              >
                <Check className="w-3 h-3 mr-1 " />
                Save
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );

  const renderNonEditingView = () => (
    <motion.div className="flex flex-col">
      <div className="flex justify-between">
        <p className="text-[.6rem] text-gray-500 bg-gray-100 py-1 px-2 rounded-lg mb-2 flex font-medium">
          TASK {task.id}
        </p>
      </div>
      <h3 className="text- font-medium mb-2">{task.title}</h3>
      <p
        dangerouslySetInnerHTML={{
          __html: task.description.replace(/\n/g, "<br />"),
        }}
        className="text-xs mb-3"
      ></p>
      <div className="flex justify-between items-center space-x-3">
        <Select
          value={task.status}
          onValueChange={(value) => handleUpdate(task.id, "status", value)}
        >
          <SelectTrigger
            className={`transition-all w-full ease-in-out duration-100 border rounded-lg px-2 py-1 flex items-center justify-between cursor-pointer h-6 font-medium ${
              task.status === "Not Started"
                ? "bg-white hover:bg-gray-100 border-gray-300 focus:ring-gray-400"
                : task.status === "Research"
                ? "bg-purple-100 text-purple-600 hover:bg-purple-200/75 border-purple-300  focus:ring-purple-400"
                : task.status === "In Progress"
                ? "bg-blue-100 text-blue-600 hover:bg-blue-200/75 border-blue-300 focus:ring-blue-400"
                : task.status === "Stalled"
                ? "bg-orange-100 text-orange-600 hover:bg-orange-200/75 border-orange-300 focus:ring-orange-400"
                : "bg-green-100 text-green-600 hover:bg-green-200/75 border-green-300 focus:ring-green-400"
            } focus:outline-none focus:ring-2 focus:ring-offset-1`}
          >
            <div className="flex items-center">
              <div
                className={`w-[0.35rem] h-[0.35rem] rounded-full mr-2 ml-1 ${
                  task.status === "Not Started"
                    ? "bg-gray-400"
                    : task.status === "Research"
                    ? "bg-purple-600"
                    : task.status === "In Progress"
                    ? "bg-blue-600"
                    : task.status === "Stalled"
                    ? "bg-orange-600"
                    : "bg-green-600"
                }`}
              ></div>
              <SelectValue placeholder="Status" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem className="h-6 rounded-lg" value="Not Started">
              Not Started
            </SelectItem>
            <SelectItem className="h-6 rounded-lg" value="Research">
              Research
            </SelectItem>
            <SelectItem className="h-6 rounded-lg" value="In Progress">
              In Progress
            </SelectItem>
            <SelectItem className="h-6 rounded-lg" value="Stalled">
              Stalled
            </SelectItem>
            <SelectItem className="h-6 rounded-lg" value="Completed">
              Completed
            </SelectItem>
          </SelectContent>
        </Select>
        <button
          onClick={() => setEditingTaskId(task.id)}
          className="items-center text-gray-400 hover:text-black focus:text-black  hover:bg-gray-100 hover:shadow-sm p-[.35rem] rounded-md transition-all ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
        >
          <Pencil className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="w-full border p-3 rounded-2xl border-gray-300 mb-4"
    >
      {isEditing ? renderEditingForm() : renderNonEditingView()}
    </motion.div>
  );
}

export default TaskItem;
