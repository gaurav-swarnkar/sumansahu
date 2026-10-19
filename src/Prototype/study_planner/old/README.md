# Study Planner Prototype - Multi-Page HTML/CSS/JS Project

A simple, standalone HTML/CSS/JavaScript study planner application with multiple pages, no build tools required.

## Project Structure

```
study_planner/
├── pages/
│   ├── index.html              # Landing page - Shows "No plans" message
│   ├── dashboard.html          # Dashboard - Shows upcoming events and study plans
│   ├── calendar.html           # Calendar - Multiple views (Today, Week, Month, Year)
│   └── create-plan.html        # Create Study Plan - Multi-step wizard modal
├── styles/
│   ├── shared.css              # Common styles for all pages
│   ├── landing.css             # Landing page specific styles
│   ├── dashboard.css           # Dashboard specific styles
│   ├── calendar.css            # Calendar specific styles
│   └── wizard.css              # Wizard modal specific styles
├── js/
│   ├── shared.js               # Shared utilities and initialization
│   ├── landing.js              # Landing page logic
│   ├── dashboard.js            # Dashboard logic (search, interactions)
│   ├── calendar.js             # Calendar logic (view switching, navigation)
│   └── wizard.js               # Wizard modal logic (form, validation)
├── assets/                     # Placeholder directory for images/icons
└── README.md                   # This file
```

## Pages

### 1. **Landing Page** (`pages/index.html`)

- Entry point of the application
- Shows "No Study Plans Yet" message
- Button to create first study plan
- Navigates to `create-plan.html`

### 2. **Dashboard** (`pages/dashboard.html`)

- Welcome message with user name
- Upcoming events section (4 event cards)
- Search functionality to filter study plans
- Study plans list with details (name, file count, due date)
- Navigation buttons to Calendar and Create Plan

### 3. **Calendar** (`pages/calendar.html`)

- Multiple view options: Today, Week, Month, Year
- Navigation between dates/periods
- Today view shows hourly schedule
- Week view displays 7-day grid
- Month view shows full calendar
- Year view shows 12 mini calendars
- Add new events dropdown menu

### 4. **Create Study Plan (Wizard)** (`pages/create-plan.html`)

- Multi-step form modal (7 steps)
- Step 1: Subject selection
- Step 2: Exam type selection
- Step 3: Weekly study hours
- Step 4: Study strengths (checkboxes)
- Step 5: Target score/grade
- Step 6: Exam date (calendar picker)
- Step 7: Review and confirm
- Progress bar tracking
- Previous/Next/Skip buttons

## Features

### Navigation

- All pages are interconnected with proper navigation links
- Landing page → Create Plan → Dashboard
- Dashboard ↔ Calendar
- Proper back buttons for returning to previous pages

### Interactive Elements

- **Radio buttons** for single selection
- **Checkboxes** for multiple selections
- **Calendar picker** with date selection
- **View switcher** for calendar views
- **Search functionality** on dashboard
- **Dropdown menus** for actions

### Responsive Design

- Mobile-friendly layouts
- Breakpoints at 768px and 480px
- Flexible grid layouts
- Touch-friendly buttons and inputs

### Data Management

- Form data stored in wizard state
- Data persists across wizard steps
- Review page shows all collected data
- Ready to integrate with backend API

## Styling

### Color Scheme

- Primary Blue: `#2d8af6`
- Accent Purple: `#495aff`
- Dark Text: `#0d203a` / `#30415a`
- Light Gray: `#f8f8f8` / `#f5f7fa`
- Border Gray: `#e0e4eb`

### Fonts

- Body: Outfit (400, 500, 600, 700)
- Accents: Poppins (400, 600)
- Details: Inter (500)

## Getting Started

### 1. Open in Browser

Simply open `pages/index.html` in a web browser. No build step required.

### 2. File Paths

- All asset references use relative paths: `../assets/`
- CSS files are in `../styles/`
- JavaScript files are in `../js/`

### 3. Customization

- Update asset paths in HTML if your image directory structure differs
- Modify colors in CSS files
- Extend JavaScript logic in individual page files

## JavaScript Organization

### `shared.js`

- Common utilities and initialization
- Profile menu handling
- Navigation helpers
- User data management

### Page-Specific Files

Each page has its own JavaScript file for:

- Page initialization
- Event listeners
- Interactive behavior
- Data handling

### `wizard.js`

Complex multi-step form handling:

- Step validation
- Form data collection
- Calendar integration
- Progress tracking
- Submit handling

## How to Extend

### Add New Page

1. Create new HTML file in `pages/`
2. Create corresponding CSS file in `styles/`
3. Create corresponding JS file in `js/`
4. Import shared.css and shared.js
5. Add navigation links to/from existing pages

### Add New Features

- Form validation in `wizard.js`
- Calendar features in `calendar.js`
- Dashboard interactions in `dashboard.js`
- Styling in respective CSS files

### API Integration

- Modify wizard.js `submitWizard()` to call API
- Update dashboard.js to fetch plans from API
- Add loading states and error handling

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES6+ JavaScript support
- CSS Grid and Flexbox support

## Notes

- No dependencies required
- No build tools needed
- Single-page navigation (not SPA)
- Images/icons in `assets/` folder are placeholders - replace with actual files
- All data is currently client-side (localStorage compatible)

## Future Enhancements

- Backend API integration
- User authentication
- Data persistence
- Real-time calendar sync
- Email notifications
- Progress tracking
- Analytics
