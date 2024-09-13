import React from "react";
import { motion } from "framer-motion";
import TaskItem from "./TaskItem";

function TaskList({ tasks, editingTaskId, setEditingTaskId, handleUpdate, handleDelete }) {
  return (
    <motion.div className="w-full">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editingTaskId === task.id}
          setEditingTaskId={setEditingTaskId}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      ))}
    </motion.div>
  );
}

export default TaskList;