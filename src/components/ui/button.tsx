import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import cx from "classnames";

const ButtonState = {
  Rest: "rest",
  Pressed: "pressed",
  Raised: "raised",
} as const;

type ButtonStateType = (typeof ButtonState)[keyof typeof ButtonState];

const buttonVariants = cva(
  cx(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-black transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none uppercase font-mono tracking-wider",
    "border-4 border-solid border-[#07080b] text-[#07080b] shadow-[6px_6px_0_#07080b] py-3 px-6",
    "transition-[translate,box-shadow,background-color] duration-150 ease-[cubic-bezier(.67,1.5,.95,1.24)]",
    "cursor-pointer select-none",
  ),
  {
    variants: {
      variant: {
        default: "bg-[#ffd437] text-[#0d0f14] hover:bg-[#ffe17d]",
        primary: "bg-[#ffd437] text-[#0d0f14] hover:bg-[#ffe17d]",
        red: "bg-[#ed1c24] text-white hover:bg-[#ff3b42]",
        blue: "bg-[#1d8fff] text-white hover:bg-[#47a5ff]",
        dark: "bg-[#0d0f14] text-white hover:bg-[#1a1e28]",
        outline: "bg-white text-[#0d0f14] hover:bg-[#ffd437]",
        ghost: "border-0 shadow-none hover:bg-[#ffd437]/20 text-[#0d0f14]",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-9 gap-1.5 px-4 text-xs shadow-[4px_4px_0_#07080b] border-3",
        lg: "h-14 px-8 text-lg shadow-[8px_8px_0_#07080b]",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ref,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    ref?: React.Ref<HTMLButtonElement>;
  }) {
  const Comp = asChild ? Slot : "button";
  const elem = React.useRef<HTMLButtonElement>(null);

  const buttonStateToggle = (
    state: ButtonStateType,
    elemNode: HTMLButtonElement,
  ) => {
    if (!elemNode) return;
    if (state === ButtonState.Pressed) {
      elemNode.style.transform = "translate(4px, 4px)";
      elemNode.style.boxShadow = "2px 2px 0 #07080b";
    } else if (state === ButtonState.Raised) {
      elemNode.style.transform = "translate(-2px, -2px)";
      elemNode.style.boxShadow = "8px 8px 0 #07080b";
    } else {
      elemNode.style.transform = "";
      elemNode.style.boxShadow = "";
    }
  };

  const loadRef = (node: HTMLButtonElement) => {
    if (!node) return;
    elem.current = node;
    elem.current.addEventListener("mousedown", () => {
      buttonStateToggle(ButtonState.Pressed, node);
    });
    elem.current.addEventListener("mouseup", () => {
      buttonStateToggle(ButtonState.Raised, node);
    });
    elem.current.addEventListener("mouseleave", () => {
      buttonStateToggle(ButtonState.Rest, node);
    });
    elem.current.addEventListener("mouseenter", () => {
      buttonStateToggle(ButtonState.Raised, node);
    });
    if (ref && typeof ref === "function") {
      ref(node);
    } else if (ref && typeof ref === "object") {
      (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    }
  };

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      ref={loadRef}
      {...props}
    />
  );
}

export { Button, buttonVariants };
