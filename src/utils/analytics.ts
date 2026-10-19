import { AnalyticsEvent, AnalyticsSummary } from '../admin/types';

const ANALYTICS_STORAGE_KEY = 'workshop_analytics_events';
const ADMIN_USERS_KEY = 'workshop_admin_users';

/**
 * Initialize analytics system with default admin user
 */
export function initializeAnalytics() {
  if (!localStorage.getItem(ADMIN_USERS_KEY)) {
    const defaultUser = {
      id: '1',
      username: 'admin',
      password: 'workshop2026', // Change this in production!
      createdAt: Date.now()
    };
    localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify([defaultUser]));
  }
}

/**
 * Track a visitor from URL parameters
 */
export function trackVisitor() {
  const params = new URLSearchParams(window.location.search);
  const source = params.get('src') || 'direct';
  const version = params.get('v') || 'unknown';

  const event: AnalyticsEvent = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    source,
    version,
    userAgent: navigator.userAgent,
    referrer: document.referrer,
    path: window.location.pathname
  };

  const events = getAnalyticsEvents();
  events.push(event);
  
  // Keep only last 1000 events in storage
  if (events.length > 1000) {
    events.shift();
  }
  
  localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(events));
  return event;
}

/**
 * Get all analytics events
 */
export function getAnalyticsEvents(): AnalyticsEvent[] {
  const data = localStorage.getItem(ANALYTICS_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Get analytics summary
 */
export function getAnalyticsSummary(): AnalyticsSummary {
  const events = getAnalyticsEvents();
  
  const sourceBreakdown: Record<string, number> = {};
  const versionBreakdown: Record<string, number> = {};

  events.forEach(event => {
    sourceBreakdown[event.source] = (sourceBreakdown[event.source] || 0) + 1;
    versionBreakdown[event.version] = (versionBreakdown[event.version] || 0) + 1;
  });

  const topSources = Object.entries(sourceBreakdown)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const topVersions = Object.entries(versionBreakdown)
    .map(([version, count]) => ({ version, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    totalVisitors: events.length,
    sourceBreakdown,
    versionBreakdown,
    topSources,
    topVersions,
    recentEvents: events.slice(-20).reverse()
  };
}

/**
 * Clear all analytics data (admin only)
 */
export function clearAnalyticsData() {
  localStorage.removeItem(ANALYTICS_STORAGE_KEY);
}

/**
 * Verify admin login
 */
export function verifyAdminLogin(username: string, password: string): boolean {
  const users = localStorage.getItem(ADMIN_USERS_KEY);
  if (!users) return false;
  
  const adminUsers = JSON.parse(users);
  return adminUsers.some((user: any) => user.username === username && user.password === password);
}

/**
 * Get admin auth token
 */
export function getAdminToken(username: string, password: string): string | null {
  if (verifyAdminLogin(username, password)) {
    const token = btoa(`${username}:${password}:${Date.now()}`);
    localStorage.setItem('workshop_admin_token', token);
    return token;
  }
  return null;
}

/**
 * Verify admin token
 */
export function verifyAdminToken(): boolean {
  const token = localStorage.getItem('workshop_admin_token');
  return !!token;
}

/**
 * Logout admin
 */
export function logoutAdmin() {
  localStorage.removeItem('workshop_admin_token');
}

/**
 * Export analytics data as CSV
 */
export function exportAnalyticsAsCSV(): string {
  const events = getAnalyticsEvents();
  const headers = ['ID', 'Timestamp', 'Source', 'Version', 'Path', 'Date'];
  const rows = events.map(event => [
    event.id,
    event.timestamp,
    event.source,
    event.version,
    event.path,
    new Date(event.timestamp).toLocaleString()
  ]);

  const csv = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  return csv;
}

/**
 * Download analytics data as CSV file
 */
export function downloadAnalyticsCSV() {
  const csv = exportAnalyticsAsCSV();
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `analytics-${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
