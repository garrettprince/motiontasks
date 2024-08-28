import Image from "next/image";
import NewTaskModal from "@/components/NewTaskModal";
import Task from "@/components/Task";
import StatusSelectButton from "@/components/StatusSelectButton";
import { useState } from "react";

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center font-sans`}>
      <div className="pt-20">
        <Task />
      </div>
    </main>
  );
}
