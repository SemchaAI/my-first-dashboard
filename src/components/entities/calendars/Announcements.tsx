import { Header } from "@/components/features";

// interface IProps {}

const data = [
  {
    id: 1,
    title: "Announcement 1",
    date: "2025-01-01",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quae.",
  },
  {
    id: 2,
    title: "Announcement 2",
    date: "2025-01-01",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quae.",
  },
  {
    id: 3,
    title: "Announcement 3",
    date: "2025-01-01",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quae.",
  },
];

export const Announcements = () => {
  return (
    <div className="flex w-full flex-col gap-1 rounded-2xl bg-background p-4">
      <Header title="Announcements" linkText="View all" link="#" />
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col overflow-hidden rounded-xl p-4 odd:bg-secondary even:bg-primary"
          >
            <div className="flex flex-wrap items-center justify-between gap-1 text-nowrap">
              <h1 className="text-lg font-semibold text-text-highlight">
                {item.title}
              </h1>
              <span className="rounded-2xl bg-background px-2 py-1 text-sm leading-3.5">
                {item.date}
              </span>
            </div>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
