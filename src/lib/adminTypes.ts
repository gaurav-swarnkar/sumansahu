export interface AnalyticsEvent {
  id: string;
  timestamp: number;
  source: string;
  version: string;
  userAgent: string;
  referrer: string;
  path: string;
}

export interface AdminUser {
  id: string;
  username: string;
  password: string; // In production, use proper hashing
  createdAt: number;
}

export interface AnalyticsSummary {
  totalVisitors: number;
  sourceBreakdown: Record<string, number>;
  versionBreakdown: Record<string, number>;
  topSources: Array<{ source: string; count: number }>;
  topVersions: Array<{ version: string; count: number }>;
  recentEvents: AnalyticsEvent[];
}
