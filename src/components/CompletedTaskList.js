import React from "react";
import TaskItem from "./TaskItem";

function CompletedTaskList({ tasks, handleUpdate, handleDelete }) {
  return (
    <div className="w-full">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={false}
          setEditingTaskId={() => {}}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default CompletedTaskList;
