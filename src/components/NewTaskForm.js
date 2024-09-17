import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Formik, Form, Field } from "formik";
import { motion, AnimatePresence } from "framer-motion";

function NewTaskForm({
  showNewTaskForm,
  setShowNewTaskForm,
  handleSubmit,
  showCompletedTasks,
  setShowCompletedTasks,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (showNewTaskForm && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 0);
    }
  }, [showNewTaskForm]);

  return (
    <>
      <AnimatePresence>
        <div className="flex w-full justify-between">
          <Button
            onClick={() => (
              setShowCompletedTasks(!showCompletedTasks),
              setShowNewTaskForm(false)
            )}
            variant="outline"
            className="text-xs h-6 border border-gray-300 rounded-lg"
          >
            {showCompletedTasks ? "Show Active Tasks" : "Show Completed Tasks"}
          </Button>
          <Button
            onClick={() => (
              setShowNewTaskForm(true), setShowCompletedTasks(false)
            )}
            className="mb-4 h-6 rounded-lg border border-gray-300"
            variant="outline"
            size="sm"
          >
            New Task
          </Button>
        </div>
      </AnimatePresence>
      {showNewTaskForm && (
        <div className="w-full border p-3 rounded-2xl border-gray-300 mb-4">
          <Formik
            initialValues={{
              title: "",
              description: "",
              status: "Not Started",
              dueDate: null,
            }}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <Field name="title">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="New task"
                      className="w-full mb-2 p-2 text-md font-regular resize-none rounded-lg border-none shadow-none placeholder:text-gray-400"
                      autoComplete="off"
                      required
                      ref={inputRef}
                    />
                  )}
                </Field>
                <Field
                  as="textarea"
                  name="description"
                  value={values.description}
                  onChange={(e) => setFieldValue("description", e.target.value)}
                  placeholder="Task Description"
                  className="w-full p-2 font-medium focus:border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none mb-2 transition-all duration-150 ease-in-out focus:ring-inset-2 text-xs"
                  autoComplete="off"
                  required
                  rows={2}
                />
                <Select
                  name="status"
                  onValueChange={(value) => setFieldValue("status", value)}
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
                    className="w-full h-6 rounded-lg"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowNewTaskForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="w-full h-6 rounded-lg"
                    variant="outline"
                    size="sm"
                  >
                    Create Task
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
}

export default NewTaskForm;
