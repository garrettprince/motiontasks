import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "@/utils/supabase";
import { motion } from "framer-motion";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";
import { Button } from "./ui/button";
import CompletedTaskList from "./CompletedTaskList";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

function TaskManager({ selectedCategory, setSelectedCategory }) {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const { user } = useKindeAuth();

  const fetchTasks = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching tasks:", error);
      } else {
        const filteredData =
          selectedCategory === "All"
            ? data
            : data.filter((task) => task.category === selectedCategory);
        const active = filteredData.filter(
          (task) => task.status !== "Completed"
        );
        const completed = filteredData.filter(
          (task) => task.status === "Completed"
        );
        setTasks(active);
        setCompletedTasks(completed);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }, [selectedCategory, user]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [fetchTasks, user]);

  const handleSubmit = async (values, { resetForm }) => {
    if (!user) return;

    try {
      const { data, error } = await supabase.from("tasks").insert({
        title: values.title,
        description: values.description,
        status: values.status,
        due_date: values.dueDate,
        category: values.category,
        user_id: user.id,
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
        setShowCompletedTasks={setShowCompletedTasks}
        showCompletedTasks={showCompletedTasks}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {showCompletedTasks ? (
        <CompletedTaskList
          tasks={completedTasks}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      ) : (
        <TaskList
          tasks={tasks}
          editingTaskId={editingTaskId}
          setEditingTaskId={setEditingTaskId}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      )}
    </motion.div>
  );
}

export default TaskManager;
