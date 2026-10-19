/* ══════════════════════════════════════════════════════════════════════════════ */
/* SHARED JavaScript - Common functionality across all pages */
/* ══════════════════════════════════════════════════════════════════════════════ */

// Store user data in localStorage
const userData = {
  name: 'John Doe',
  avatar: '../assets/avatar.png',
};

// Initialize shared components
document.addEventListener('DOMContentLoaded', function() {
  initializeHeader();
});

function initializeHeader() {
  // Update profile info if needed
  const profileNames = document.querySelectorAll('.profile-name');
  profileNames.forEach(el => {
    if (el.textContent.trim() === 'JohnDoe') {
      el.textContent = userData.name;
    }
  });

  // Profile menu toggle
  const profileAccounts = document.querySelectorAll('.profile-account');
  profileAccounts.forEach(account => {
    account.addEventListener('click', function(e) {
      e.preventDefault();
      // Can add profile dropdown here
      console.log('Profile clicked');
    });
  });

  // Chevron button click
  const chevronBtns = document.querySelectorAll('.chevron-btn');
  chevronBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      // Can add menu dropdown here
      console.log('Menu clicked');
    });
  });
}

// Utility function to navigate to a page
function navigateTo(url) {
  window.location.href = url;
}

// Utility function to go back
function goBack() {
  window.history.back();
}

// Utility function to check if offline
function isOffline() {
  return !navigator.onLine;
}

// Export functions for use in other scripts
window.appUtils = {
  navigateTo,
  goBack,
  isOffline,
  userData,
};
