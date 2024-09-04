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
      const { data, error } = await supabase
        .from("tasks")
        .insert({
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
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting task:", error);
      } else {
        console.log("Task deleted successfully");
        setTasks(tasks.filter(task => task.id !== id));
        setEditingTaskId(null);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-80 mx-auto">
      <Button
        onClick={() => setShowNewTaskForm(true)}
        className="mb-4"
        variant="default"
        size="lg"
      >
        New Task
      </Button>
      {showNewTaskForm && (
        <div className="w-full border p-4 rounded-lg mb-4">
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
                  className="w-full mb-2 p-2 border rounded"
                />
                <Input
                  type="text"
                  name="description"
                  value={values.description}
                  onChange={(e) => setFieldValue("description", e.target.value)}
                  placeholder="Task Description"
                  className="w-full mb-2 p-2 border rounded"
                />
                <section className="flex justify-between space-x-2">
                  <Select
                    name="status"
                    onValueChange={(value) => setFieldValue("status", value)}
                    value={values.status}
                    className="mb-2 p-2 border rounded w-56"
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
                  <DatePicker
                    selected={values.dueDate}
                    onChange={(date) => setFieldValue("dueDate", date)}
                    className="min-w-[8rem] mb-2 p-2 border rounded"
                  />
                </section>
                <Button
                  type="submit"
                  className="w-full mt-2"
                  variant="default"
                  size="lg"
                >
                  Create Task
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      )}
      <div className="w-full">
        <h2 className="text-xl font-semibold mb-2">Previous Tasks</h2>
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
                    />
                    <Field
                      as={Input}
                      name="description"
                      className="mb-2"
                    />
                    <div className="flex justify-between space-x-2 mb-2">
                      <Select
                        name="status"
                        onValueChange={(value) => {
                          setFieldValue("status", value);
                          handleUpdate(task.id, "status", value);
                        }}
                        value={values.status}
                        className="w-56"
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
                      <DatePicker
                        selected={values.dueDate}
                        onChange={(date) => {
                          setFieldValue("dueDate", date);
                          handleUpdate(task.id, "due_date", date);
                        }}
                        className="min-w-[8rem]"
                      />
                    </div>
                    <div className="flex justify-between space-x-2">
                      <Button
                        type="submit"
                        className="w-full"
                        variant="outline"
                        size="sm"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Updating..." : "Save"}
                      </Button>
                      <Button
                        type="button"
                        className="w-full"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        type="button"
                        className="w-full"
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          resetForm();
                          setEditingTaskId(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            ) : (
              <>
                <h3 className="font-semibold">{task.title}</h3>
                <p>{task.description}</p>
                <div className="flex justify-between space-x-2 mb-2">
                  <Select
                    value={task.status}
                    onValueChange={(value) => handleUpdate(task.id, "status", value)}
                    className="w-56"
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
                  <DatePicker
                    selected={new Date(task.due_date)}
                    onChange={(date) => handleUpdate(task.id, "due_date", date)}
                    className="min-w-[8rem]"
                  />
                </div>
                <Button
                  onClick={() => setEditingTaskId(task.id)}
                  className="mt-2"
                  variant="outline"
                  size="sm"
                >
                  Edit
                </Button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Task3;
