/**
 * AAPLE SARKAR REDESIGN - MAHARASHTRA CITIZEN SERVICES PORTAL
 * Interactive Application Controller
 * Handles Navigation, 6 Screens, State Management, Filters, Multi-Step Form, Tracking
 */

// 1. DATA: Catalog of Services (including the 13 required services)
const SERVICES_DATA = [
  {
    id: "income",
    title: "Income Certificate (उत्पन्न दाखला)",
    department: "Revenue",
    departmentName: "Revenue Department",
    sla: "15 Days Delivery",
    docsCount: "4 Documents Required",
    desc: "Official certificate verifying annual household family income for scholarships, education fee concessions, and government welfare schemes."
  },
  {
    id: "caste",
    title: "Caste Certificate (जात प्रमाणपत्र)",
    department: "Social Welfare",
    departmentName: "Social Justice & Special Assistance",
    sla: "21 Days Delivery",
    docsCount: "5 Documents Required",
    desc: "Proof of belonging to Scheduled Caste (SC), Scheduled Tribe (ST), OBC, VJNT or SEBC for constitutional reservation and benefits."
  },
  {
    id: "domicile",
    title: "Age Nationality Domicile Certificate",
    department: "Revenue",
    departmentName: "Revenue Department",
    sla: "15 Days Delivery",
    docsCount: "4 Documents Required",
    desc: "Legal certification affirming 15+ years residency in Maharashtra and Indian nationality, mandatory for state university admissions and recruitment."
  },
  {
    id: "senior-citizen",
    title: "Senior Citizen Certificate (ज्येष्ठ नागरिक)",
    department: "Social Welfare",
    departmentName: "Social Welfare Department",
    sla: "7 Days Delivery",
    docsCount: "3 Documents Required",
    desc: "Identity certificate for senior citizens aged 60 and above to avail MSRTC bus concessions, healthcare priority, and pension benefits."
  },
  {
    id: "solvency",
    title: "Solvency Certificate (सॉल्व्हन्सी दाखला)",
    department: "Revenue",
    departmentName: "Revenue Department",
    sla: "15 Days Delivery",
    docsCount: "4 Documents Required",
    desc: "Certification issued by Tahsildar declaring financial solvency and creditworthiness of an individual or commercial enterprise."
  },
  {
    id: "non-creamy-layer",
    title: "Non Creamy Layer Certificate (NCL)",
    department: "Social Welfare",
    departmentName: "Social Justice Department",
    sla: "21 Days Delivery",
    docsCount: "4 Documents Required",
    desc: "Mandatory certificate validating that OBC/VJNT/SBC candidate family income is within the non-creamy layer limit (less than ₹8 Lakhs)."
  },
  {
    id: "landless",
    title: "Land Less Certificate (भूमिहीन प्रमाणपत्र)",
    department: "Revenue",
    departmentName: "Revenue & Land Records",
    sla: "15 Days Delivery",
    docsCount: "3 Documents Required",
    desc: "Verification issued to agricultural laborers certifying that they do not possess agricultural land holding in the state."
  },
  {
    id: "general-affidavit",
    title: "General Affidavit (सामान्य शपथपत्र)",
    department: "Revenue",
    departmentName: "Revenue Department",
    sla: "3 Days Delivery",
    docsCount: "2 Documents Required",
    desc: "Digital self-declaration swearing statements on government e-stamp paper for municipal or statutory administrative approvals."
  },
  {
    id: "certified-copy",
    title: "Certified Copy (प्रमाणित प्रत - 7/12 & फेरफार)",
    department: "Revenue",
    departmentName: "Land Records & Revenue",
    sla: "5 Days Delivery",
    docsCount: "2 Documents Required",
    desc: "Legally attested and watermarked certified copy of land records (Satbara 7/12, 8A, Ferfar mutation extract) from Talathi office."
  },
  {
    id: "agriculturist",
    title: "Agriculturist Certificate (शेतकरी दाखला)",
    department: "Agriculture",
    departmentName: "Department of Agriculture",
    sla: "10 Days Delivery",
    docsCount: "4 Documents Required",
    desc: "Certificate acknowledging genuine farmer status, required for purchasing agricultural farmland in Maharashtra or claiming farm subsidies."
  },
  {
    id: "cultural-permission",
    title: "Cultural Programme Permission",
    department: "Revenue",
    departmentName: "Home & Revenue Department",
    sla: "7 Days Delivery",
    docsCount: "3 Documents Required",
    desc: "Single-window online permission and NOC for public cultural gatherings, Ganesh Utsav, Navratri pandals, and sound systems."
  },
  {
    id: "small-farmer",
    title: "Small Land Holder Farmer Certificate",
    department: "Agriculture",
    departmentName: "Department of Agriculture",
    sla: "15 Days Delivery",
    docsCount: "3 Documents Required",
    desc: "Verification for marginal farmers possessing land up to 2 hectares (5 acres) to qualify for state agricultural machinery subsidies."
  },
  {
    id: "hilly-area",
    title: "Certificate of Residence in Hilly Area",
    department: "Revenue",
    departmentName: "Revenue Department",
    sla: "15 Days Delivery",
    docsCount: "3 Documents Required",
    desc: "Statutory residence verification for citizens residing in designated hilly and remote forest regions of Western Ghats/Sahyadri."
  }
];

