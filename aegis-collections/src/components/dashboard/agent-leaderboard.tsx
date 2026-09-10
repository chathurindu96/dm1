"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AgentPerformance {
  id: string
  name: string
  avatarUrl: string | null
  assignedDebts: number
  collected: number
  calls: number
  conversionRate: number
}

interface AgentLeaderboardProps {
  data: AgentPerformance[]
  className?: string
}

export function AgentLeaderboard({ data, className }: AgentLeaderboardProps) {
  // Sort by collected amount
  const sortedData = [...data].sort((a, b) => b.collected - a.collected)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("space-y-4", className)}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[hsl(var(--text-primary))]">
          Top Performers
        </h3>
      </div>
      <div className="space-y-2">
        {sortedData.slice(0, 10).map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "flex items-center gap-3 rounded-lg border border-border bg-[hsl(var(--bg-elevated))] p-3 transition-colors hover:bg-[hsl(var(--bg-muted))]"
            )}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--bg-muted))] text-xs font-bold">
              {index + 1}
            </div>
            <Avatar className="h-10 w-10">
              <AvatarImage src={agent.avatarUrl || undefined} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {agent.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-[hsl(var(--text-primary))]">
                {agent.name}
              </p>
              <div className="flex items-center gap-2 text-xs text-[hsl(var(--text-muted))]">
                <span>{agent.assignedDebts} accounts</span>
                <span>•</span>
                <span>{agent.calls} calls</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-mono font-semibold text-[hsl(var(--text-primary))]">
                {formatCurrency(agent.collected)}
              </p>
              <p
                className={cn(
                  "text-xs",
                  agent.conversionRate >= 70
                    ? "text-success"
                    : agent.conversionRate >= 40
                    ? "text-warning"
                    : "text-danger"
                )}
              >
                {agent.conversionRate}% conv.
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
