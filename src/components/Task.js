import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/utils/supabase";
import { Formik, Form, Field } from "formik";
import { DatePicker } from "@/components/DatePicker";
import { Check, Pencil, Trash, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


function Task3() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const newTaskInputRef = useRef(null);
  const editingTaskInputRef = useRef(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (showNewTaskForm && newTaskInputRef.current) {
      newTaskInputRef.current.focus();
    }
  }, [showNewTaskForm]);

  useEffect(() => {
    if (editingTaskId && editingTaskInputRef.current) {
      editingTaskInputRef.current.focus();
    }
  }, [editingTaskId]);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching tasks:", error);
      } else {
        setTasks(data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { data, error } = await supabase.from("tasks").insert({
        title: values.title,
        description: values.description,
        status: values.status,
        due_date: values.dueDate,
      });

      if (error) {
        console.error("Error saving task:", error);
      } else {
        console.log("Task saved successfully:", data);
        resetForm();
        fetchTasks();
        setShowNewTaskForm(false);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleUpdate = async (id, field, value) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .update({ [field]: value })
        .eq("id", id);

      if (error) {
        console.error(`Error updating task ${field}:`, error);
      } else {
        console.log(`Task ${field} updated successfully:`, data);
        fetchTasks();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id);

      if (error) {
        console.error("Error deleting task:", error);
      } else {
        console.log("Task deleted successfully");
        setTasks(tasks.filter((task) => task.id !== id));
        setEditingTaskId(null);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    //////////
    // FORM //
    //////////
    <motion.div
      layout
      className="flex flex-col items-center justify-center w-72 mx-auto font-medium"
    >
      <div className="flex w-full justify-end">
        <Button
          onClick={() => setShowNewTaskForm(true)}
          className="mb-4"
          variant="default"
          size="lg"
        >
          New Task
        </Button>
      </div>
      {showNewTaskForm && (
        <div className="w-full border p-4 rounded-2xl mb-2">
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
                <Textarea
                  name="title"
                  value={values.title}
                  onChange={(e) => {
                    setFieldValue("title", e.target.value);
                    e.target.style.height = "20px";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                  placeholder="New task"
                  className="w-full mb-2 p-2 text-xl resize-none rounded-lg overflow-hidden border-none shadow-none placeholder:text-gray-400"
                  autoComplete="off"
                  required
                  rows={1}
                  ref={newTaskInputRef}
                />
                <Input
                  type="text"
                  name="description"
                  value={values.description}
                  onChange={(e) => setFieldValue("description", e.target.value)}
                  placeholder="Task Description"
                  className="w-full mb-2 p-2 border rounded"
                  autoComplete="off"
                  required
                />
                <section className="flex justify-between space-x-2">
                  <DatePicker
                    selected={values.dueDate}
                    onChange={(date) => setFieldValue("dueDate", date)}
                    className="min-w-[8rem] mb-2 p-2 border rounded"
                    required
                  />
                  <Select
                    name="status"
                    onValueChange={(value) => setFieldValue("status", value)}
                    value={values.status}
                    className="mb-2 p-2 border rounded"
                    required
                  >
                    <SelectTrigger
                      className={`transition-all ease-in-out duration-100 border rounded-lg px-2 py-1 flex items-center justify-between cursor-pointer h-8 ${
                        values.status === "Not Started"
                          ? "bg-white hover:bg-gray-100 border-gray-200 border-b-gray-300 not-started-select-shadow focus:ring-gray-400"
                          : values.status === "Research"
                          ? "bg-purple-100 text-purple-600 hover:bg-purple-200/75 border-purple-200  research-select-shadow focus:ring-purple-400"
                          : values.status === "In Progress"
                          ? "bg-blue-100 text-blue-600 hover:bg-blue-200/75 border-blue-200 border-b-blue-300 in-progress-select-shadow focus:ring-blue-400"
                          : values.status === "Stalled"
                          ? "bg-orange-100 text-orange-600 hover:bg-orange-200/75 border-orange-200 border-b-orange-300 stalled-select-shadow focus:ring-orange-400"
                          : "bg-green-100 text-green-600 hover:bg-green-200/75 border-green-200 border-b-green-300 completed-select-shadow focus:ring-green-400"
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
                    <SelectContent className="rounded-lg">
                      <SelectItem value="Not Started">Not Started</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Stalled">Stalled</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </section>
                <div className="flex justify-between space-x-2">
                  <Button
                    type="button"
                    className="w-full mt-2"
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowNewTaskForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="w-full mt-2"
                    variant="default"
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

      {/* Task List EDITING */}
      <motion.div className="w-full ">
        {tasks.map((task) => (
          <motion.div
            layout
            key={task.id}
            className=" border-gray-300 border p-3 rounded-2xl mb-4"
          >
            {editingTaskId === task.id ? (
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
                    <Field
                      as={Input}
                      name="title"
                      className="text-lg font-medium mb-2 full p-2 focus:border-gray-300 rounded-lg focus:ring-inset-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent border-none shadow-none transition-all duration-150 ease-in-out"
                      autoComplete="off"
                      placeholder="Task title"
                      required
                      ref={editingTaskInputRef}
                    />
                    <Field
                      as="textarea"
                      name="description"
                      className="w-full p-2 font-medium focus:border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none mb-2 transition-all duration-150 ease-in-out focus:ring-inset-2 text-sm"
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
                        <SelectItem
                          className="h-6 rounded-lg"
                          value="Not Started"
                        >
                          Not Started
                        </SelectItem>
                        <SelectItem className="h-6 rounded-lg" value="Research">
                          Research
                        </SelectItem>
                        <SelectItem
                          className="h-6 rounded-lg"
                          value="In Progress"
                        >
                          In Progress
                        </SelectItem>
                        <SelectItem className="h-6 rounded-lg" value="Stalled">
                          Stalled
                        </SelectItem>
                        <SelectItem
                          className="h-6 rounded-lg"
                          value="Completed"
                        >
                          Completed
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex justify-between space-x-2">
                      {/* <DatePicker
                            selected={values.dueDate}
                            onChange={(date) => {
                              setFieldValue("dueDate", date);
                              handleUpdate(task.id, "due_date", date);
                            }}
                            className="min-w-[8rem]"
                            required
                          /> */}
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
                            className=" h-6 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 transition-all ease-in-out duration-150 border border-red-300 focus:ring-red-400"
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
            ) : (
              ///////////////////////////
              // Task List Non Editing //
              ///////////////////////////
              <motion.div layout className="flex flex-col ">
                {/* <div className="flex justify-end">
                  <button
                    onClick={() => setEditingTaskId(task.id)}
                    className="items-center text-gray-400 hover:text-black hover:bg-gray-100 hover:shadow-sm p-2 rounded-lg transition-all ease-in-out duration-200"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div> */}
                <h3 className="text-lg font-medium mb-2">{task.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: task.description.replace(/\n/g, '<br />') }} className="text-sm mb-3"></p>
                {/* {task.subtasks.map((subtask) => (
                  <div key={subtask.id}>
                    <Checkbox />
                    <span>{subtask.title}</span>
                  </div>
                ))} */}
                <div className="flex justify-between items-center space-x-3">
                  {/* <DatePicker
                    selected={new Date(task.due_date)}
                    onChange={(date) => handleUpdate(task.id, "due_date", date)}
                  /> */}
                  <Select
                    value={task.status}
                    onValueChange={(value) =>
                      handleUpdate(task.id, "status", value)
                    }
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
                      <SelectItem
                        className="h-6 rounded-lg"
                        value="Not Started"
                      >
                        Not Started
                      </SelectItem>
                      <SelectItem className="h-6 rounded-lg" value="Research">
                        Research
                      </SelectItem>
                      <SelectItem
                        className="h-6 rounded-lg"
                        value="In Progress"
                      >
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
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Task3;
