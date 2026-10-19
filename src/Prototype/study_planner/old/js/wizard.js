/* ══════════════════════════════════════════════════════════════════════════════ */
/* WIZARD MODAL JavaScript - Create Study Plan */
/* ══════════════════════════════════════════════════════════════════════════════ */

let currentStep = 1;
const totalSteps = 7;
const formData = {
  subject: '',
  exam: '',
  hours: '',
  strengths: [],
  targetScore: '',
  examDate: '',
};

document.addEventListener('DOMContentLoaded', function() {
  initializeWizard();
});

function initializeWizard() {
  console.log('Wizard initialized');

  // Initialize step panels
  showStep(currentStep);

  // Initialize navigation buttons
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const skipBtn = document.getElementById('skipBtn');

  if (prevBtn) prevBtn.addEventListener('click', previousStep);
  if (nextBtn) nextBtn.addEventListener('click', nextStep);
  if (skipBtn) skipBtn.addEventListener('click', skipStep);

  // Initialize radio options
  initializeRadioOptions();

  // Initialize checkbox options
  initializeCheckboxOptions();

  // Initialize calendar
  initializeCalendarPicker();

  // Initialize score input
  const scoreInput = document.getElementById('targetScore');
  if (scoreInput) {
    scoreInput.addEventListener('input', handleScoreInput);
  }

  // Close modal on escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const link = document.querySelector('.modal-close');
      if (link) link.click();
    }
  });
}

function initializeRadioOptions() {
  const radioOptions = document.querySelectorAll('.radio-opt');
  radioOptions.forEach(option => {
    option.addEventListener('click', function() {
      const input = this.querySelector('input[type="radio"]');
      const groupName = input.name;

      // Deselect all in group
      document.querySelectorAll(`input[name="${groupName}"]`).forEach(el => {
        el.parentElement.classList.remove('selected');
        el.checked = false;
      });

      // Select this one
      input.checked = true;
      this.classList.add('selected');

      // Store data
      if (groupName === 'subject') formData.subject = input.value;
      if (groupName === 'exam') formData.exam = input.value;
      if (groupName === 'hours') formData.hours = input.value;

      updateReview();
      updateNextButton();
    });
  });

  // Pre-select if data exists
  Object.keys(formData).forEach(key => {
    if (formData[key] && ['subject', 'exam', 'hours'].includes(key)) {
      const input = document.querySelector(`input[name="${key}"][value="${formData[key]}"]`);
      if (input) {
        input.parentElement.classList.add('selected');
        input.checked = true;
      }
    }
  });
}

function initializeCheckboxOptions() {
  const checkboxOptions = document.querySelectorAll('.check-opt');
  checkboxOptions.forEach(option => {
    option.addEventListener('click', function() {
      const input = this.querySelector('input[type="checkbox"]');
      input.checked = !input.checked;
      this.classList.toggle('selected');

      // Store selected values
      formData.strengths = Array.from(document.querySelectorAll('.check-opt input[type="checkbox"]:checked'))
        .map(el => el.value);

      updateReview();
      updateNextButton();
    });
  });
}

function initializeCalendarPicker() {
  generateCalendar();

  const prevMonthBtn = document.getElementById('prevMonthBtn');
  const nextMonthBtn = document.getElementById('nextMonthBtn');

  if (prevMonthBtn) prevMonthBtn.addEventListener('click', () => {
    const monthLabel = document.getElementById('monthLabel');
    monthLabel.click();
  });

  if (nextMonthBtn) nextMonthBtn.addEventListener('click', () => {
    const monthLabel = document.getElementById('monthLabel');
    monthLabel.click();
  });
}

function generateCalendar() {
  const calGrid = document.getElementById('calendarGrid');
  if (!calGrid) return;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Day of week headers
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calGrid.innerHTML = '';

  days.forEach(day => {
    const dow = document.createElement('div');
    dow.className = 'cal-dow';
    dow.textContent = day;
    calGrid.appendChild(dow);
  });

  // Days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  let date = new Date(startDate);
  for (let i = 0; i < 42; i++) {
    const dayBtn = document.createElement('button');
    dayBtn.className = 'cal-day';
    dayBtn.textContent = date.getDate();
    dayBtn.type = 'button';

    if (date.getMonth() !== month) {
      dayBtn.classList.add('other-month');
    }
    if (date.toDateString() === today.toDateString()) {
      dayBtn.classList.add('today');
    }
    if (formData.examDate === date.toISOString().split('T')[0]) {
      dayBtn.classList.add('selected');
    }

    dayBtn.addEventListener('click', function(e) {
      e.preventDefault();
      selectDate(new Date(date));
    });

    calGrid.appendChild(dayBtn);
    date.setDate(date.getDate() + 1);
  }

  // Update month label
  const monthLabel = document.getElementById('monthLabel');
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                     'July', 'August', 'September', 'October', 'November', 'December'];
  if (monthLabel) {
    monthLabel.textContent = monthNames[month] + ' \u25BC';
  }
}

