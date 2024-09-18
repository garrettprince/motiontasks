/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "@/components/ui/button";

function Nav({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="sticky bg-transparent top-0 w-full h-12 flex items-center justify-between px-5 pt-4">
      <img src="/images/colorgroup.png" alt="logo" className="h-4 cursor-pointer" />
      <div className="flex w-72 items-center px-1 bg-gray-100 rounded-lg justify-between h-8 transition-all ease-in-out">
        <Button
          onClick={() => setSelectedCategory("Personal")}
          variant={selectedCategory === "Personal" ? "outline" : "ghost"}
          className={`text-xs h-6 ${
            selectedCategory === "Personal"
              ? "border border-gray-300 hover:bg-white"
              : "hover:bg-gray-200"
          } rounded-lg`}
        >
          Personal
        </Button>
        <Button
          onClick={() => setSelectedCategory("Work")}
          variant={selectedCategory === "Work" ? "outline" : "ghost"}
          className={`text-xs h-6 ${
            selectedCategory === "Work"
              ? "border border-gray-300 hover:bg-white"
              : "hover:bg-gray-200"
          } rounded-lg`}
        >
          Work
        </Button>
        <Button
          onClick={() => setSelectedCategory("Projects")}
          variant={selectedCategory === "Projects" ? "outline" : "ghost"}
          className={`text-xs h-6 ${
            selectedCategory === "Projects"
              ? "border border-gray-300 hover:bg-white"
              : "hover:bg-gray-200"
          } rounded-lg`}
        >
          Projects
        </Button>
        <Button
          onClick={() => setSelectedCategory("All")}
          variant={selectedCategory === "All" ? "outline" : "ghost"}
          className={`text-xs h-6 ${
            selectedCategory === "All"
              ? "border border-gray-300 hover:bg-white"
              : "hover:bg-gray-200"
          } rounded-lg`}
        >
          All
        </Button>
      </div>
      <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
    </div>
  );
}

export default Nav;
