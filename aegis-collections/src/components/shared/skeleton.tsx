"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[hsl(var(--border))]",
        className
      )}
    />
  )
}

interface CardSkeletonProps {
  showHeader?: boolean
  showFooter?: boolean
}

export function CardSkeleton({ showHeader = true, showFooter = false }: CardSkeletonProps) {
  return (
    <div className="rounded-xl border border-border bg-[hsl(var(--bg-elevated))] p-6">
      {showHeader && (
        <div className="mb-4 flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-3 w-[100px]" />
          </div>
        </div>
      )}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
      {showFooter && (
        <div className="mt-4 flex justify-end space-x-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      )}
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full space-y-3">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} showHeader={false} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <CardSkeleton />
        </div>
        <div className="lg:col-span-3">
          <CardSkeleton />
        </div>
      </div>
    </div>
  )
}
