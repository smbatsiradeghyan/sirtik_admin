export const getActivePath = (url: string) => '/' + url.split('/').slice(1)?.[0] || ''
export const getActiveTab = (url: string) => '/' + url.split('/').slice(1)?.[1] || ''