// Sample Tracking Records Database
const TRACKING_DATABASE = {
  "MH2026INCOME01": {
    applicant: "Rahul Ramesh Patil",
    service: "Income Certificate (उत्पन्न दाखला)",
    appliedDate: "08 Oct 2026",
    district: "Pune, Haveli",
    authority: "Tahsildar Office, Haveli",
    status: "approved",
    statusLabel: "Approved",
    steps: [
      { name: "Step 1: Application Submitted", time: "08 Oct 2026, 11:20 AM", note: "Documents uploaded & fee paid", state: "completed" },
      { name: "Step 2: Departmental Review", time: "09 Oct 2026, 03:45 PM", note: "Talathi field verification completed", state: "completed" },
      { name: "Step 3: Decision Made", time: "11 Oct 2026, 04:10 PM", note: "Approved by Sub-Divisional Officer", state: "completed" },
      { name: "Step 4: Certificate Ready", time: "11 Oct 2026, 05:00 PM", note: "Digital signature & QR stamped", state: "completed" }
    ],
    canDownload: true
  },
  "MH2026CASTE02": {
    applicant: "Pooja Vasant Shinde",
    service: "Caste Certificate (जात प्रमाणपत्र)",
    appliedDate: "10 Oct 2026",
    district: "Nashik, Niphad",
    authority: "Sub-Divisional Officer, Niphad",
    status: "review",
    statusLabel: "Under Review",
    steps: [
      { name: "Step 1: Application Submitted", time: "10 Oct 2026, 09:15 AM", note: "Application validated via DigiLocker", state: "completed" },
      { name: "Step 2: Departmental Review", time: "11 Oct 2026, 02:30 PM", note: "Lineage records verification ongoing", state: "active" },
      { name: "Step 3: Decision Made", time: "Pending", note: "Awaiting Committee Scrutiny", state: "pending" },
      { name: "Step 4: Certificate Ready", time: "Pending", note: "Digital Stamping Pending", state: "pending" }
    ],
    canDownload: false
  },
  "MH2026DOM03": {
    applicant: "Vikram Suresh Jadhav",
    service: "Age Nationality Domicile Certificate",
    appliedDate: "12 Oct 2026",
    district: "Kolhapur, Karveer",
    authority: "Executive Magistrate, Karveer",
    status: "pending",
    statusLabel: "Pending",
    steps: [
      { name: "Step 1: Application Submitted", time: "12 Oct 2026, 10:00 AM", note: "Application queued in system", state: "completed" },
      { name: "Step 2: Departmental Review", time: "Queued", note: "Assigned to Circle Officer", state: "pending" },
      { name: "Step 3: Decision Made", time: "Pending", note: "Scrutiny Pending", state: "pending" },
      { name: "Step 4: Certificate Ready", time: "Pending", note: "Pending", state: "pending" }
    ],
    canDownload: false
  },
  "MH2026SOLV04": {
    applicant: "Anand Dattatray Kulkarni",
    service: "Solvency Certificate (सॉल्व्हन्सी)",
    appliedDate: "05 Oct 2026",
    district: "Solapur, North Solapur",
    authority: "Tahsildar Office, Solapur",
    status: "rejected",
    statusLabel: "Rejected",
    steps: [
      { name: "Step 1: Application Submitted", time: "05 Oct 2026, 02:15 PM", note: "Application submitted", state: "completed" },
      { name: "Step 2: Departmental Review", time: "07 Oct 2026, 11:30 AM", note: "Valuation documents missing proper seal", state: "failed" },
      { name: "Step 3: Decision Made", time: "08 Oct 2026, 04:00 PM", note: "Rejected: Incomplete encumbrance report", state: "failed" },
      { name: "Step 4: Certificate Ready", time: "N/A", note: "Application closed. Appeal under RTS possible.", state: "failed" }
    ],
    canDownload: false
  }
};

// Global App State
let currentScreen = "home";
let currentDeptFilter = "all";
let currentWizardStep = 1;
let selectedServiceForApply = SERVICES_DATA[0];

// 2. INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  renderHomeServicesGrid();
  renderAllServicesGrid();
  setupNavigationHandlers();
  setupHeroSearch();
  setupServicesFilter();
  setupAuthTabs();
  setupTrackingView();
  setupApplicationWizard();
  setupFaqAccordion();
  setupAccessibilityControls();
  generateCaptcha();
});

// 3. SCREEN SWITCHER & NAVIGATION
function showScreen(screenId) {
  // Update screen view containers
  const screens = document.querySelectorAll(".screen-view");
  screens.forEach(s => s.classList.remove("active"));
  
  const targetScreen = document.getElementById(`screen-${screenId}`);
  if (targetScreen) {
    targetScreen.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Update header navigation active state
  const navButtons = document.querySelectorAll(".nav-item");
  navButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.nav === screenId);
  });

  // Update mobile drawer navigation active state
  const mobileNavButtons = document.querySelectorAll(".mobile-nav-item");
  mobileNavButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.nav === screenId);
  });

  // Update top helper switcher pill state
  const pills = document.querySelectorAll(".screen-picker-bar .pill-btn");
  pills.forEach(p => {
    p.classList.toggle("active", p.dataset.screenJump === screenId);
  });

  currentScreen = screenId;
}

function setupNavigationHandlers() {
  // Header Nav Items
  document.querySelectorAll("[data-nav]").forEach(elem => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      const target = elem.getAttribute("data-nav");
      showScreen(target);
    });
  });

  // Top Screen Picker Pills
  document.querySelectorAll("[data-screen-jump]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-screen-jump");
      showScreen(target);
    });
  });

  // Quick Action Cards on Homepage
  document.querySelectorAll("[data-action]").forEach(card => {
    card.addEventListener("click", () => {
      const action = card.getAttribute("data-action");
      if (action === "goto-services") showScreen("services");
      else if (action === "goto-track") showScreen("track");
      else if (action === "goto-auth") showScreen("auth");
    });
  });

  // Breadcrumbs
  document.querySelectorAll(".breadcrumb-link").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const navTarget = btn.getAttribute("data-nav");
      if (navTarget) showScreen(navTarget);
    });
  });

  // Mobile Navigation Drawer Toggle & Close
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileNavDrawer = document.getElementById("mobile-nav-drawer");
  const mobileNavBackdrop = document.getElementById("mobile-nav-backdrop");
  const mobileNavClose = document.getElementById("mobile-nav-close");

  function openMobileNav() {
    if (mobileNavDrawer && mobileNavBackdrop && mobileMenuBtn) {
      mobileNavDrawer.classList.add("open");
      mobileNavBackdrop.classList.add("active");
      mobileMenuBtn.classList.add("active");
      mobileMenuBtn.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
    }
  }

  function closeMobileNav() {
    if (mobileNavDrawer && mobileNavBackdrop && mobileMenuBtn) {
      mobileNavDrawer.classList.remove("open");
      mobileNavBackdrop.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = mobileNavDrawer && mobileNavDrawer.classList.contains("open");
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener("click", closeMobileNav);
  }

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener("click", closeMobileNav);
  }

  // Also close mobile drawer when any mobile nav item is clicked
  document.querySelectorAll(".mobile-nav-item, #mobile-drawer-login-btn").forEach(item => {
    item.addEventListener("click", () => {
      closeMobileNav();
    });
  });
}

