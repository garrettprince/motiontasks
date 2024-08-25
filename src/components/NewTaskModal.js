import React from "react";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { Formik, Form, Field } from "formik";

function NewTaskModal() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true)
  }

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="border-black border-1 mb-20 rounded-xl py-2 px-6 hover:text-white hover:bg-black transition-all duration-100 ease-in-out"
      >
        New Task
      </button>
      {modalOpen && (
        <div>
          <Formik
            initialValues={{
              taskTitle: "",
              taskDescription: "",
              category: "",
              priority: "",
              dueDate: "",
              timeEstimate: "",
            }}
            onSubmit={async (values) => {
              setModalOpen(false)
            }}
          >
            <Form>
              <Field></Field>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
}

export default NewTaskModal;
