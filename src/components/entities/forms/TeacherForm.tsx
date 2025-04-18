// "use client";
// import { useForm } from "react-hook-form";
// import { Form } from "./Form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { type TeacherSchema, teacherSchema } from "@/utils/config";
// import { InputField } from "@/components/features";
// import { User } from "lucide-react";

// interface IProps {
//   type: "create" | "update";
//   data?: any;
// }

// export const TeacherForm = ({ type, data }: IProps) => {
//   const form = useForm({
//     resolver: zodResolver(teacherSchema),
//     defaultValues: data,
//   });
//   const submitHandler = async (data: TeacherSchema) => {
//     //const { email, name, password } = data;
//     console.log("data", data);
//     try {
//       console.log("TeacherForm", data);
//     } catch (error) {
//       console.log("[TeacherForm]", error);
//     }
//   };

//   return (
//     <Form form={form} onSubmit={submitHandler}>
//       {
//         // inputs
//         <InputField id="username" label="Username" type="text" Icon={User} />
//       }
//       {
//         // formControls
//         <div>
//           <button type="submit">Click</button>
//         </div>
//       }
//     </Form>
//   );
// };