// 4. RENDERING SERVICES
function createServiceCardHTML(item) {
  return `
    <article class="service-card" data-service-id="${item.id}" data-dept="${item.department}">
      <div class="service-card-header">
        <span class="dept-badge">${item.department}</span>
        <span class="badge-sla"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -1px; margin-right: 3px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>${item.sla}</span>
      </div>
      <h3 class="service-title">${item.title}</h3>
      <p class="service-desc">${item.desc}</p>
      <div class="service-footer">
        <span class="service-req-docs"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -1px; margin-right: 3px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>${item.docsCount}</span>
        <button class="btn-card-apply" onclick="initiateApply('${item.id}')">
          <span>Apply Now</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </article>
  `;
}

function renderHomeServicesGrid() {
  const container = document.getElementById("home-services-grid");
  if (!container) return;

  // Filter based on home department tabs
  const filtered = currentDeptFilter === "all" 
    ? SERVICES_DATA.slice(0, 6) 
    : SERVICES_DATA.filter(s => s.department.toLowerCase() === currentDeptFilter.toLowerCase()).slice(0, 6);

  container.innerHTML = filtered.map(createServiceCardHTML).join("");

  // Home Department Tabs
  const tabs = document.querySelectorAll(".dept-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      currentDeptFilter = tab.dataset.dept;
      renderHomeServicesGrid();
    });
  });
}

function renderAllServicesGrid(filteredList = null) {
  const container = document.getElementById("all-services-grid");
  const countBadge = document.getElementById("services-counter-badge");
  const emptyState = document.getElementById("services-empty-state");
  if (!container) return;

  const list = filteredList || SERVICES_DATA;
  if (countBadge) {
    countBadge.textContent = `${list.length} Services Available`;
  }

  if (list.length === 0) {
    container.innerHTML = "";
    if (emptyState) emptyState.style.display = "block";
  } else {
    if (emptyState) emptyState.style.display = "none";
    container.innerHTML = list.map(createServiceCardHTML).join("");
  }
}

// 5. SEARCH & FILTER CONTROLS
function setupHeroSearch() {
  const searchInput = document.getElementById("home-search-input");
  const searchBtn = document.getElementById("home-search-btn");
  const clearBtn = document.getElementById("clear-home-search");

  function triggerHeroSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      showScreen("services");
      return;
    }
    showScreen("services");
    const servicesInput = document.getElementById("services-search-input");
    if (servicesInput) {
      servicesInput.value = query;
      filterServicesCatalog(query, "all");
    }
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", triggerHeroSearch);
  }
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") triggerHeroSearch();
    });
    searchInput.addEventListener("input", () => {
      if (clearBtn) clearBtn.style.display = searchInput.value ? "block" : "none";
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      clearBtn.style.display = "none";
    });
  }

  // Popular search chips
  document.querySelectorAll(".pop-tag").forEach(tag => {
    tag.addEventListener("click", () => {
      const term = tag.dataset.tag;
      if (searchInput) searchInput.value = term;
      triggerHeroSearch();
    });
  });
}

function setupServicesFilter() {
  const searchInput = document.getElementById("services-search-input");
  const clearBtn = document.getElementById("services-clear-search");
  const filterPills = document.querySelectorAll(".filter-pill");
  const resetBtn = document.getElementById("reset-services-filter");

  let activeCategory = "all";

  function applyFilters() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    filterServicesCatalog(query, activeCategory);
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      if (clearBtn) clearBtn.style.display = searchInput.value ? "inline-block" : "none";
      applyFilters();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      clearBtn.style.display = "none";
      applyFilters();
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeCategory = pill.dataset.filter;
      applyFilters();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
        if (clearBtn) clearBtn.style.display = "none";
      }
      activeCategory = "all";
      filterPills.forEach(p => p.classList.toggle("active", p.dataset.filter === "all"));
      renderAllServicesGrid(SERVICES_DATA);
    });
  }
}

function filterServicesCatalog(searchQuery, category) {
  let results = SERVICES_DATA;

  if (category && category !== "all") {
    results = results.filter(item => item.department.toLowerCase() === category.toLowerCase());
  }

  if (searchQuery) {
    results = results.filter(item => {
      return item.title.toLowerCase().includes(searchQuery) ||
             item.desc.toLowerCase().includes(searchQuery) ||
             item.department.toLowerCase().includes(searchQuery);
    });
  }

  renderAllServicesGrid(results);
}

window.filterServicesFromFooter = function(dept) {
  showScreen("services");
  const pills = document.querySelectorAll(".filter-pill");
  pills.forEach(p => {
    p.classList.toggle("active", p.dataset.filter.toLowerCase() === dept.toLowerCase());
  });
  filterServicesCatalog("", dept);
};

