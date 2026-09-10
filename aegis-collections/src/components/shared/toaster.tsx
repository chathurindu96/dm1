"use client"

import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[hsl(var(--bg-elevated))] group-[.toaster]:text-[hsl(var(--text-primary))] group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-[hsl(var(--text-muted))]",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toast]:border-success/50",
          error: "group-[.toast]:border-danger/50",
          warning: "group-[.toast]:border-warning/50",
          info: "group-[.toast]:border-info/50",
        },
      }}
      duration={4000}
      visibleToasts={3}
    />
  )
}
