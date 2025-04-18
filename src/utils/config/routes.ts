import { Role } from "@prisma/client";

type RouteAccessMap = {
  [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
  "/admin": [Role.ADMIN],
  "/student": [Role.STUDENT],
  "/teacher": [Role.TEACHER],
  "/parent": [Role.PARENT],
  "/list/teachers": [Role.ADMIN, Role.TEACHER],
  "/list/students": [Role.ADMIN, Role.TEACHER],
  "/list/parents": [Role.ADMIN, Role.TEACHER],
  "/list/subjects": [Role.ADMIN],
  "/list/classes": [Role.ADMIN, Role.TEACHER],
  "/list/exams": [Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.PARENT],
  "/list/assignments": [Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.PARENT],
  "/list/results": [Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.PARENT],
  "/list/attendance": [Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.PARENT],
  "/list/events": [Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.PARENT],
  "/list/announcements": [Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.PARENT],
};
