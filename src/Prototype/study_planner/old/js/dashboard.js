/* ══════════════════════════════════════════════════════════════════════════════ */
/* DASHBOARD PAGE JavaScript */
/* ══════════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {
  initializeDashboard();
});

function initializeDashboard() {
  console.log('Dashboard initialized');

  // Initialize search functionality
  const searchInput = document.querySelector('.search-wrap input');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  // Initialize plan row click handlers
  const planRows = document.querySelectorAll('.plan-row');
  planRows.forEach(row => {
    row.addEventListener('click', function() {
      console.log('Plan row clicked');
      // Can navigate to plan detail or open modal
    });
  });

  // Initialize event dots menu
  const eventDots = document.querySelectorAll('.event-dots');
  eventDots.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      console.log('Event menu clicked');
      // Can show context menu here
    });
  });
}

function handleSearch(e) {
  const query = e.target.value.toLowerCase();
  console.log('Searching for:', query);

  // Filter plans based on query
  const planRows = document.querySelectorAll('.plan-row');
  planRows.forEach(row => {
    const planName = row.querySelector('.plan-name').textContent.toLowerCase();
    row.style.display = planName.includes(query) ? 'flex' : 'none';
  });
}
