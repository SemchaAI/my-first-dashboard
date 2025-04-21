import type {
  Announcement,
  Assignment,
  Class,
  Event,
  Exam,
  Lesson,
  Parent,
  Result,
  Role,
  Student,
  Subject,
  Teacher,
  User,
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
type ParentList = Parent & {
  students: Student[];
  user: { email: User["email"]; username: User["username"] };
};
type StudentList = Student & {
  class: Class;
  user: { username: User["username"]; avatar: User["avatar"] };
};
type SubjectList = Subject & { teachers: Teacher[] };
type TeacherList = Teacher & {
  subjects: Subject[];
  classes: Class[];
  user: {
    username: User["username"];
    email: User["email"];
    avatar: User["avatar"];
  };
};
type ResultList = {
  id: number;
  title: string;
  studentName: string;
  studentSurname: string;
  teacherName: string;
  teacherSurname: string;
  score: number;
  className: string;
  startTime: Date;
};
type TResult = Result & {
  student: {
    name: Student["name"];
    surname: Student["surname"];
  };
  exam:
    | (Exam & {
        lesson: {
          teacher: {
            name: Teacher["name"];
            surname: Teacher["surname"];
          };
          class: {
            name: Class["name"];
          };
        };
      })
    | null;
  assignment:
    | (Assignment & {
        lesson: {
          teacher: {
            name: Teacher["name"];
            surname: Teacher["surname"];
          };
          class: {
            name: Class["name"];
          };
        };
      })
    | null;
};

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
  | TeacherList
  | ResultList;

//----------------------------------
interface IColumn {
  header: string;
  accessor: string;
  className?: string;
  role?: Role[];
}

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
  ResultList,
  TResult,
  IColumn,
};
