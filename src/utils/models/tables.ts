import type {
  Announcement,
  Assignment,
  Class,
  Event,
  Exam,
  Lesson,
  Parent,
  Student,
  Subject,
  Teacher,
} from "@prisma/client";
type AnnouncementList = Announcement & {
  class: { name: Class["name"] } | null;
};
type AssignmentList = Assignment & {
  lesson: Lesson & {
    subject: { name: Subject["name"] };
    class: { name: Class["name"] };
    teacher: { name: Teacher["name"]; surname: Teacher["surname"] };
  };
};
type ClassList = Class & { supervisor: Teacher | null };
type EventList = Event & { class: { name: Class["name"] } | null };
type ExamList = Exam & {
  lesson: {
    subject: { name: Subject["name"] };
    class: { name: Class["name"] };
    teacher: { name: Teacher["name"]; surname: Teacher["surname"] };
  };
};
type LessonList = Lesson & {
  subject: { name: Subject["name"] };
  class: { name: Class["name"] };
  teacher: { name: Teacher["name"]; surname: Teacher["surname"] };
};
type ParentList = Parent & { students: Student[] };
type StudentList = Student & { class: Class };
type SubjectList = Subject & { teachers: Teacher[] };
type TeacherList = Teacher & { subjects: Subject[]; classes: Class[] };

type TableRow =
  | AnnouncementList
  | AssignmentList
  | ClassList
  | EventList
  | ExamList
  | LessonList
  | ParentList
  | StudentList
  | SubjectList
  | TeacherList;

export type {
  TableRow,
  AssignmentList,
  AnnouncementList,
  ClassList,
  EventList,
  ExamList,
  LessonList,
  ParentList,
  StudentList,
  SubjectList,
  TeacherList,
};
