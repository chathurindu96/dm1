"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Stack,
} from "recharts"

interface AgingBucket {
  bucket: string
  count: number
  amount: number
}

interface AgingChartProps {
  data: AgingBucket[]
  className?: string
}

export function AgingChart({ data, className }: AgingChartProps) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-border bg-[hsl(var(--bg-elevated))] p-3 shadow-lg">
          <p className="font-medium text-[hsl(var(--text-primary))]">
            {payload[0].payload.bucket} days
          </p>
          <p className="text-sm text-[hsl(var(--text-secondary))]">
            Accounts: {payload[0].value}
          </p>
          <p className="text-sm font-mono text-[hsl(var(--text-primary))]">
            Amount: ₹{payload[0].value.toLocaleString("en-IN")}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("h-[300px] w-full", className)}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="bucket"
            stroke="hsl(var(--text-muted))"
            fontSize={12}
          />
          <YAxis
            stroke="hsl(var(--text-muted))"
            fontSize={12}
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="amount"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
