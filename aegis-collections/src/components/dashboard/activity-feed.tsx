"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { formatCurrency, formatDate } from "@/lib/utils"

interface ActivityFeedItem {
  id: string
  type: "payment" | "ptp" | "communication" | "legal" | "assignment"
  title: string
  description: string
  timestamp: Date
  userId: string
  userName: string
  userAvatar?: string | null
}

interface ActivityFeedProps {
  activities: ActivityFeedItem[]
  className?: string
}

const typeColors = {
  payment: "bg-success",
  ptp: "bg-warning",
  communication: "bg-info",
  legal: "bg-danger",
  assignment: "bg-primary",
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("space-y-4", className)}
    >
      <h3 className="text-sm font-semibold text-[hsl(var(--text-primary))]">
        Live Activity
      </h3>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start gap-3 rounded-lg border border-border bg-[hsl(var(--bg-elevated))] p-3"
          >
            <div
              className={cn(
                "mt-0.5 h-2 w-2 rounded-full",
                typeColors[activity.type]
              )}
            />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-[hsl(var(--text-primary))]">
                {activity.title}
              </p>
              <p className="text-xs text-[hsl(var(--text-muted))]">
                {activity.description}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[hsl(var(--text-muted))]">
                  {formatDate(activity.timestamp, { relative: true })}
                </span>
                {activity.userName && (
                  <>
                    <span className="text-[hsl(var(--border))]">•</span>
                    <span className="text-xs text-[hsl(var(--text-secondary))]">
                      {activity.userName}
                    </span>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
