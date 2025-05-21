import { Loader2 } from "lucide-react"; // For loading spinner
import { tv } from "tailwind-variants";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "outline";
  loading?: boolean;
};
export const button = tv({
  base: "inline-flex cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none  disabled:opacity-50 disabled:cursor-not-allowed",

  variants: {
    variant: {
      primary: "bg-primary text-text-highlight hover:bg-tertiary",
      secondary:
        "bg-secondary text-text-highlight hover:text-white hover:bg-secondary-accent",
      danger: "bg-danger text-white hover:bg-danger-highlight",
      outline:
        "border border-border bg-transparent text-text-highlight hover:bg-foreground",
    },
  },

  defaultVariants: {
    variant: "primary",
  },
});

export const Button = ({
  variant = "primary",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      className={button({ variant, className })}
      disabled={isDisabled}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};
