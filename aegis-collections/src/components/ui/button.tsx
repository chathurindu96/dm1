import { ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "outline" | "ghost" | "danger" | "success"
  size?: "sm" | "md" | "lg" | "icon"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            // Variants
            "bg-primary text-primary-foreground hover:bg-primary/90": variant === "primary",
            "bg-accent text-accent-foreground hover:bg-accent/90": variant === "secondary",
            "border border-border bg-transparent hover:bg-muted": variant === "outline",
            "hover:bg-muted text-muted-foreground": variant === "ghost",
            "bg-danger text-white hover:bg-danger/90": variant === "danger",
            "bg-success text-white hover:bg-success/90": variant === "success",
            "bg-[hsl(var(--text-primary))] text-[hsl(var(--text-inverse))] hover:opacity-90":
              variant === "default",
            // Sizes
            "h-8 px-3 text-xs": size === "sm",
            "h-10 px-4 text-sm": size === "md",
            "h-12 px-6 text-base": size === "lg",
            "h-10 w-10 p-0": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
