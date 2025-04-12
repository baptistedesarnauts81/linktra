import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 border border-solid rounded-[3px] shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] text-[13px] overflow-hidden whitespace-nowrap text-ellipsis select-none touch-manipulation focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-indigo-100 to-indigo-200 border-indigo-300 border-b-indigo-400 text-indigo-900 hover:border-indigo-400 hover:border-b-indigo-500 active:border-b-indigo-400 focus:border-indigo-500 focus:shadow-[0_0_3px_2px_rgba(147,51,234,0.5)]",
        destructive:
          "bg-gradient-to-b from-red-100 to-red-200 border-red-300 border-b-red-400 text-red-900 hover:border-red-400 hover:border-b-red-500 active:border-b-red-400 focus:border-red-500 focus:shadow-[0_0_3px_2px_rgba(220,38,38,0.5)]",
        secondary:
          "bg-gradient-to-b from-[#f7f8fa] to-[#e7e9ec] border-[#adb1b8] border-b-[#8d9096] text-[#0f1111] hover:border-[#a2a6ac] hover:border-b-[#82858a] active:border-b-[#a2a6ac] focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]",
        outline:
          "bg-gradient-to-b from-gray-50 to-gray-100 border-gray-300 border-b-gray-400 text-gray-900 hover:border-gray-400 hover:border-b-gray-500 active:border-b-gray-400 focus:border-gray-500 focus:shadow-[0_0_3px_2px_rgba(156,163,175,0.5)]",
        ghost:
          "bg-transparent border-transparent shadow-none text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:border-gray-300 focus:shadow-[0_0_3px_2px_rgba(156,163,175,0.5)]",
        link: "bg-transparent border-transparent shadow-none text-blue-600 underline-offset-4 hover:underline focus:underline focus:shadow-none",
        soft: "bg-gradient-to-b from-blue-50 to-blue-100 border-blue-200 border-b-blue-300 text-blue-800 hover:border-blue-300 hover:border-b-blue-400 active:border-b-blue-300 focus:border-blue-400 focus:shadow-[0_0_3px_2px_rgba(59,130,246,0.5)]",
      },
      size: {
        default: "h-[29px] px-[11px] py-0",
        sm: "h-[25px] px-[8px] py-0 text-[12px]",
        lg: "h-[35px] px-[14px] py-0 text-[14px]",
        xl: "h-[42px] px-[18px] py-0 text-[16px]",
        icon: "h-[29px] w-[29px]",
      },
      loading: {
        true: "opacity-70 cursor-wait pointer-events-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      loading: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, loading, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <div className="flex flex-row justify-center items-center space-x-2">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {children}
          </div>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
