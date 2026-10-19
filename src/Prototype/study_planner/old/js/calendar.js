/* ══════════════════════════════════════════════════════════════════════════════ */
/* CALENDAR PAGE JavaScript */
/* ══════════════════════════════════════════════════════════════════════════════ */

let currentDate = new Date();
let currentView = 'today';

document.addEventListener('DOMContentLoaded', function() {
  initializeCalendar();
});

function initializeCalendar() {
  console.log('Calendar initialized');

  // Initialize view tabs
  const viewTabs = document.querySelectorAll('.view-tab');
  viewTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      switchView(this.dataset.view);
    });
  });

  // Initialize navigation buttons
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.addEventListener('click', goToPrevious);
  if (nextBtn) nextBtn.addEventListener('click', goToNext);

  // Initialize add new dropdown
  const addNewCalBtn = document.getElementById('addNewCalBtn');
  const addNewDropdown = document.getElementById('addNewDropdown');
  if (addNewCalBtn && addNewDropdown) {
    addNewCalBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      addNewDropdown.classList.toggle('visible');
    });

    document.addEventListener('click', function() {
      addNewDropdown.classList.remove('visible');
    });
  }

  // Initialize dropdown items
  const addNewItems = document.querySelectorAll('.add-new-item');
  addNewItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      const action = this.textContent.trim();
      console.log('Add new:', action);
      addNewDropdown.classList.remove('visible');
      // Can show modal or navigate here
    });
  });

  updateCalendarDisplay();
}

function switchView(view) {
  currentView = view;
  console.log('Switching to', view, 'view');

  // Update active tab
  document.querySelectorAll('.view-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelector(`.view-tab[data-view="${view}"]`)?.classList.add('active');

  // Hide all views
  document.getElementById('todayView').style.display = 'none';
  document.getElementById('weekView').style.display = 'none';
  document.getElementById('monthView').style.display = 'none';
  document.getElementById('yearView').style.display = 'none';

  // Show selected view
  switch(view) {
    case 'today':
      document.getElementById('todayView').style.display = 'block';
      break;
    case 'week':
      document.getElementById('weekView').style.display = 'block';
      break;
    case 'month':
      document.getElementById('monthView').style.display = 'block';
      break;
    case 'year':
      document.getElementById('yearView').style.display = 'block';
      generateYearView();
      break;
  }

  updateCalendarDisplay();
}

function goToPrevious() {
  if (currentView === 'today') {
    currentDate.setDate(currentDate.getDate() - 1);
  } else if (currentView === 'week') {
    currentDate.setDate(currentDate.getDate() - 7);
  } else if (currentView === 'month') {
    currentDate.setMonth(currentDate.getMonth() - 1);
  } else if (currentView === 'year') {
    currentDate.setFullYear(currentDate.getFullYear() - 1);
  }
  updateCalendarDisplay();
}

function goToNext() {
  if (currentView === 'today') {
    currentDate.setDate(currentDate.getDate() + 1);
  } else if (currentView === 'week') {
    currentDate.setDate(currentDate.getDate() + 7);
  } else if (currentView === 'month') {
    currentDate.setMonth(currentDate.getMonth() + 1);
  } else if (currentView === 'year') {
    currentDate.setFullYear(currentDate.getFullYear() + 1);
  }
  updateCalendarDisplay();
}

function updateCalendarDisplay() {
  const periodEl = document.getElementById('calPeriod');
  if (!periodEl) return;

  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };

  if (currentView === 'today') {
    periodEl.textContent = currentDate.toLocaleDateString('en-US', options);
    updateTodayView();
  } else if (currentView === 'week') {
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    periodEl.textContent = `${weekStart.toLocaleDateString('en-US')} - ${weekEnd.toLocaleDateString('en-US')}`;
  } else if (currentView === 'month') {
    periodEl.textContent = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  } else if (currentView === 'year') {
    periodEl.textContent = currentDate.getFullYear();
  }
}

function updateTodayView() {
  const dayLabel = document.querySelector('.cal-day-label .dow');
  const domLabel = document.querySelector('.cal-day-label .dom');
  
  if (dayLabel && domLabel) {
    const options = { weekday: 'long' };
    dayLabel.textContent = currentDate.toLocaleDateString('en-US', options);
    domLabel.textContent = currentDate.getDate();
  }
}

function generateYearView() {
  const yearGrid = document.getElementById('yearGrid');
  if (!yearGrid) return;

  yearGrid.innerHTML = '';
  const year = currentDate.getFullYear();

  for (let month = 0; month < 12; month++) {
    const miniMonth = document.createElement('div');
    miniMonth.className = 'mini-month';

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    const title = document.createElement('div');
    title.className = 'mini-month-title';
    title.textContent = monthNames[month];
    miniMonth.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'mini-month-grid';

    // Add day of week headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
      const dow = document.createElement('div');
      dow.className = 'mini-dow';
      dow.textContent = day;
      grid.appendChild(dow);
    });

    // Add day numbers
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    let date = new Date(startDate);
    for (let i = 0; i < 42; i++) {
      const dayBtn = document.createElement('button');
      dayBtn.className = 'mini-day';
      dayBtn.textContent = date.getDate();

      if (date.getMonth() !== month) {
        dayBtn.classList.add('other-month');
      }
      if (date.toDateString() === new Date().toDateString()) {
        dayBtn.classList.add('today-mini');
      }

      grid.appendChild(dayBtn);
      date.setDate(date.getDate() + 1);
    }

    miniMonth.appendChild(grid);
    yearGrid.appendChild(miniMonth);
  }
}
