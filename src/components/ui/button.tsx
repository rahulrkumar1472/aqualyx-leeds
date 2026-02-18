import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(140deg,hsl(var(--primary))_0%,hsl(205_92%_58%)_100%)] text-primary-foreground shadow-[0_14px_34px_hsl(var(--primary)/0.3)] hover:-translate-y-0.5 hover:shadow-[0_18px_42px_hsl(var(--primary)/0.38)]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline:
          "border border-input/90 bg-background text-foreground shadow-[inset_0_-1px_0_hsl(var(--border)/0.55)] hover:-translate-y-0.5 hover:bg-accent/70 hover:text-accent-foreground",
        ghost: "border border-transparent hover:border-primary/20 hover:bg-accent/70 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        ctaSecondary:
          "border border-primary/35 bg-[linear-gradient(145deg,hsl(var(--primary)/0.14)_0%,hsl(var(--background))_100%)] text-secondary shadow-[0_10px_30px_hsl(var(--primary)/0.12)] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_hsl(var(--primary)/0.18)]",
        ctaTertiary:
          "border border-secondary/22 bg-background text-secondary hover:-translate-y-0.5 hover:bg-secondary/5"
      },
      size: {
        default: "h-12 px-5 py-2",
        sm: "h-9 rounded-xl px-3.5",
        lg: "h-14 rounded-2xl px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
