export const menu = [
  {
    title: 'MENU',
    items: [
      {
        icon: 'House',
        label: 'Home',
        href: '/',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: 'GraduationCap',
        label: 'Teachers',
        href: '/list/teachers',
        visible: ['admin', 'teacher'],
      },
      {
        icon: 'Users',
        label: 'Students',
        href: '/list/students',
        visible: ['admin', 'teacher'],
      },
      {
        icon: 'UsersRound',
        label: 'Parents',
        href: '/list/parents',
        visible: ['admin', 'teacher'],
      },
      {
        icon: 'ScrollText',
        label: 'Subjects',
        href: '/list/subjects',
        visible: ['admin'],
      },
      {
        icon: 'School',
        label: 'Classes',
        href: '/list/classes',
        visible: ['admin', 'teacher'],
      },
      {
        icon: 'Presentation',
        label: 'Lessons',
        href: '/list/lessons',
        visible: ['admin', 'teacher'],
      },
      {
        icon: 'BookLock',
        label: 'Exams',
        href: '/list/exams',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: 'Signature',
        label: 'Assignments',
        href: '/list/assignments',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: 'ThumbsUp',
        label: 'Results',
        href: '/list/results',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: 'UserCheck',
        label: 'Attendance',
        href: '/list/attendance',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: 'CalendarClock',
        label: 'Events',
        href: '/list/events',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: 'MessageCircleMore',
        label: 'Messages',
        href: '/list/messages',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: 'Megaphone',
        label: 'Announcements',
        href: '/list/announcements',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
    ],
  },
  {
    title: 'OTHER',
    items: [
      {
        icon: 'CircleUser',
        label: 'Profile',
        href: '/profile',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: 'Settings',
        label: 'Settings',
        href: '/settings',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: 'LogOut',
        label: 'Logout',
        href: '/logout',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
    ],
  },
];
