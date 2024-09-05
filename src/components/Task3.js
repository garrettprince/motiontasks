import React, { useState, useEffect } from "react";
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
import { supabase } from "@/utils/supabase";
import { Formik, Form, Field } from "formik";
import { DatePicker } from "@/components/DatePicker";
import { Check, Trash, Trash2 } from "lucide-react";

function Task3() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

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
    <div className="flex flex-col items-center justify-center w-[22.5rem] mx-auto">
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
        <div className="w-full border p-4 rounded-lg mb-2">
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
                <Input
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={(e) => setFieldValue("title", e.target.value)}
                  placeholder="Task Title"
                  className="w-full mb-2 p-2 border rounded text-xl font-medium"
                  autoComplete="off"
                  required
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
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
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

      {/* Task List */}
      <div className="w-full">
        {tasks.map((task) => (
          <div key={task.id} className="border p-4 rounded-lg mb-2">
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
                      className="font-semibold mb-2"
                      autoComplete="off"
                      required
                    />
                    <Field
                      as={Input}
                      name="description"
                      className="mb-2"
                      autoComplete="off"
                      required
                    />
                    <div className="flex justify-between space-x-2 mb-2">
                      <DatePicker
                        selected={values.dueDate}
                        onChange={(date) => {
                          setFieldValue("dueDate", date);
                          handleUpdate(task.id, "due_date", date);
                        }}
                        className="min-w-[8rem]"
                        required
                      />
                      <Select
                        name="status"
                        onValueChange={(value) => {
                          setFieldValue("status", value);
                          handleUpdate(task.id, "status", value);
                        }}
                        value={values.status}
                        className="w-56"
                        required
                      >
                        <SelectTrigger className={`transition-all ease-in-out duration-200 border rounded-lg px-2 py-1 flex items-center justify-between cursor-pointer text-md ${
                          values.status === "Not Started"
                            ? "bg-white hover:bg-gray-100 border-gray-200 border-b-gray-300 not-started-select-shadow"
                            : values.status === "Research"
                            ? "bg-purple-100 text-purple-600 hover:bg-purple-200/75 border-purple-200 border-b-purple-300 research-select-shadow"
                            : values.status === "In Progress"
                            ? "bg-blue-100 text-blue-600 hover:bg-blue-200/75 border-blue-200 border-b-blue-300 in-progress-select-shadow"
                            : values.status === "Stalled"
                            ? "bg-orange-100 text-orange-600 hover:bg-orange-200/75 border-orange-200 border-b-orange-300 stalled-select-shadow"
                            : "bg-green-100 text-green-600 hover:bg-green-200/75 border-green-200 border-b-green-300 completed-select-shadow"
                        }`}>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Not Started">
                            Not Started
                          </SelectItem>
                          <SelectItem value="Research">Research</SelectItem>
                          <SelectItem value="In Progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="Stalled">Stalled</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-between space-x-2">
                      <Button
                        type="button"
                        className="w-20"
                        variant="secondary"
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
                            className="w-20"
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(task.id)}
                          >
                            <Trash2 className="w-3 h-3 mr-1 mb-[.1rem]" />
                            <span>Delete</span>
                          </Button>
                        </div>
                        <Button
                          type="submit"
                          className="w-20"
                          variant="outline"
                          size="sm"
                          disabled={isSubmitting}
                        >
                          <Check className="w-3 h-3 mr-1 " />
                          {isSubmitting ? "Updating..." : "Save"}
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            ) : (
              <>
                <div className="flex justify-end">
                  <Button
                    onClick={() => setEditingTaskId(task.id)}
                    className="mt-2 items-center w-16"
                    variant="outline"
                    size="sm"
                  >
                    Edit
                  </Button>
                </div>
                <h3 className="font-semibold">{task.title}</h3>
                <p>{task.description}</p>
                <div className="flex justify-between space-x-2 mb-2">
                  <DatePicker
                    selected={new Date(task.due_date)}
                    onChange={(date) => handleUpdate(task.id, "due_date", date)}
                    className="min-w-[8rem]"
                  />
                  <Select
                    value={task.status}
                    onValueChange={(value) =>
                      handleUpdate(task.id, "status", value)
                    }
                    className="w-56"
                  >
                    <SelectTrigger className={`transition-all ease-in-out duration-200 border rounded-lg px-2 py-1 flex items-center justify-between cursor-pointer text-md ${
                      task.status === "Not Started"
                        ? "bg-white hover:bg-gray-100 border-gray-200 border-b-gray-300 not-started-select-shadow"
                        : task.status === "Research"
                        ? "bg-purple-100 text-purple-600 hover:bg-purple-200/75 border-purple-200 border-b-purple-300 research-select-shadow"
                        : task.status === "In Progress"
                        ? "bg-blue-100 text-blue-600 hover:bg-blue-200/75 border-blue-200 border-b-blue-300 in-progress-select-shadow"
                        : task.status === "Stalled"
                        ? "bg-orange-100 text-orange-600 hover:bg-orange-200/75 border-orange-200 border-b-orange-300 stalled-select-shadow"
                        : "bg-green-100 text-green-600 hover:bg-green-200/75 border-green-200 border-b-green-300 completed-select-shadow"
                    }`}>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Not Started">Not Started</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Stalled">Stalled</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Task3;