function selectDate(date) {
  formData.examDate = date.toISOString().split('T')[0];

  // Update display
  const selectedDate = document.getElementById('selectedDate');
  if (selectedDate) {
    selectedDate.textContent = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  generateCalendar();
  updateReview();
  updateNextButton();
}

function handleScoreInput(e) {
  formData.targetScore = e.target.value;
  updateReview();
  updateNextButton();
}

function updateReview() {
  const subjectMap = {
    'math': 'Mathematics',
    'science': 'Science',
    'english': 'English & Literature',
    'history': 'History',
    'other': 'Other'
  };

  const examMap = {
    'sat': 'SAT',
    'act': 'ACT',
    'ap': 'AP Exam',
    'midterm': 'Midterm/Final'
  };

  const hoursMap = {
    '5': '5 hours/week or less',
    '10': '5-10 hours/week',
    '20': '10-20 hours/week',
    '30': '20+ hours/week'
  };

  if (formData.subject) {
    document.getElementById('reviewSubject').textContent = subjectMap[formData.subject] || formData.subject;
  }
  if (formData.exam) {
    document.getElementById('reviewExam').textContent = examMap[formData.exam] || formData.exam;
  }
  if (formData.hours) {
    document.getElementById('reviewHours').textContent = hoursMap[formData.hours] || formData.hours;
  }
  if (formData.targetScore) {
    document.getElementById('reviewTarget').textContent = formData.targetScore;
  }
  if (formData.examDate) {
    const date = new Date(formData.examDate);
    document.getElementById('reviewDate').textContent = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }
}

function showStep(step) {
  // Hide all steps
  document.querySelectorAll('.step-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  // Show current step
  document.querySelector(`.step-panel[data-step="${step}"]`)?.classList.add('active');

  // Update progress bar
  const progressFill = document.getElementById('progressFill');
  if (progressFill) {
    const progress = (step / totalSteps) * 100;
    progressFill.style.width = progress + '%';
  }

  // Update button states
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const skipBtn = document.getElementById('skipBtn');

  if (prevBtn) prevBtn.disabled = step === 1;
  if (skipBtn) skipBtn.classList.toggle('visible', step < totalSteps);
  if (nextBtn) nextBtn.textContent = step === totalSteps ? 'Start Studying →' : 'Next →';

  updateNextButton();
}

function updateNextButton() {
  const nextBtn = document.getElementById('nextBtn');
  if (!nextBtn) return;

  let isValid = false;

  switch(currentStep) {
    case 1:
      isValid = !!formData.subject;
      break;
    case 2:
      isValid = !!formData.exam;
      break;
    case 3:
      isValid = !!formData.hours;
      break;
    case 4:
      isValid = formData.strengths.length > 0;
      break;
    case 5:
      isValid = !!formData.targetScore;
      break;
    case 6:
      isValid = !!formData.examDate;
      break;
    case 7:
      isValid = true;
      break;
  }

  if (isValid) {
    nextBtn.classList.add('enabled');
  } else {
    nextBtn.classList.remove('enabled');
  }
}

function nextStep() {
  const nextBtn = document.getElementById('nextBtn');
  if (!nextBtn.classList.contains('enabled')) return;

  if (currentStep === totalSteps) {
    // Submit form
    submitWizard();
  } else {
    currentStep++;
    showStep(currentStep);
  }
}

function previousStep() {
  const prevBtn = document.getElementById('prevBtn');
  if (prevBtn.disabled) return;

  currentStep--;
  showStep(currentStep);
}

function skipStep() {
  // For now, just go to next step
  nextStep();
}

function submitWizard() {
  console.log('Submitting form data:', formData);
  
  // Show loading state
  alert('Creating your personalized study plan...');

  // Redirect to dashboard or loading page
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1000);
}
