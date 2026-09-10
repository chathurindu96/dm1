import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format currency based on locale and currency code
 */
export function formatCurrency(
  amount: number | string,
  currency: string = "INR",
  locale: string = "en-IN"
): string {
  const numericAmount = typeof amount === "string" ? parseFloat(amount) : amount
  
  if (isNaN(numericAmount)) {
    return "₹0"
  }
  
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numericAmount)
}

/**
 * Format date with relative time support
 */
export function formatDate(
  date: Date | string,
  options?: {
    relative?: boolean
    showTime?: boolean
  }
): string {
  const d = typeof date === "string" ? new Date(date) : date
  
  if (options?.relative) {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)
    
    if (diffInSeconds < 60) {
      return "just now"
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes}m ago`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours}h ago`
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400)
      return `${days}d ago`
    }
  }
  
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: options?.showTime ? "numeric" : undefined,
    minute: options?.showTime ? "numeric" : undefined,
  }).format(d)
}

/**
 * Format number with Indian numbering system (lakhs, crores)
 */
export function formatIndianNumber(num: number): string {
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2)} Cr`
  } else if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2)} L`
  } else if (num >= 1000) {
    return `₹${(num / 1000).toFixed(2)} K`
  }
  return `₹${num.toFixed(2)}`
}

/**
 * Calculate aging bucket based on days overdue
 */
export function getAgingBucket(daysOverdue: number): string {
  if (daysOverdue <= 0) return "Current"
  if (daysOverdue <= 30) return "0-30"
  if (daysOverdue <= 60) return "31-60"
  if (daysOverdue <= 90) return "61-90"
  if (daysOverdue <= 180) return "91-180"
  return "180+"
}

/**
 * Get status color for debt status
 */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    ACTIVE: "bg-blue-500",
    CONTACTED: "bg-yellow-500",
    PTP_GIVEN: "bg-purple-500",
    PTP_BROKEN: "bg-red-500",
    PARTIAL_PAID: "bg-orange-500",
    SETTLED: "bg-green-500",
    WRITTEN_OFF: "bg-gray-500",
    LEGAL: "bg-red-700",
    CLOSED: "bg-emerald-500",
  }
  return colors[status] || "bg-gray-400"
}

/**
 * Generate a unique receipt number
 */
export function generateReceiptNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `RCPT-${timestamp}-${random}`
}

/**
 * Validate PAN (Indian Permanent Account Number)
 */
export function validatePAN(pan: string): boolean {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
  return panRegex.test(pan.toUpperCase())
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Download file from URL
 */
export function downloadFile(url: string, filename: string): void {
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
