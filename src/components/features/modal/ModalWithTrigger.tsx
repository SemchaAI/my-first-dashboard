"use client";
import { useState } from "react";
import Modal from "./Modal";
import { useScrollControl } from "@/utils/hooks";

interface ModalTriggerProps {
  button: React.ReactNode;
  children: React.ReactNode | ((onClose: () => void) => React.ReactNode);
}

export const ModalTrigger = ({ button, children }: ModalTriggerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  useScrollControl(isOpen);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div onClick={handleOpen} className="inline-block cursor-pointer">
        {button}
      </div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        {typeof children === "function" ? children(handleClose) : children}
      </Modal>
    </>
  );
};

// "use client";
// import { useState } from "react";
// import Modal from "./Modal";

// interface IProps {
//   table:
//     | "teacher"
//     | "student"
//     | "parent"
//     | "subject"
//     | "class"
//     | "lesson"
//     | "exam"
//     | "assignment"
//     | "result"
//     | "attendance"
//     | "event"
//     | "announcement";
//   type: "create" | "update" | "delete";
//   data?: any;
//   id?: number;
//   element: React.ReactNode;
// }

// export const FormModal = ({ element, table, type, data, id }: IProps) => {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <>
//       {element}
//       <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
//         <form action="">
//           <h1>Here is the form</h1>
//         </form>
//       </Modal>
//     </>
//   );
// };
