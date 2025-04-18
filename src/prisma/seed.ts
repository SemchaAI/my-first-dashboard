import bcrypt from "bcryptjs";
import { Day, UserSex } from "@prisma/client";
import { prisma } from "./prismaClient";

async function up() {
  // ADMIN USERS
  for (let i = 1; i <= 2; i++) {
    await prisma.user.create({
      data: {
        id: `admin${i}`,
        username: `admin${i}`,
        email: `admin${i}@example.com`,
        password: bcrypt.hashSync("12345", 10),
        role: "ADMIN",
        // admin: {
        //   create: {},
        // },
      },
    });
  }

  // GRADE
  for (let i = 1; i <= 6; i++) {
    await prisma.grade.create({
      data: {
        level: i,
      },
    });
  }

  // CLASS
  for (let i = 1; i <= 6; i++) {
    await prisma.class.create({
      data: {
        name: `${i}A`,
        gradeId: i,
        capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
      },
    });
  }

  // SUBJECT
  const subjectData = [
    { name: "Mathematics" },
    { name: "Science" },
    { name: "English" },
    { name: "History" },
    { name: "Geography" },
    { name: "Physics" },
    { name: "Chemistry" },
    { name: "Biology" },
    { name: "Computer Science" },
    { name: "Art" },
  ];

  for (const subject of subjectData) {
    await prisma.subject.create({ data: subject });
  }

  // TEACHER
  for (let i = 1; i <= 15; i++) {
    await prisma.user.create({
      data: {
        id: `teacher${i}`,
        username: `teacher${i}`,
        role: "TEACHER",
        password: bcrypt.hashSync(`teacher${i}`, 10),
        email: `teacher${i}@example.com`,
        avatar: `https://i.pravatar.cc/150?u=teacher${i}`,
        teacher: {
          create: {
            name: `TName${i}`,
            surname: `TSurname${i}`,
            phone: `123-456-789${i}`,
            address: `Address${i}`,
            bloodType: "A+",
            sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
            subjects: { connect: [{ id: (i % 10) + 1 }] },
            classes: { connect: [{ id: (i % 6) + 1 }] },
            birthday: new Date(
              new Date().setFullYear(new Date().getFullYear() - 30),
            ),
          },
        },
      },
    });
  }

  // LESSON
  for (let i = 1; i <= 30; i++) {
    await prisma.lesson.create({
      data: {
        name: `Lesson${i}`,
        day: Day[
          Object.keys(Day)[
            Math.floor(Math.random() * Object.keys(Day).length)
          ] as keyof typeof Day
        ],
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 3)),
        subjectId: (i % 10) + 1,
        classId: (i % 6) + 1,
        teacherId: `teacher${(i % 15) + 1}`,
      },
    });
  }

  // PARENT
  for (let i = 1; i <= 25; i++) {
    await prisma.user.create({
      data: {
        id: `parent${i}`,
        username: `parent${i}`,
        email: `parent${i}@example.com`,
        password: bcrypt.hashSync(`parent${i}`, 10),
        role: "PARENT",
        avatar: `https://i.pravatar.cc/150?u=parent${i}`,
        parent: {
          create: {
            name: `PName ${i}`,
            surname: `PSurname ${i}`,
            phone: `123-456-789${i}`,
            address: `Address${i}`,
          },
        },
      },
    });
  }

  // STUDENT
  for (let i = 1; i <= 50; i++) {
    const parentId = `parent${Math.ceil(i / 2) % 25 || 25}`;
    await prisma.user.create({
      data: {
        id: `student${i}`,
        username: `student${i}`,
        email: `student${i}@example.com`,
        password: bcrypt.hashSync(`student${i}`, 10),
        role: "STUDENT",
        avatar: `https://i.pravatar.cc/150?u=student${i}`,
        student: {
          create: {
            name: `SName${i}`,
            surname: `SSurname ${i}`,
            phone: `987-654-321${i}`,
            address: `Address${i}`,
            bloodType: "O-",
            sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
            parentId: parentId,
            gradeId: (i % 6) + 1,
            classId: (i % 6) + 1,
            birthday: new Date(
              new Date().setFullYear(new Date().getFullYear() - 10),
            ),
          },
        },
      },
    });
  }

  // EXAM
  for (let i = 1; i <= 10; i++) {
    await prisma.exam.create({
      data: {
        title: `Exam ${i}`,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        lessonId: (i % 30) + 1,
      },
    });
  }

  // ASSIGNMENT
  for (let i = 1; i <= 10; i++) {
    await prisma.assignment.create({
      data: {
        title: `Assignment ${i}`,
        startDate: new Date(new Date().setHours(new Date().getHours() + 1)),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        lessonId: (i % 30) + 1,
      },
    });
  }

  // RESULT
  for (let i = 1; i <= 10; i++) {
    await prisma.result.create({
      data: {
        score: 90,
        studentId: `student${i}`,
        ...(i <= 5 ? { examId: i } : { assignmentId: i - 5 }),
      },
    });
  }

  // ATTENDANCE
  for (let i = 1; i <= 10; i++) {
    await prisma.attendance.create({
      data: {
        date: new Date(),
        present: true,
        studentId: `student${i}`,
        lessonId: (i % 30) + 1,
      },
    });
  }

  // EVENT
  for (let i = 1; i <= 5; i++) {
    await prisma.event.create({
      data: {
        title: `Event ${i}`,
        description: `Description for Event ${i}`,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        classId: (i % 5) + 1,
      },
    });
  }

  // ANNOUNCEMENT
  for (let i = 1; i <= 5; i++) {
    await prisma.announcement.create({
      data: {
        title: `Announcement ${i}`,
        description: `Description for Announcement ${i}`,
        date: new Date(),
        classId: (i % 5) + 1,
      },
    });
  }

  console.log("Seeding completed successfully.");
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Grade" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Class" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Subject" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Teacher" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Lesson" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Parent" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Student" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Exam" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Assignment" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Result" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Attendance" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Event" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Announcement" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
