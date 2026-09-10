import { type Role } from "@prisma/client"

export const PERMISSIONS: Record<Role, string[]> = {
  SUPER_ADMIN: ["*"],
  ADMIN: [
    "users:*",
    "debtors:*",
    "debts:*",
    "payments:*",
    "communications:*",
    "campaigns:*",
    "reports:view",
    "settings:*",
  ],
  MANAGER: [
    "debtors:*",
    "debts:*",
    "payments:*",
    "communications:*",
    "campaigns:*",
    "reports:view",
    "users:view",
  ],
  AGENT: [
    "debtors:view",
    "debtors:update",
    "debts:view",
    "debts:update",
    "payments:create",
    "communications:*",
    "ptp:*",
  ],
  COMPLIANCE: [
    "debtors:view",
    "debts:view",
    "payments:view",
    "communications:view",
    "legal:*",
    "audit_logs:view",
    "reports:view",
  ],
  VIEWER: ["debtors:view", "debts:view", "reports:view"],
}

export function hasPermission(role: Role, permission: string): boolean {
  const rolePermissions = PERMISSIONS[role] || []
  
  if (rolePermissions.includes("*")) return true
  if (rolePermissions.includes(permission)) return true
  
  // Check wildcard permissions (e.g., "debtors:*" matches "debtors:create")
  const entity = permission.split(":")[0]
  if (rolePermissions.includes(`${entity}:*`)) return true
  
  return false
}

export function canAccess(role: Role, resource: string, action: string): boolean {
  return hasPermission(role, `${resource}:${action}`)
}
