import Image from "next/image";
import NewTaskModal from "@/components/NewTaskModal";
import Task from "@/components/Task";
import Task2 from "@/components/Task2";
import StatusSelectButton from "@/components/StatusSelectButton";
import { useState } from "react";
import Dbtest from "@/components/Dbtest";
import Task3 from "@/components/Task3";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center font-sans">
      <div className=""><Task /></div>
      <div className="pt-20"><Task3 /></div>
    </main>
  );
}