// 6. SCREEN 3: AUTH (LOGIN & REGISTER)
function setupAuthTabs() {
  const btnShowLogin = document.getElementById("btn-show-login");
  const btnShowRegister = document.getElementById("btn-show-register");
  const btnSwitchToReg = document.getElementById("btn-switch-to-reg");
  const btnSwitchBackLogin = document.getElementById("btn-switch-back-login");
  const loginView = document.getElementById("login-form-view");
  const regView = document.getElementById("register-form-view");

  const tabCitizen = document.getElementById("tab-citizen");
  const tabVle = document.getElementById("tab-vle");

  function switchToLogin() {
    if (btnShowLogin) btnShowLogin.classList.add("active");
    if (btnShowRegister) btnShowRegister.classList.remove("active");
    if (loginView) loginView.style.display = "block";
    if (regView) regView.style.display = "none";
  }

  function switchToRegister() {
    if (btnShowRegister) btnShowRegister.classList.add("active");
    if (btnShowLogin) btnShowLogin.classList.remove("active");
    if (regView) regView.style.display = "block";
    if (loginView) loginView.style.display = "none";
  }

  if (btnShowLogin) btnShowLogin.addEventListener("click", switchToLogin);
  if (btnShowRegister) btnShowRegister.addEventListener("click", switchToRegister);
  if (btnSwitchToReg) btnSwitchToReg.addEventListener("click", switchToRegister);
  if (btnSwitchBackLogin) btnSwitchBackLogin.addEventListener("click", switchToLogin);

  // Citizen vs VLE mode
  if (tabCitizen && tabVle) {
    tabCitizen.addEventListener("click", () => {
      tabCitizen.classList.add("active");
      tabVle.classList.remove("active");
      const label = document.querySelector("label[for='login-username']");
      if (label) label.textContent = "Username / Mobile No / Aadhaar";
    });
    tabVle.addEventListener("click", () => {
      tabVle.classList.add("active");
      tabCitizen.classList.remove("active");
      const label = document.querySelector("label[for='login-username']");
      if (label) label.textContent = "VLE CSC ID / Kendra Code";
      showToast("Switched to MahaOnline Village Level Entrepreneur (VLE) portal", "info");
    });
  }

  // Password reveal toggle
  const pwdToggle = document.getElementById("toggle-pwd-btn");
  const pwdInput = document.getElementById("login-password");
  if (pwdToggle && pwdInput) {
    pwdToggle.addEventListener("click", () => {
      const isPass = pwdInput.type === "password";
      pwdInput.type = isPass ? "text" : "password";
      pwdToggle.innerHTML = isPass 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    });
  }

  // Refresh captcha button
  const refreshCaptchaBtn = document.getElementById("refresh-captcha-btn");
  if (refreshCaptchaBtn) {
    refreshCaptchaBtn.addEventListener("click", generateCaptcha);
  }

  // Single Forgot Credentials modal
  const forgotBtn = document.getElementById("btn-forgot-credentials");
  const forgotModal = document.getElementById("forgot-modal");
  const closeForgotModal = document.getElementById("close-forgot-modal");
  const cancelForgotModal = document.getElementById("cancel-forgot-modal");
  const submitForgotModal = document.getElementById("submit-forgot-modal");

  if (forgotBtn && forgotModal) {
    forgotBtn.addEventListener("click", () => {
      forgotModal.style.display = "flex";
    });
  }
  if (closeForgotModal) {
    closeForgotModal.addEventListener("click", () => forgotModal.style.display = "none");
  }
  if (cancelForgotModal) {
    cancelForgotModal.addEventListener("click", () => forgotModal.style.display = "none");
  }
  if (submitForgotModal) {
    submitForgotModal.addEventListener("click", () => {
      const val = document.getElementById("recover-input").value;
      if (!val) {
        showToast("Please enter your registered Mobile or Aadhaar number.", "error");
        return;
      }
      forgotModal.style.display = "none";
      showToast("OTP sent to Aadhaar-registered mobile for credential recovery.", "success");
    });
  }
}

function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const captchaElem = document.getElementById("captcha-code");
  if (captchaElem) captchaElem.textContent = code.split("").join(" ");
}

window.handleLoginSubmit = function() {
  const username = document.getElementById("login-username").value;
  const captchaInput = document.getElementById("captcha-input").value;

  if (!captchaInput) {
    showToast("Please enter the security verification captcha.", "error");
    return;
  }

  const submitBtn = document.getElementById("btn-submit-login");
  const originalText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>Signing In...</span>`;

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    showToast(`Welcome back, ${username || 'Citizen'}! Successfully authenticated.`, "success");
    
    // Update header login button to user state
    const authBtn = document.getElementById("header-auth-label");
    if (authBtn) authBtn.textContent = "Rahul Patil (Logged in)";
    
    showScreen("home");
  }, 700);
};

window.handleRegisterSubmit = function() {
  const name = document.getElementById("reg-fullname").value;
  const mobile = document.getElementById("reg-mobile").value;
  const district = document.getElementById("reg-district").value;

  if (!district) {
    showToast("Please select your district.", "error");
    return;
  }

  const submitBtn = document.getElementById("btn-submit-register");
  const originalText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>Creating Account...</span>`;

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    showToast(`Citizen Registration Successful! Welcome, ${name}.`, "success");
    
    const authBtn = document.getElementById("header-auth-label");
    if (authBtn) authBtn.textContent = `${name.split(" ")[0]} (Citizen)`;
    
    showScreen("services");
  }, 900);
};

// 7. SCREEN 4: TRACK APPLICATION PAGE
function setupTrackingView() {
  const trackInput = document.getElementById("track-app-id");
  const trackBtn = document.getElementById("btn-track-submit");
  const demoChips = document.querySelectorAll(".demo-chip");

  function performSearch() {
    const rawId = trackInput.value.trim().toUpperCase();
    if (!rawId) {
      showToast("Please enter an Application Tracking ID.", "error");
      return;
    }

    const record = TRACKING_DATABASE[rawId];
    if (record) {
      displayTrackingResult(rawId, record);
      showToast(`Tracking details loaded for ${rawId}`, "info");
    } else {
      // Generate a dynamic realistic record for any custom ID
      const dynamicRecord = {
        applicant: "Maharashtra Citizen",
        service: "Public Certificate Request",
        appliedDate: "10 Oct 2026",
        district: "Maharashtra",
        authority: "Designated Public Officer",
        status: "review",
        statusLabel: "Under Review",
        steps: [
          { name: "Step 1: Application Submitted", time: "10 Oct 2026", note: "Application validated", state: "completed" },
          { name: "Step 2: Departmental Review", time: "In Progress", note: "Verification ongoing", state: "active" },
          { name: "Step 3: Decision Made", time: "Pending", note: "Awaiting approval", state: "pending" },
          { name: "Step 4: Certificate Ready", time: "Pending", note: "QR Stamping", state: "pending" }
        ],
        canDownload: false
      };
      displayTrackingResult(rawId, dynamicRecord);
      showToast(`Tracking status retrieved for ${rawId}`, "info");
    }
  }

  if (trackBtn) trackBtn.addEventListener("click", performSearch);
  if (trackInput) {
    trackInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") performSearch();
    });
  }

  demoChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const id = chip.dataset.id;
      if (trackInput) trackInput.value = id;
      performSearch();
    });
  });

  // Action buttons
  const dlBtn = document.getElementById("btn-track-download-cert");
  const printBtn = document.getElementById("btn-track-print-receipt");

  if (dlBtn) {
    dlBtn.addEventListener("click", () => {
      showToast("Downloading Digitally Signed Certificate (PDF with QR code)...", "success");
    });
  }
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

