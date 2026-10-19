import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAnalyticsSummary, logoutAdmin, verifyAdminToken, downloadAnalyticsCSV, clearAnalyticsData } from '../utils/analytics';
import { AnalyticsSummary } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faDownload, faTrash, faChartBar, faLink, faTag, faUsers, faCalendar } from '@fortawesome/free-solid-svg-icons';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    if (!verifyAdminToken()) {
      navigate('/workshop/login');
      return;
    }

    // Load analytics
    loadAnalytics();

    // Set auto-refresh every 10 seconds
    const interval = setInterval(loadAnalytics, 10000);
    setRefreshInterval(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const loadAnalytics = () => {
    const data = getAnalyticsSummary();
    setAnalytics(data);
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/workshop/login');
  };

  const handleExport = () => {
    downloadAnalyticsCSV();
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
      clearAnalyticsData();
      loadAnalytics();
    }
  };

  if (!analytics) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-brand/20 border-t-brand animate-spin mx-auto mb-4"></div>
          <p className="text-ink/60">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-canvas via-brand/5 to-canvas">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-ink">Workshop Analytics</h1>
            <p className="text-sm text-ink/60">Real-time visitor tracking and insights</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand/10 text-brand font-medium hover:bg-brand/20 transition-colors"
            >
              <FontAwesomeIcon icon={faDownload} /> Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors"
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Visitors */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-brand/10 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-ink/60">Total Visitors</h3>
              <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
                <FontAwesomeIcon icon={faUsers} className="text-brand" />
              </div>
            </div>
            <p className="text-3xl font-bold text-ink">{analytics.totalVisitors}</p>
            <p className="text-xs text-ink/40 mt-2">All-time tracked visitors</p>
          </div>

          {/* Unique Sources */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-brand/10 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-ink/60">Traffic Sources</h3>
              <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
                <FontAwesomeIcon icon={faLink} className="text-brand" />
              </div>
            </div>
            <p className="text-3xl font-bold text-ink">{Object.keys(analytics.sourceBreakdown).length}</p>
            <p className="text-xs text-ink/40 mt-2">Unique traffic sources</p>
          </div>

          {/* Versions Tracked */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-brand/10 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-ink/60">Versions Tracked</h3>
              <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
                <FontAwesomeIcon icon={faTag} className="text-brand" />
              </div>
            </div>
            <p className="text-3xl font-bold text-ink">{Object.keys(analytics.versionBreakdown).length}</p>
            <p className="text-xs text-ink/40 mt-2">Different versions</p>
          </div>

          {/* Last Updated */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-brand/10 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-ink/60">Last Updated</h3>
              <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
                <FontAwesomeIcon icon={faCalendar} className="text-brand" />
              </div>
            </div>
            <p className="text-lg font-bold text-ink">{new Date().toLocaleTimeString()}</p>
            <p className="text-xs text-ink/40 mt-2">Auto-refreshes every 10s</p>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Traffic Sources */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-brand/10">
            <div className="flex items-center gap-2 mb-6">
              <FontAwesomeIcon icon={faLink} className="text-brand" />
              <h2 className="text-lg font-bold text-ink">Top Traffic Sources</h2>
            </div>
            
            {analytics.topSources.length > 0 ? (
              <div className="space-y-3">
                {analytics.topSources.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-brand/5 hover:bg-brand/10 transition-colors">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-ink">{item.source}</p>
                        <p className="text-xs text-ink/50">{item.count} visitor{item.count !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <div className="bg-brand/20 text-brand font-bold px-3 py-1 rounded-full text-sm">
                      {((item.count / analytics.totalVisitors) * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-ink/50">
                <p>No traffic data yet</p>
              </div>
            )}
          </div>

          {/* Top Versions */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-brand/10">
            <div className="flex items-center gap-2 mb-6">
              <FontAwesomeIcon icon={faTag} className="text-brand" />
              <h2 className="text-lg font-bold text-ink">Version Distribution</h2>
            </div>
            
            {analytics.topVersions.length > 0 ? (
              <div className="space-y-3">
                {analytics.topVersions.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-brand/5 hover:bg-brand/10 transition-colors">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-ink">{item.version}</p>
                        <p className="text-xs text-ink/50">{item.count} visitor{item.count !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <div className="bg-brand/20 text-brand font-bold px-3 py-1 rounded-full text-sm">
                      {((item.count / analytics.totalVisitors) * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-ink/50">
                <p>No version data yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-brand/10 mt-8">
          <h2 className="text-lg font-bold text-ink mb-6 flex items-center gap-2">
            <FontAwesomeIcon icon={faChartBar} className="text-brand" />
            Recent Visitors
          </h2>
          
          {analytics.recentEvents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-brand/10">
                    <th className="text-left py-3 px-4 font-semibold text-ink/60 text-sm">Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-ink/60 text-sm">Source</th>
                    <th className="text-left py-3 px-4 font-semibold text-ink/60 text-sm">Version</th>
                    <th className="text-left py-3 px-4 font-semibold text-ink/60 text-sm">Path</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.recentEvents.map((event, idx) => (
                    <tr key={idx} className="border-b border-brand/5 hover:bg-brand/5 transition-colors">
                      <td className="py-3 px-4 text-sm text-ink">{new Date(event.timestamp).toLocaleTimeString()}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="bg-brand/10 text-brand px-3 py-1 rounded-full text-xs font-semibold">
                          {event.source}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {event.version}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-ink/70 font-mono">{event.path}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-ink/50">
              <p>No visitor events yet</p>
            </div>
          )}
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-xl border border-red-200 p-6 mt-8">
          <h3 className="text-lg font-bold text-red-700 mb-4">Danger Zone</h3>
          <button
            onClick={handleClearData}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
          >
            <FontAwesomeIcon icon={faTrash} /> Clear All Analytics Data
          </button>
          <p className="text-xs text-red-600 mt-2">Warning: This action cannot be undone</p>
        </div>
      </div>
    </div>
  );
}
