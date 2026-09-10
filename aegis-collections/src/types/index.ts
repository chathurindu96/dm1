// Re-export all types from Prisma client
export type {
  Organization,
  User,
  Role,
  Debtor,
  Address,
  Creditor,
  DebtAccount,
  DebtStatus,
  Payment,
  PaymentMethod,
  PromiseToPay,
  PTPStatus,
  Communication,
  CommunicationChannel,
  CommunicationDirection,
  Campaign,
  CampaignStatus,
  CampaignRule,
  LegalCase,
  LegalCaseStatus,
  LegalNotice,
  Document,
  DocumentType,
  Tag,
  AuditLog,
  AuditAction,
  ActivityLog,
  Notification,
  NotificationType,
  Account,
  Session,
  VerificationToken,
} from "@prisma/client"

// Dashboard types
export interface DashboardKPI {
  totalOutstanding: number
  collectedThisMonth: number
  recoveryRate: number
  activeDebtors: number
  overdue30Days: number
  overdue60Days: number
  overdue90Days: number
  ptpKept: number
  ptpBroken: number
}

export interface AgingBucket {
  bucket: string
  count: number
  amount: number
}

export interface CollectionTrendPoint {
  date: string
  amount: number
  count: number
}

export interface AgentPerformance {
  id: string
  name: string
  avatarUrl: string | null
  assignedDebts: number
  collected: number
  calls: number
  conversionRate: number
}

export interface ActivityFeedItem {
  id: string
  type: "payment" | "ptp" | "communication" | "legal" | "assignment"
  title: string
  description: string
  timestamp: Date
  userId: string
  userName: string
  userAvatar?: string | null
}

// API Response types
export interface ApiResponse<T> {
  data?: T
  error?: {
    code: string
    message: string
    details?: Record<string, string[]>
  }
  meta?: {
    total?: number
    page?: number
    pageSize?: number
    totalPages?: number
  }
}

export interface PaginationParams {
  page?: number
  pageSize?: number
  cursor?: string
  take?: number
}

export interface SortParams {
  field?: string
  order?: "asc" | "desc"
}

export interface FilterParams {
  [key: string]: string | number | boolean | string[] | number[]
}