function displayTrackingResult(id, data) {
  const resultPanel = document.getElementById("track-result-panel");
  if (!resultPanel) return;
  resultPanel.style.display = "block";

  document.getElementById("res-app-id").textContent = `Application #${id}`;
  document.getElementById("res-service-name").textContent = data.service;
  document.getElementById("res-applicant-name").textContent = data.applicant;
  document.getElementById("res-app-date").textContent = data.appliedDate;
  document.getElementById("res-district").textContent = data.district;
  document.getElementById("res-authority").textContent = data.authority;

  // Status Badge
  const statusBadge = document.getElementById("res-status-badge");
  statusBadge.textContent = data.statusLabel;
  statusBadge.className = `status-pill status-${data.status}`;

  // Render Stepper Nodes
  const stepperContainer = document.getElementById("track-stepper-container");
  if (stepperContainer && data.steps) {
    stepperContainer.innerHTML = data.steps.map((st, idx) => {
      let icon = idx + 1;
      if (st.state === "completed") {
        icon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      } else if (st.state === "failed") {
        icon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      } else if (st.state === "active") {
        icon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
      }

      const connector = idx < data.steps.length - 1 ? `<div class="step-connector"></div>` : "";

      return `
        <div class="stepper-step ${st.state}">
          <div class="step-circle">${icon}</div>
          ${connector}
          <div class="step-label-group">
            <span class="step-name">${st.name}</span>
            <span class="step-timestamp">${st.time}</span>
            <span class="step-note">${st.note}</span>
          </div>
        </div>
      `;
    }).join("");
  }

  // Toggle download button availability
  const dlBtn = document.getElementById("btn-track-download-cert");
  if (dlBtn) {
    dlBtn.style.display = data.canDownload ? "inline-flex" : "none";
  }
}

// 8. SCREEN 5: APPLICATION FORM (3-STEP WIZARD)
window.initiateApply = function(serviceId) {
  const service = SERVICES_DATA.find(s => s.id === serviceId) || SERVICES_DATA[0];
  selectedServiceForApply = service;

  // Update breadcrumb and headings
  const bcService = document.getElementById("apply-breadcrumb-service");
  const heading = document.getElementById("apply-page-heading");
  const deptTag = document.getElementById("form-dept-tag");
  const revService = document.getElementById("rev-service-val");

  if (bcService) bcService.textContent = service.title.split("(")[0].trim();
  if (heading) heading.textContent = `Application for ${service.title.split("(")[0].trim()}`;
  if (deptTag) deptTag.textContent = `${service.departmentName} (महसूल व सेवा)`;
  if (revService) revService.textContent = service.title;

  goToWizardStep(1);
  showScreen("apply");
};

function setupApplicationWizard() {
  const next1 = document.getElementById("btn-wizard-next-1");
  const prev2 = document.getElementById("btn-wizard-prev-2");
  const next2 = document.getElementById("btn-wizard-next-2");
  const prev3 = document.getElementById("btn-wizard-prev-3");
  const submitBtn = document.getElementById("btn-wizard-submit");

  if (next1) {
    next1.addEventListener("click", () => {
      // Validate Step 1
      const name = document.getElementById("app-fullname").value.trim();
      const mobile = document.getElementById("app-mobile").value.trim();
      if (!name || !mobile) {
        showToast("Please complete required personal details.", "error");
        return;
      }
      // Update summary for step 3
      syncReviewSummary();
      goToWizardStep(2);
    });
  }

  if (prev2) {
    prev2.addEventListener("click", () => goToWizardStep(1));
  }

  if (next2) {
    next2.addEventListener("click", () => {
      syncReviewSummary();
      goToWizardStep(3);
    });
  }

  if (prev3) {
    prev3.addEventListener("click", () => goToWizardStep(2));
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", handleApplicationSubmit);
  }

  // Setup drag and drop / upload interactions
  for (let i = 1; i <= 4; i++) {
    setupUploadBox(i);
  }

  // DigiLocker simulation
  document.querySelectorAll(".digilocker-fetch-link").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      showToast("Aadhaar XML & Photo successfully retrieved from DigiLocker!", "success");
    });
  });

  // Confirmation actions
  const dlReceipt = document.getElementById("btn-download-receipt");
  const trackNowFromConfirm = document.getElementById("btn-confirm-track-app");

  if (dlReceipt) {
    dlReceipt.addEventListener("click", () => {
      showToast("Generating official Maharashtra RTS Payment & Acknowledgement Slip (PDF)...", "success");
    });
  }

  if (trackNowFromConfirm) {
    trackNowFromConfirm.addEventListener("click", () => {
      const generatedId = document.getElementById("generated-app-id").textContent;
      showScreen("track");
      const trackInput = document.getElementById("track-app-id");
      if (trackInput) {
        trackInput.value = generatedId;
        const trackBtn = document.getElementById("btn-track-submit");
        if (trackBtn) trackBtn.click();
      }
    });
  }
}

