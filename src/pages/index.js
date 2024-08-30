import Image from "next/image";
import NewTaskModal from "@/components/NewTaskModal";
import Task from "@/components/Task";
import StatusSelectButton from "@/components/StatusSelectButton";
import { useState } from "react";
import Dbtest from "@/components/Dbtest";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <main className={`flex min-h-screen flex-col items-center font-sans`}>
      <div className="pt-20">
        <Task />
      </div>
      <div className="pt-20">
        <Dbtest onAddTask={addTask} />
      </div>
      <div className="pt-10">
        {tasks.map((task, index) => (
          <Dbtest key={index} task={task} />
        ))}
      </div>
    </main>
  );
}
