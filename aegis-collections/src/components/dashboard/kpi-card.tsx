"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface KPICardProps {
  title: string
  value: string | number
  change?: number
  icon?: React.ReactNode
  trend?: "up" | "down" | "neutral"
  className?: string
}

export function KPICard({
  title,
  value,
  change,
  icon,
  trend = "neutral",
  className,
}: KPICardProps) {
  const trendColors = {
    up: "text-success",
    down: "text-danger",
    neutral: "text-muted-foreground",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        "rounded-xl border border-border bg-[hsl(var(--bg-elevated))] p-6 shadow-sm hover:shadow-md transition-all duration-200",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-[hsl(var(--text-muted))]">
            {title}
          </p>
          <p className="text-2xl font-bold font-mono text-[hsl(var(--text-primary))]">
            {value}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  "text-xs font-medium",
                  trendColors[trend]
                )}
              >
                {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {Math.abs(change)}%
              </span>
              <span className="text-xs text-[hsl(var(--text-muted))]">
                vs last month
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-[hsl(var(--bg-muted))] p-3">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  )
}