window.goToWizardStep = function(step) {
  currentWizardStep = step;

  // Toggle panes
  const panes = [
    document.getElementById("pane-step-1"),
    document.getElementById("pane-step-2"),
    document.getElementById("pane-step-3"),
    document.getElementById("pane-confirmation")
  ];

  panes.forEach((pane, idx) => {
    if (pane) {
      if (idx + 1 === step) {
        pane.style.display = "block";
      } else {
        pane.style.display = "none";
      }
    }
  });

  // Update indicators
  for (let i = 1; i <= 3; i++) {
    const indicator = document.getElementById(`wizard-step-indicator-${i}`);
    if (indicator) {
      indicator.classList.remove("active", "completed");
      if (i < step) {
        indicator.classList.add("completed");
      } else if (i === step) {
        indicator.classList.add("active");
      }
    }
  }

  const line1 = document.getElementById("wizard-line-1");
  const line2 = document.getElementById("wizard-line-2");
  if (line1) line1.classList.toggle("active", step >= 2);
  if (line2) line2.classList.toggle("active", step >= 3);

  window.scrollTo({ top: 120, behavior: "smooth" });
};

function syncReviewSummary() {
  const name = document.getElementById("app-fullname").value;
  const dob = document.getElementById("app-dob").value;
  const mobile = document.getElementById("app-mobile").value;
  const email = document.getElementById("app-email").value;
  const district = document.getElementById("app-district").value;
  const taluka = document.getElementById("app-taluka").value;

  const revName = document.getElementById("rev-name-val");
  const revDob = document.getElementById("rev-dob-val");
  const revContact = document.getElementById("rev-contact-val");
  const revJuris = document.getElementById("rev-jurisdiction-val");

  if (revName) revName.textContent = name || "Rahul Ramesh Patil";
  if (revDob) revDob.textContent = `${dob || '14 May 1995'} (Male)`;
  if (revContact) revContact.textContent = `${mobile || '9823012345'} / ${email || 'citizen@maha.gov.in'}`;
  if (revJuris) revJuris.textContent = `${district} District, ${taluka} Taluka`;
}

