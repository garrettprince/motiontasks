import { Formik, Form, Field } from "formik";
import { AnimatePresence, motion as m } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

function Task2() {
  const [inputData, setInputData] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  // Fetch initial data from Supabase (if applicable)
    useEffect(() => {
      const fetchData = async () => {
        const { data, error } = await supabase
          .from("tasks")
          .select("title")
          .single();

        if (data) {
          setInputData(data.title);
        } else if (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }, []);

  const handleSubmit = async (values) => {
    try {
      // Update Supabase record if editing, otherwise insert a new one
      if (isEditing) {
        const { error } = await supabase
          .from("tasks")
          .update({ title: values.title })
          .eq("id", "some_identifier"); // If you have a unique identifier

        if (error) {
          console.error("Error updating data:", error);
        } else {
          setIsEditing(false);
        }
      } else {
        const { error } = await supabase
          .from("tasks")
          .insert({ title: values.title });

        if (error) {
          console.error("Error inserting data:", error);
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <m.div
      className="task-card-shadow 
       border border-gray-300 border-b-gray-300 flex flex-col p-4 pt-3 rounded-2xl gap-y-2 transition-all duration-500 w-[22rem]"
    >
      <Formik
        initialValues={{
          title: "",
          description: "",
          dueDate: "",
          dueTime: "",
          status: "Not Started",
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ values, handleChange, errors, setFieldValue }) => (
          <Form>
            <Field
              name="title"
              placeholder="Task title"
              className="text-xl w-full"
            />
            <Field
              name="status"
              component="select"
              className="transition-all ease-in-out duration-200 border  rounded-lg px-2 py-1 flex items-center justify-center gap-x-[.35rem] cursor-pointer text-sm bg-green-100 hover:bg-green-200/75 border-green-200 border-b-green-300 not-started-select-shadow w-20 completed-select-shadow text-green-700"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Field>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </m.div>
  );
}

export default Task2;
