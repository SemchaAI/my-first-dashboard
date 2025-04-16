import { z } from "zod";

const teacherSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters long" })
    .max(15, { message: "Username must be at most 15 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" })
    .max(255, { message: "Password must be at most 255 characters long" }),
  // .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" })
    .max(20, { message: "First name must be at most 20 characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" })
    .max(20, { message: "Last name must be at most 20 characters long" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits long" }),
  address: z.string().min(1, { message: "Address is required" }),
  birthday: z.date({ message: "Birthday is required" }),
  sex: z.enum(["male", "female"], { message: "Sex is required" }),
  img: z.instanceof(File, { message: "Image is required" }),
});
type TeacherSchema = z.infer<typeof teacherSchema>;

export { teacherSchema };
export type { TeacherSchema };
