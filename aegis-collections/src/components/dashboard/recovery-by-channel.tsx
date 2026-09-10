"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"

interface RecoveryByChannelData {
  channel: string
  value: number
  count: number
}

interface RecoveryByChannelProps {
  data: RecoveryByChannelData[]
  className?: string
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(var(--success))",
  "hsl(var(--info))",
  "hsl(var(--warning))",
  "hsl(var(--danger))",
]

export function RecoveryByChannel({ data, className }: RecoveryByChannelProps) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-border bg-[hsl(var(--bg-elevated))] p-3 shadow-lg">
          <p className="font-medium text-[hsl(var(--text-primary))]">
            {payload[0].name}
          </p>
          <p className="text-sm text-[hsl(var(--text-secondary))]">
            Collections: {payload[0].value}
          </p>
          <p className="text-sm font-mono text-[hsl(var(--text-primary))]">
            Amount: ₹{payload[0].payload.originalValue?.toLocaleString("en-IN")}
          </p>
        </div>
      )
    }
    return null
  }

  // Format data for Recharts with original values
  const chartData = data.map((item, index) => ({
    ...item,
    name: item.channel,
    originalValue: item.value,
    value: Math.round((item.value / data.reduce((sum, d) => sum + d.value, 0)) * 100),
  }))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("h-[300px] w-full", className)}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => (
              <span className="text-sm text-[hsl(var(--text-secondary))]">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
