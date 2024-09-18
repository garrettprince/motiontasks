/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useKindeAuth, LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { ExitIcon } from "@radix-ui/react-icons";

function Nav({ selectedCategory, setSelectedCategory }) {
  const { isAuthenticated, user } = useKindeAuth();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="sticky bg-transparent top-0 w-full h-12 flex items-center justify-between px-5 pt-4">
      <img
        src="/images/colorgroup.png"
        alt="logo"
        className={
          isAuthenticated
            ? "h-4 cursor-pointer"
            : "h-10 mt-10 mx-auto cursor-pointer"
        }
      />
      {isAuthenticated && (
        <div className="flex w-52 items-center px-1 bg-gray-100 rounded-lg justify-between h-8 transition-all ease-in-out">
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
      )}
      {isAuthenticated && user?.picture && (
        <div className="relative">
          <img
            src={user.picture}
            alt="User profile"
            className="ring-2 ring-gray-300 ring-offset-2 h-8 w-8 rounded-full object-cover cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.1 }}
                className="absolute right-0 mt-2 w-24 bg-white rounded-lg shadow-md cursor-pointer"
              >
                <LogoutLink>
                  <Button
                    variant="outline"
                    className="w-full text-left h-8 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {/* <ExitIcon className="text-black h-4 w-4 mr-2" /> */}
                    Sign Out
                  </Button>
                </LogoutLink>
              </motion.div>
            )}
          </AnimatePresence>
          {/* {showMenu && (
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowMenu(false)}
            />
          )} */}
        </div>
      )}
    </div>
  );
}

export default Nav;
