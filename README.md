# Nexus Auth | Zero Bloat UI

**Nexus Auth** is a premium, high-conversion authentication template designed for modern SaaS applications. Built with a "Zero Bloat" philosophy, it combines robust validation logic, micro-interactions, and a compact "no-scroll" layout into a single, lightweight HTML file.

---

## Key Features

* **Compact "No-Scroll" Design:** Optimized to fit perfectly on standard laptop screens without forcing the user to scroll.
* **Dual-View Toggle:** Seamless CSS transitions between Login and Registration views without page reloads.
* **Premium Micro-Interactions:**
    * Button "Lift & Press" physics.
    * Floating background blobs for depth.
    * Animated input focus states.
* **Robust Client-Side Validation:**
    * Real-time email format checking.
    * Visual success/error states (Green checks / Red alerts).
    * "Shake" animation on invalid submission attempts.
* **Password Strength Meter:** Dynamic visual indicator (Weak/Medium/Strong) to encourage secure passwords.
* **Social Auth Grid:** Pre-styled, responsive buttons for Google, Facebook, and LinkedIn using SVG assets.
* **Zero Dependencies:** Built with vanilla HTML/JS and Tailwind CSS (via CDN for instant preview).

---

## Quick Start

You can use this template immediately by opening the file in your browser.

1.  **Download** the `index.html` file.
2.  **Open** it in any modern web browser (Chrome, Edge, Firefox, Safari).
3.  **Customize** the branding to fit your project.

### Integration
To use this in a production environment, simply copy the HTML structure inside the `<body>` tags into your project's view (e.g., React Component, Vue View, or Laravel Blade file).

---

## Customization Guide

All styling is handled via **Tailwind CSS**. We have included a script configuration in the `<head>` that allows you to change the entire color theme in seconds.

### 1. Changing the Brand Color
Locate the `tailwind.config` script in the `<head>` section:
```javascript
colors: {
    brand: {
        50: '#eef7ff',
        500: '#2f88ff', // <--- CHANGE THIS HEX CODE to your primary brand color
        600: '#1a69f5', // <--- Darker shade for hover states
        900: '#163b92', // <--- Darkest shade for the sidebar background
    }
}

2. Changing the Font
The template uses Inter by default. To change it:
Replace the Google Fonts link in the <head>.
Update the fontFamily in the tailwind config:
JavaScript
fontFamily: {
    sans: ['YourFontName', 'sans-serif'],
}

3. Modifying Validation Logic
The validation logic is contained in the <script> tag at the bottom of the body. You can easily adjust the rules inside the validateField function:
JavaScript
//Example: changing password length requirement
else if (input.name === 'password') {
    isValid = input.value.length >= 8; //Changed from 6 to 8
}

File Structure
Plaintext
Nexus-Auth/
│
├── index.html        # The complete template (HTML + CSS + JS)
├── README.md         # Documentation
└── assets/           # (Optional) If you choose to use local images instead of SVGs

Browser Support
Chrome	Firefox	Safari	Edge	Mobile Browsers