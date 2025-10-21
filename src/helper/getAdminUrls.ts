export const getAdminUrl = (blockUrl: string, sub?: string): string => `${blockUrl}${!!sub ? `/${sub}` : ''}`
