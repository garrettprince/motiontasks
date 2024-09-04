import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { supabase } from "@/utils/supabase";
import { Formik, Form } from "formik";
import { DatePicker } from "@/components/DatePicker";

function Task3() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching tasks:", error);
      } else {
        setTasks(data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
      <div className="w-full border p-4 rounded-lg mb-4">
        <Formik
          initialValues={{
            title: "",
            description: "",
            status: "Not Started",
            dueDate: null,
          }}
          onSubmit={async (values, { resetForm }) => {
            try {
              const { data, error } = await supabase.from("tasks").insert({
                title: values.title,
                description: values.description,
                status: values.status,
                due_date: values.dueDate,
              });

              if (error) {
                console.error("Error creating new task:", error);
              } else {
                console.log("New task created successfully:", data);
                resetForm();
                fetchTasks();
              }
            } catch (error) {
              console.error("Unexpected error:", error);
            }
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Input
                type="text"
                name="title"
                value={values.title}
                onChange={(e) => setFieldValue("title", e.target.value)}
                placeholder="Task Title"
                className="w-full mb-2 p-2 border rounded"
              />
              <Input
                type="text"
                name="description"
                value={values.description}
                onChange={(e) => setFieldValue("description", e.target.value)}
                placeholder="Task Description"
                className="w-full mb-2 p-2 border rounded"
              />
              <section className="flex justify-between space-x-2">
                  <Select
                    name="status"
                    onValueChange={(value) => setFieldValue("status", value)}
                    className="mb-2 p-2 border rounded w-56"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Not Started">Not Started</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Stalled">Stalled</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <DatePicker
                    selected={values.dueDate}
                    onChange={(date) => setFieldValue("dueDate", date)}
                    className="min-w-[8rem] mb-2 p-2 border rounded"
                  />
              </section>
              <Button
                type="submit"
                className="w-full mt-2"
                variant="default"
                size="lg"
              >
                Create Task
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="w-full">
        <h2 className="text-xl font-semibold mb-2">Previous Tasks</h2>
        {tasks.map((task) => (
          <div key={task.id} className="border p-4 rounded-lg mb-2">
            <h3 className="font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Task3;
