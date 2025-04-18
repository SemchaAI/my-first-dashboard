import { Role } from "@prisma/client";

export const menu = [
  {
    title: "MENU",
    items: [
      {
        icon: "House",
        label: "Home",
        href: "/",
        visible: [Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.PARENT],
      },
      {
        icon: "GraduationCap",
        label: "Teachers",
        href: "/list/teachers",
        visible: [Role.ADMIN, Role.TEACHER],
      },
      {
        icon: "Users",
        label: "Students",
        href: "/list/students",
        visible: [Role.ADMIN, Role.TEACHER],
      },
      {
        icon: "UsersRound",
        label: "Parents",
        href: "/list/parents",
        visible: [Role.ADMIN, Role.TEACHER],
      },
      {
        icon: "ScrollText",
        label: "Subjects",
        href: "/list/subjects",
        visible: [Role.ADMIN],
      },
      {
        icon: "School",
        label: "Classes",
        href: "/list/classes",
        visible: [Role.ADMIN, Role.TEACHER],
      },
      {
        icon: "Presentation",
        label: "Lessons",
        href: "/list/lessons",
        visible: [Role.ADMIN, Role.TEACHER],
      },
      {
        icon: "BookLock",
        label: "Exams",
        href: "/list/exams",
        visible: [Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.PARENT],
      },
      {
        icon: "Signature",
        label: "Assignments",
        href: "/list/assignments",
        visible: [Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.PARENT],
      },
      {
        icon: "ThumbsUp",
        label: "Results",
        href: "/list/results",
        visible: [Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.PARENT],
      },
      {
        icon: "UserCheck",
        label: "Attendance",
        href: "/list/attendance",
        visible: [Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.PARENT],
      },
      {
        icon: "CalendarClock",
        label: "Events",
        href: "/list/events",
        visible: [Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.PARENT],
      },
      {
        icon: "MessageCircleMore",
        label: "Messages",
        href: "/list/messages",
        visible: [Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.PARENT],
      },
      {
        icon: "Megaphone",
        label: "Announcements",
        href: "/list/announcements",
        visible: [Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.PARENT],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "CircleUser",
        label: "Profile",
        href: "/profile",
        visible: [Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.PARENT],
      },
      {
        icon: "Settings",
        label: "Settings",
        href: "/settings",
        visible: [Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.PARENT],
      },
      {
        icon: "LogOut",
        label: "Logout",
        href: "/logout",
        visible: [Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.PARENT],
      },
    ],
  },
];
