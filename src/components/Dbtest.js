import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import useEditTask from "@/hooks/useEditTask";
import { supabase } from "@/utils/supabase";

function Dbtest({ onAddTask, task }) {
  const [editTask, isEditingTask] = useEditTask();
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(task || null);

  useEffect(() => {
    if (!task) {
      fetchTask();
    }
  }, [task]);

  const fetchTask = async () => {
    if (!task) {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching task:", error);
      } else {
        setCurrentTask(data);
      }
    }
  };

  const handleNewTask = () => {
    setCurrentTask(null);
    setIsEditing(true);
  };

  return (
    <div>
      <Formik
        initialValues={currentTask || {
          title: "",
          description: "",
          due_date: "",
          due_time: "",
          status: "",
        }}
        enableReinitialize
        onSubmit={async (values) => {
          await editTask(values, currentTask?.id);
          setIsEditing(false);
          if (!currentTask?.id) {
            onAddTask(values);
          }
          fetchTask();
        }}
      >
        {({ isSubmitting, values, handleSubmit }) => (
          <Form className="border border-gray-300 border-b-gray-300 flex flex-col p-4 pt-3 rounded-2xl gap-y-2 transition-all duration-500 w-[22rem]">
            <p>Test Form</p>
            {isEditing || !currentTask ? (
              <>
                <Field
                  className="border placeholder:text-gray-400"
                  placeholder="Title"
                  name="title"
                />
                <Field
                  className="border placeholder:text-gray-400"
                  placeholder="Description"
                  name="description"
                />
                <Field
                  className="border placeholder:text-gray-400"
                  placeholder="Due Date"
                  name="due_date"
                />
                <Field
                  className="border placeholder:text-gray-400"
                  placeholder="Due Time"
                  name="due_time"
                />
                <Field
                  className="border placeholder:text-gray-400"
                  placeholder="Status"
                  name="status"
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    {currentTask?.id ? "Update" : "Create"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>{currentTask.title}</div>
                <div>{currentTask.description}</div>
                <div>{currentTask.due_date}</div>
                <div>{currentTask.due_time}</div>
                <div>{currentTask.status}</div>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Edit Task
                </button>
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Dbtest;
