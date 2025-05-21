import { UserSex } from "@prisma/client";
import { z } from "zod";

const userBaseSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters long" })
    .max(15, { message: "Username must be at most 15 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    // .min(5, { message: "Password must be at least 5 characters long" })
    .max(255, { message: "Password must be at most 255 characters long" }),
  confirmPassword: z.string(),
  name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" })
    .max(20, { message: "First name must be at most 20 characters long" }),
  surname: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" })
    .max(20, { message: "Last name must be at most 20 characters long" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits long" })
    .optional()
    .or(z.literal("")),
  address: z.string().min(1, { message: "Address is required" }),
  birthday: z.coerce.date({ message: "Birthday is required" }),
  sex: z.enum([UserSex.MALE, UserSex.FEMALE], { message: "Sex is required" }),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  // img: z.instanceof(File, { message: "Image is required" }),
  img: z.string().optional(),
  formType: z.enum(["Create", "Update"]),
});

export const teacherSchema = userBaseSchema
  .extend({ subjects: z.array(z.string()).optional() })
  .superRefine((data, ctx) => {
    // Passwords must match
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
    // Password is required only for Create
    if (data.formType === "Create" && !data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is required",
        path: ["password"],
      });
    }
    if (data.formType === "Create" && data.password.length < 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must be at least 5 characters long",
        path: ["password"],
      });
    }
  });
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });
// .superRefine((data, ctx) => {
//   // Passwords must match
//   if (data.password !== data.confirmPassword) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: "Passwords do not match",
//       path: ["confirmPassword"],
//     });
//   }
//   // Password is required only for Create
//   if (data.formType === "Create" && !data.password) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: "Password is required",
//       path: ["password"],
//     });
//   }
//   if (data.formType === "Create" && data.password.length < 5) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: "Password must be at least 5 characters long",
//       path: ["password"],
//     });
//   }
// });
export type TeacherSchema = z.infer<typeof teacherSchema>;

export const studentSchema = userBaseSchema
  .extend({
    gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
    classId: z.coerce.number().min(1, { message: "Class is required!" }),
    parentId: z.string().min(1, { message: "Parent Id is required!" }),
  })
  .superRefine((data, ctx) => {
    // Passwords must match
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
    // Password is required only for Create
    if (data.formType === "Create" && !data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is required",
        path: ["password"],
      });
    }
    if (data.formType === "Create" && data.password.length < 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must be at least 5 characters long",
        path: ["password"],
      });
    }
  });

export type StudentSchema = z.infer<typeof studentSchema>;

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" })
    .max(20, { message: "Password must be at most 255 characters long" }),
});
export type SignInSchema = z.infer<typeof signInSchema>;

export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  teachers: z.array(z.string()), //teacher ids
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Class name is required!" }),
  capacity: z.coerce
    .number()
    .min(1, { message: "Class cant be empty!" })
    .max(30, { message: "Class cant include more than 30 students" }),
  gradeId: z.coerce.number().min(1, { message: "Grade ID is required" }),
  supervisorId: z.coerce.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;
