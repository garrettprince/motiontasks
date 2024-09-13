import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { motion } from "framer-motion";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";

function TaskManager() {
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
    <motion.div className="flex flex-col items-center justify-center w-72 mx-auto font-medium">
      <NewTaskForm
        showNewTaskForm={showNewTaskForm}
        setShowNewTaskForm={setShowNewTaskForm}
        handleSubmit={handleSubmit}
      />
      <TaskList
        tasks={tasks}
        editingTaskId={editingTaskId}
        setEditingTaskId={setEditingTaskId}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </motion.div>
  );
}

export default TaskManager;
