# Workshop Admin Panel Documentation

## Overview

The Workshop Admin Panel is a separate analytics module integrated into the Suman Sahu portfolio. It tracks visitor sources and versions through URL parameters, providing insights into traffic patterns and user attribution.

## Features

- 🔐 **Secure Login**: Simple username/password authentication
- 📊 **Real-time Analytics**: Live visitor tracking and metrics
- 📈 **Traffic Insights**: Source and version breakdowns
- 📥 **CSV Export**: Download analytics data for external analysis
- 🔄 **Auto-refresh**: Dashboard updates every 10 seconds
- 🗑️ **Data Management**: Clear analytics data when needed

## Access

**URL**: `https://sumansahu.in/workshop`

### Default Credentials

- **Username**: `admin`
- **Password**: `workshop2026`

⚠️ **Security Note**: Change these credentials in production!

## URL Tracking Format

To track a visitor with specific source and version, use the following URL structure:

```
https://sumansahu.in/?src=<source>&v=<version>
```

### Examples

**Resume Share**:

```
https://sumansahu.in/?src=resume&v=2026_09
```

**LinkedIn Share**:

```
https://sumansahu.in/?src=linkedin&v=2026_q3
```

**Email Campaign**:

```
https://sumansahu.in/?src=email&v=campaign_001
```

**GitHub Profile**:

```
https://sumansahu.in/?src=github&v=2026
```

## How It Works

1. **Initialization**: Analytics system initializes on app startup
2. **Tracking**: When a user visits with URL parameters, it's tracked
3. **Storage**: Data is stored in browser localStorage (can be upgraded to backend)
4. **Dashboard**: Admin views analytics at `/workshop/dashboard`
5. **Export**: Download data as CSV for further analysis

## Tracked Data

Each visitor event includes:

- **ID**: Unique event identifier
- **Timestamp**: When the visit occurred
- **Source**: Traffic source (e.g., resume, linkedin, email)
- **Version**: Version tag (e.g., 2026_09, v1.0)
- **User Agent**: Browser and device information
- **Referrer**: HTTP referrer header
- **Path**: Portfolio page visited

## Dashboard Metrics

### KPI Cards

- **Total Visitors**: All-time tracked visitor count
- **Traffic Sources**: Number of unique sources
- **Versions Tracked**: Number of unique versions
- **Last Updated**: Real-time refresh status

### Analytics Sections

1. **Top Traffic Sources**:
   - Ranked by visitor count
   - Percentage distribution
   - Real-time updates

2. **Version Distribution**:
   - Top versions tracked
   - Visitor count per version
   - Visual percentages

3. **Recent Visitors**:
   - Last 20 visitor events
   - Time, source, version, and path
   - Sortable table format

## Features in Detail

### Export Analytics

- Click "Export CSV" button
- Downloads all analytics data
- CSV format for spreadsheet analysis
- Includes timestamp and full details

### Auto-refresh

- Dashboard updates every 10 seconds
- Real-time metrics
- No manual refresh needed

### Data Management

- **Clear All Analytics**: Remove all stored data
- One-click operation with confirmation
- Use for testing or privacy

## SEO Configuration

- **robots.txt**: Disallows `/workshop` from search engines
- **No Indexing**: Admin panel not ranked in search results
- **Portfolio Indexing**: Main portfolio pages fully indexed

## Storage

**Current**: Browser localStorage

- Maximum ~1000 recent events
- Persists across browser sessions
- Client-side only

**Future Upgrade Options**:

- Backend database (Firebase, Supabase, PostgreSQL)
- Server-side analytics (Mixpanel, Amplitude)
- Cloud storage (AWS S3, Google Cloud)

## Authentication Flow

1. User navigates to `/workshop`
2. Redirected to `/workshop/login`
3. Enter credentials
4. Token stored in localStorage
5. Access to `/workshop/dashboard` granted
6. Auto-logout on browser close or manual logout

## Example Tracking Scenarios

### Resume Submission Tracking

```javascript
// Share this link on resume:
https://sumansahu.in/?src=resume&v=2026_09

// Admin can see:
// - Source: "resume"
// - Version: "2026_09"
// - Count: Number of recruiters/hiring managers who clicked
```

### Campaign Tracking

```javascript
// Email campaign link:
https://sumansahu.in/?src=email&v=hiring_campaign_sept

// Track multiple campaigns:
https://sumansahu.in/?src=email&v=hiring_campaign_oct
https://sumansahu.in/?src=email&v=hiring_campaign_nov

// Dashboard shows effectiveness per campaign
```

### Platform Tracking

```javascript
// LinkedIn:
https://sumansahu.in/?src=linkedin&v=profile_link

// GitHub:
https://sumansahu.in/?src=github&v=bio_link

// Twitter:
https://sumansahu.in/?src=twitter&v=post_link

// See which platform drives most traffic
```

## Development Notes

### File Structure

```
src/
├── admin/
│   ├── AdminLogin.tsx          # Login page
│   ├── AdminDashboard.tsx      # Dashboard
│   ├── ProtectedRoute.tsx      # Route protection
│   └── types.ts                # TypeScript types
├── utils/
│   └── analytics.ts            # Analytics logic
└── App.tsx                      # Updated with admin routes
```

### Key Functions

**Analytics Utils** (`src/utils/analytics.ts`):

- `initializeAnalytics()` - Initialize system
- `trackVisitor()` - Track current visitor
- `getAnalyticsEvents()` - Get all events
- `getAnalyticsSummary()` - Get summary stats
- `verifyAdminToken()` - Check auth
- `downloadAnalyticsCSV()` - Export data

## Customization

### Change Admin Credentials

Edit `src/utils/analytics.ts` in `initializeAnalytics()`:

```typescript
const defaultUser = {
  id: "1",
  username: "your_username",
  password: "your_secure_password",
  createdAt: Date.now(),
};
```

### Add More Metrics

Extend `AnalyticsSummary` type in `src/admin/types.ts` and update calculations in `getAnalyticsSummary()`.

### Upgrade Storage

Replace localStorage with backend:

1. Modify `trackVisitor()` to send to API
2. Update `getAnalyticsEvents()` to fetch from server
3. Implement backend endpoint to store/retrieve data

## Security Considerations

- ⚠️ **Not Production Ready**: Current implementation uses localStorage
- Use HTTPS for all communications
- Implement proper password hashing on backend
- Add rate limiting for login attempts
- Consider implementing 2FA for production

## Troubleshooting

**Can't login?**

- Verify username/password are correct
- Clear browser cookies and localStorage
- Try incognito/private browsing

**No tracking data?**

- Ensure URLs include `src=` and `v=` parameters
- Check browser console for errors
- Verify localStorage isn't disabled

**Dashboard not loading?**

- Clear localStorage and re-login
- Check if token is valid
- Try refreshing the page

## Future Enhancements

- Backend database integration
- Advanced filtering and date ranges
- User segmentation
- Geographic tracking
- Device/browser analytics
- Conversion funnel tracking
- Real-time notifications
- Multi-user support
- Role-based access control