function handleApplicationSubmit() {
  const decl = document.getElementById("self-declaration");
  if (decl && !decl.checked) {
    showToast("Please accept the legal self-declaration to proceed.", "error");
    return;
  }

  const submitBtn = document.getElementById("btn-wizard-submit");
  const originalText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>Processing PayGov Payment & Submitting...</span>`;

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;

    // Generate unique Tracking ID
    const randomSuffix = Math.floor(10000000 + Math.random() * 90000000);
    const newId = `MH2026${randomSuffix}`;
    const idDisplay = document.getElementById("generated-app-id");
    if (idDisplay) idDisplay.textContent = newId;

    // Add to local tracking database
    TRACKING_DATABASE[newId] = {
      applicant: document.getElementById("app-fullname").value || "Rahul Ramesh Patil",
      service: selectedServiceForApply.title,
      appliedDate: "12 Oct 2026",
      district: `${document.getElementById("app-district").value}, ${document.getElementById("app-taluka").value}`,
      authority: `Tahsildar Office, ${document.getElementById("app-taluka").value}`,
      status: "pending",
      statusLabel: "Pending",
      steps: [
        { name: "Step 1: Application Submitted", time: "12 Oct 2026, Just Now", note: "Fee ₹23.60 paid via PayGov", state: "completed" },
        { name: "Step 2: Departmental Review", time: "Queued", note: "Desk Scrutiny in queue", state: "pending" },
        { name: "Step 3: Decision Made", time: "Pending", note: "Pending", state: "pending" },
        { name: "Step 4: Certificate Ready", time: "Pending", note: "Pending", state: "pending" }
      ],
      canDownload: false
    };

    goToWizardStep(4);
    showToast(`Application ${newId} submitted successfully!`, "success");
  }, 1200);
}

function setupUploadBox(index) {
  const dropzone = document.getElementById(`dropzone-${index}`);
  const fileInput = document.getElementById(`file-input-${index}`);
  const metaBox = document.getElementById(`file-meta-${index}`);
  const badge = document.getElementById(`badge-file-${index}`);

  if (!dropzone || !fileInput) return;

  dropzone.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const nameElem = document.getElementById(`name-file-${index}`);
      if (nameElem) nameElem.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
      if (metaBox) metaBox.style.display = "flex";
      if (badge) {
        badge.textContent = "Uploaded";
        badge.style.background = "#DCFCE7";
        badge.style.color = "#16A34A";
      }
      showToast(`Uploaded: ${file.name}`, "info");
    }
  });

  // Drag and drop events
  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.style.borderColor = "#F97316";
      dropzone.style.background = "#FFF7ED";
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.style.borderColor = "";
      dropzone.style.background = "";
    });
  });

  dropzone.addEventListener("drop", (e) => {
    if (e.dataTransfer.files.length > 0) {
      fileInput.files = e.dataTransfer.files;
      const file = e.dataTransfer.files[0];
      const nameElem = document.getElementById(`name-file-${index}`);
      if (nameElem) nameElem.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
      if (metaBox) metaBox.style.display = "flex";
      showToast(`Uploaded: ${file.name}`, "info");
    }
  });
}

window.clearUpload = function(index) {
  const metaBox = document.getElementById(`file-meta-${index}`);
  const fileInput = document.getElementById(`file-input-${index}`);
  const badge = document.getElementById(`badge-file-${index}`);
  if (metaBox) metaBox.style.display = "none";
  if (fileInput) fileInput.value = "";
  if (badge) {
    badge.textContent = "Pending";
    badge.style.background = "#FEF3C7";
    badge.style.color = "#B45309";
  }
};

// 9. SCREEN 6: HELP & FAQ ACCORDION
function setupFaqAccordion() {
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains("active");

      // Optional: close other accordions within the same group
      const parentGroup = item.closest(".accordion-group");
      if (parentGroup) {
        parentGroup.querySelectorAll(".accordion-item").forEach(other => {
          if (other !== item) other.classList.remove("active");
        });
      }

      item.classList.toggle("active", !isOpen);
      header.setAttribute("aria-expanded", !isOpen);
    });
  });

  // FAQ search input
  const faqSearch = document.getElementById("faq-search-input");
  if (faqSearch) {
    faqSearch.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      const items = document.querySelectorAll(".accordion-item");

      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = "block";
          if (query.length > 2) item.classList.add("active");
        } else {
          item.style.display = "none";
        }
      });
    });
  }
}

// 10. BILINGUAL TRANSLATION DICTIONARY & ACCESSIBILITY CONTROLS
const TRANSLATIONS = {
  en: {
    govBadge: "Government of Maharashtra | महाराष्ट्र शासन",
    rtsTag: "Right to Public Services (RTS) Portal",
    helpline: "Toll Free: 1800-120-8040",
    navHome: "Home",
    navServices: "Services",
    navTrack: "Track Application",
    navFaq: "Help & FAQ",
    navContact: "Contact",
    authLogin: "Citizen Login",
    heroHeading: "Find Government Services Easily",
    heroSubheading: "Apply online for certificates and services from the Government of Maharashtra without visiting offices.",
    searchPlaceholder: "Search for any service eg. Income Certificate, Domicile, Caste...",
    searchBtn: "Search Service",
    popularLabel: "Popular Searches:",
    quick1Title: "Apply for Service",
    quick1Desc: "Browse through 150+ citizen services and fill application forms online.",
    quick1Arrow: "Explore Services",
    quick2Title: "Track Application",
    quick2Desc: "Check real-time department scrutiny, review status, and approval dates.",
    quick2Arrow: "Track Status",
    quick3Title: "Download Certificate",
    quick3Desc: "Login to your citizen locker to instantly retrieve digitally signed certificates.",
    quick3Arrow: "Citizen Locker",
    deptKicker: "Catalog of Public Services",
    deptHeading: "Browse by Department",
    deptSubtext: "Select a department or explore the most frequently accessed civic services across Maharashtra.",
    viewAllBtn: "View All 150+ Services",
    allServicesHeading: "All Services",
    allServicesSub: "Access certified public services provided by the Government of Maharashtra under the RTS Act.",
    servicesSearchPlaceholder: "Search service by name, certificate type, or keyword...",
    trackHeading: "Track Your Application",
    trackSub: "Enter your 15-character Maharashtra Government Application Tracking ID to inspect real-time progress.",
    trackBtn: "Track Now",
    helpHeading: "Help & Support",
    helpSub: "Frequently asked questions, application guidance, and official Maharashtra citizen helpline.",
    faqSearchPlaceholder: "Search questions eg. certificate validity, login OTP, DigiLocker...",
    switchLangPrompt: "Language switched to English",
    fontCompact: "Font size set to Compact (A-)",
    fontDefault: "Font size set to Default (A)",
    fontLarge: "Font size set to Large (A+)"
  },
  mr: {
    govBadge: "महाराष्ट्र शासन | Government of Maharashtra",
    rtsTag: "महाराष्ट्र लोकसेवा हक्क (RTS) पोर्टल",
    helpline: "टोल फ्री: १८००-१२०-८०४०",
    navHome: "मुख्यपृष्ठ",
    navServices: "नागरी सेवा",
    navTrack: "स्थिती तपासा",
    navFaq: "मदत व प्रश्न",
    navContact: "संपर्क",
    authLogin: "नागरिक लॉगिन",
    heroHeading: "शासकीय सेवा सहज शोधा",
    heroSubheading: "कार्यालयात न जाता महाराष्ट्र शासनाचे दाखले आणि सेवांसाठी घरबसल्या ऑनलाइन अर्ज करा.",
    searchPlaceholder: "कोणतीही सेवा शोधा उदा. उत्पन्न दाखला, अधिवास, जात प्रमाणपत्र...",
    searchBtn: "सेवा शोधा",
    popularLabel: "लोकप्रिय शोध:",
    quick1Title: "सेवेसाठी अर्ज करा",
    quick1Desc: "१५० हून अधिक नागरी सेवा पहा आणि थेट ऑनलाइन अर्ज भरा.",
    quick1Arrow: "सेवा पहा",
    quick2Title: "अर्जाची स्थिती तपासा",
    quick2Desc: "विभागीय छाननी, पुनरावलोकन स्थिती आणि मंजुरी तारीख त्वरित तपासा.",
    quick2Arrow: "स्थिती पहा",
    quick3Title: "प्रमाणपत्र डाउनलोड करा",
    quick3Desc: "डिजिटली स्वाक्षरी केलेले अधिकृत प्रमाणपत्र डाउनलोड करण्यासाठी लॉकर उघडा.",
    quick3Arrow: "नागरिक लॉकर",
    deptKicker: "लोकसेवा सूची",
    deptHeading: "विभागानुसार सेवा शोधा",
    deptSubtext: "विभागाची निवड करा किंवा महाराष्ट्रातील सर्वाधिक वापरल्या जाणाऱ्या सेवा तपासा.",
    viewAllBtn: "सर्व १५०+ सेवा पहा",
    allServicesHeading: "सर्व शासकीय सेवा",
    allServicesSub: "महाराष्ट्र लोकसेवा हक्क अधिनियमांतर्गत अधिकृत सार्वजनिक सेवांचा लाभ घ्या.",
    servicesSearchPlaceholder: "प्रमाणपत्राचे नाव किंवा कीवर्डद्वारे शोधा...",
    trackHeading: "आपल्या अर्जाचा मागोवा घ्या",
    trackSub: "रिअल-टाइम प्रगती पाहण्यासाठी आपला १५-अंकी महाराष्ट्र शासन अर्ज आयडी प्रविष्ट करा.",
    trackBtn: "आता तपासा",
    helpHeading: "मदत आणि सहाय्य कक्ष",
    helpSub: "वारंवार विचारले जाणारे प्रश्न, अर्ज प्रक्रिया मार्गदर्शन आणि अधिकृत हेल्पलाइन.",
    faqSearchPlaceholder: "प्रश्न शोधा उदा. प्रमाणपत्राची वैधता, ओटीपी, डिजीलॉकर...",
    switchLangPrompt: "भाषा मराठीमध्ये बदलली आहे",
    fontCompact: "फॉन्ट आकार लहान केला (A-)",
    fontDefault: "फॉन्ट आकार पूर्वनिर्धारित केला (A)",
    fontLarge: "फॉन्ट आकार मोठा केला (A+)"
  }
};

let currentAppLang = "en";

function applyLanguage(lang) {
  currentAppLang = lang;
  const t = TRANSLATIONS[lang];
  if (!t) return;

  // Header and Navigation
  const navHome = document.getElementById("nav-home");
  const navServices = document.getElementById("nav-services");
  const navTrack = document.getElementById("nav-track");
  const navFaq = document.getElementById("nav-faq");
  const navContact = document.getElementById("nav-contact");
  const authLabel = document.getElementById("header-auth-label");

  if (navHome) navHome.textContent = t.navHome;
  if (navServices) navServices.textContent = t.navServices;
  if (navTrack) navTrack.textContent = t.navTrack;
  if (navFaq) navFaq.textContent = t.navFaq;
  if (navContact) navContact.textContent = t.navContact;
  if (authLabel && !authLabel.textContent.includes("Logged")) authLabel.textContent = t.authLogin;

  // Hero Section
  const heroHeading = document.querySelector(".hero-heading");
  const heroSub = document.querySelector(".hero-subheading");
  const homeSearchInput = document.getElementById("home-search-input");
  const homeSearchBtnText = document.querySelector("#home-search-btn span");
  const popLabel = document.querySelector(".popular-tag-label");

  if (heroHeading) heroHeading.textContent = t.heroHeading;
  if (heroSub) heroSub.textContent = t.heroSubheading;
  if (homeSearchInput) homeSearchInput.placeholder = t.searchPlaceholder;
  if (homeSearchBtnText) homeSearchBtnText.textContent = t.searchBtn;
  if (popLabel) popLabel.textContent = t.popularLabel;

  // Quick action cards
  const qCards = document.querySelectorAll(".quick-card");
  if (qCards.length >= 3) {
    qCards[0].querySelector(".quick-card-title").textContent = t.quick1Title;
    qCards[0].querySelector(".quick-card-desc").textContent = t.quick1Desc;
    qCards[1].querySelector(".quick-card-title").textContent = t.quick2Title;
    qCards[1].querySelector(".quick-card-desc").textContent = t.quick2Desc;
    qCards[2].querySelector(".quick-card-title").textContent = t.quick3Title;
    qCards[2].querySelector(".quick-card-desc").textContent = t.quick3Desc;
  }

  // Department Section
  const kicker = document.querySelector(".section-kicker");
  const deptHeading = document.querySelector(".section-heading");
  const deptSub = document.querySelector(".section-subtext");
  const viewAllBtn = document.querySelector(".btn-link-action");

  if (kicker) kicker.textContent = t.deptKicker;
  if (deptHeading) deptHeading.textContent = t.deptHeading;
  if (deptSub) deptSub.textContent = t.deptSubtext;
  if (viewAllBtn) {
    const icon = viewAllBtn.querySelector("svg");
    viewAllBtn.innerHTML = `${t.viewAllBtn} `;
    if (icon) viewAllBtn.appendChild(icon);
  }

  // Services Catalog Screen
  const servicesPageTitle = document.querySelector("#screen-services .page-title");
  const servicesPageSub = document.querySelector("#screen-services .page-subtitle");
  const servSearchInput = document.getElementById("services-search-input");

  if (servicesPageTitle) servicesPageTitle.textContent = t.allServicesHeading;
  if (servicesPageSub) servicesPageSub.textContent = t.allServicesSub;
  if (servSearchInput) servSearchInput.placeholder = t.servicesSearchPlaceholder;

  // Track Application Screen
  const trackTitle = document.querySelector("#screen-track .page-title");
  const trackSub = document.querySelector("#screen-track .page-subtitle");
  const trackBtnSpan = document.querySelector("#btn-track-submit span");

  if (trackTitle) trackTitle.textContent = t.trackHeading;
  if (trackSub) trackSub.textContent = t.trackSub;
  if (trackBtnSpan) trackBtnSpan.textContent = t.trackBtn;

  // Help & FAQ Screen
  const faqTitle = document.querySelector("#screen-faq .page-title");
  const faqSub = document.querySelector("#screen-faq .page-subtitle");
  const faqSearchInput = document.getElementById("faq-search-input");

  if (faqTitle) faqTitle.textContent = t.helpHeading;
  if (faqSub) faqSub.textContent = t.helpSub;
  if (faqSearchInput) faqSearchInput.placeholder = t.faqSearchPlaceholder;

  // Language Button Tag Label
  const langDisplay = document.getElementById("current-lang");
  if (langDisplay) {
    langDisplay.textContent = lang === "en" ? "मराठी" : "English";
  }
}

function setupAccessibilityControls() {
  const decreaseBtn = document.getElementById("decrease-font");
  const normalBtn = document.getElementById("normal-font");
  const increaseBtn = document.getElementById("increase-font");
  const langToggle = document.getElementById("lang-toggle");
  const htmlRoot = document.documentElement;

  function setFontSizeClass(targetClass, activeBtn, toastKey) {
    htmlRoot.classList.remove("font-size-small", "font-size-normal", "font-size-large");
    htmlRoot.classList.add(targetClass);

    [decreaseBtn, normalBtn, increaseBtn].forEach(b => {
      if (b) b.classList.remove("active");
    });
    if (activeBtn) activeBtn.classList.add("active");

    const t = TRANSLATIONS[currentAppLang] || TRANSLATIONS.en;
    showToast(t[toastKey], "info");
  }

  if (decreaseBtn) {
    decreaseBtn.addEventListener("click", () => {
      setFontSizeClass("font-size-small", decreaseBtn, "fontCompact");
    });
  }

  if (normalBtn) {
    normalBtn.addEventListener("click", () => {
      setFontSizeClass("font-size-normal", normalBtn, "fontDefault");
    });
    // Set default active initially
    normalBtn.classList.add("active");
  }

  if (increaseBtn) {
    increaseBtn.addEventListener("click", () => {
      setFontSizeClass("font-size-large", increaseBtn, "fontLarge");
    });
  }

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const nextLang = currentAppLang === "en" ? "mr" : "en";
      applyLanguage(nextLang);
      const t = TRANSLATIONS[nextLang];
      showToast(t.switchLangPrompt, "info");
    });
  }
}

// Toast notification helper
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()" aria-label="Close">&times;</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 250ms ease";
    setTimeout(() => toast.remove(), 250);
  }, 4000);
}

window.showToast = showToast;
