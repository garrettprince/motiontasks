import { supabase } from "../utils/supabase";
import { useState } from "react";

const useEditTask = () => {
  const [isEditingTask, setIsEditingTask] = useState(false);

  const editTask = async (task, taskId) => {
    setIsEditingTask(true);
    try {
      let { data, error } = {};
      if (taskId) {
        ({ data, error } = await supabase
          .from("tasks")
          .update(task)
          .eq("id", taskId));
      } else {
        ({ data, error } = await supabase.from("tasks").insert(task));
      }
      if (error) throw error;
      console.log("Task updated/added successfully:", data);
    } catch (error) {
      console.error("Error updating/adding task:", error.message);
    } finally {
      setIsEditingTask(false);
    }
  };

  return [editTask, isEditingTask];
};

export default useEditTask;