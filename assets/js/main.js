//------------------Icons Configuration------------------
//HTML strings for SVG icons
const icons = {
    check: `<svg class="w-4 h-4 text-success animate-[fadeInUp_0.3s_ease]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`,
    alert: `<svg class="w-4 h-4 text-error animate-[shake_0.5s_ease]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
};

//------------------Core Validation Logic------------------
//Checks input validity based on attribute
function validateField(input) {
    const group = input.closest('.input-group');
    const errorMsg = group.querySelector('.error-msg');
    const iconContainer = group.querySelector('.icon-container');
    
    const defaultIcon = iconContainer.querySelector('.default-icon')?.outerHTML || iconContainer.innerHTML;
    if(!input.dataset.defaultIcon) input.dataset.defaultIcon = defaultIcon;

    let isValid = false;

    if (input.name === 'email') isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    else if (input.name === 'password') isValid = input.value.length >= 6;
    else if (input.name === 'fullname') isValid = input.value.trim().length > 0;

    //Apply visual states based on result
    if (!isValid && input.value.length > 0) applyErrorState(input, group, iconContainer, errorMsg);
    else if (isValid) applySuccessState(input, group, iconContainer, errorMsg);
    else resetField(input);

    return isValid;
}

//------------------Visual State Helpers------------------

//Shows red border, error text, and alert icon
function applyErrorState(input, group, iconContainer, errorMsg) {
    input.classList.remove('border-slate-200', 'focus:border-brand-500', 'focus:ring-brand-100', 'border-success', 'bg-green-50');
    input.classList.add('border-error', 'text-error', 'focus:border-error', 'focus:ring-error/10', 'bg-red-50');
    iconContainer.innerHTML = icons.alert;
    iconContainer.classList.remove('text-slate-400', 'text-success');
    iconContainer.classList.add('text-error');
    if(errorMsg) errorMsg.classList.remove('hidden');
}

//Shows green border and checkmark icon
function applySuccessState(input, group, iconContainer, errorMsg) {
    input.classList.remove('border-slate-200', 'focus:border-brand-500', 'focus:ring-brand-100', 'border-error', 'text-error', 'focus:border-error', 'focus:ring-error/10', 'bg-red-50');
    input.classList.add('border-success', 'text-success', 'bg-green-50');
    iconContainer.innerHTML = icons.check;
    iconContainer.classList.remove('text-slate-400', 'text-error');
    iconContainer.classList.add('text-success');
    if(errorMsg) errorMsg.classList.add('hidden');
}

//Resets input to default grey state
function resetField(input) {
    const group = input.closest('.input-group');
    const errorMsg = group.querySelector('.error-msg');
    const iconContainer = group.querySelector('.icon-container');

    input.classList.remove('border-error', 'text-error', 'focus:border-error', 'focus:ring-error/10', 'bg-red-50', 'border-success', 'text-success', 'bg-green-50');
    input.classList.add('border-slate-200', 'focus:border-brand-500', 'focus:ring-brand-100', 'text-slate-700');
    
    if(input.dataset.defaultIcon) iconContainer.innerHTML = input.dataset.defaultIcon;
    iconContainer.classList.remove('text-error', 'text-success');
    iconContainer.classList.add('text-slate-400');
    if(errorMsg) errorMsg.classList.add('hidden');
}

//------------------Password Strength Meter------------------
//Updates the progress bar color and width
function checkStrength(password) {
    const bar = document.getElementById('strengthBar');
    const text = document.getElementById('strengthText');
    let strength = 0;
    
    // Simple point system
    if (password.length > 5) strength++;
    if (password.length > 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    // Update UI based on score
    if (strength <= 2) {
        bar.style.width = '30%';
        bar.className = 'h-full bg-error strength-bar';
        text.innerText = 'Weak';
        text.className = 'text-[10px] text-error mt-1 font-semibold';
    } else if (strength <= 4) {
        bar.style.width = '70%';
        bar.className = 'h-full bg-yellow-500 strength-bar';
        text.innerText = 'Medium';
        text.className = 'text-[10px] text-yellow-600 mt-1 font-semibold';
    } else {
        bar.style.width = '100%';
        bar.className = 'h-full bg-success strength-bar';
        text.innerText = 'Strong';
        text.className = 'text-[10px] text-success mt-1 font-semibold';
    }
}

//------------------Form Switching------------------
//Toggles between Login and Register views
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const animationClass = 'animate-fade-in-up';

    document.querySelectorAll('input').forEach(input => resetField(input));

    if (loginForm.classList.contains('hidden-form')) {
        //Login
        registerForm.classList.add('hidden-form');
        loginForm.classList.remove('hidden-form');
        loginForm.classList.remove(animationClass);
        void loginForm.offsetWidth; // Trigger reflow to restart animation
        loginForm.classList.add(animationClass);
    } else {
        //Register
        loginForm.classList.add('hidden-form');
        registerForm.classList.remove('hidden-form');
        registerForm.classList.remove(animationClass);
        void registerForm.offsetWidth;
        registerForm.classList.add(animationClass);
    }
}

//------------------Submit Handlers------------------
function handleLogin(e) {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input');
    let allValid = true;
    
    //Check all fields
    inputs.forEach(input => { if (!validateField(input)) allValid = false; });
    const btn = e.target.querySelector('button[type="submit"]');

    if (!allValid) {
        //Shake form on error
        e.target.classList.add('animate-shake');
        setTimeout(() => e.target.classList.remove('animate-shake'), 500);
    } else {
        //Show loading spinner and simulate API call
        const originalText = btn.innerHTML;
        btn.innerHTML = `<svg class="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`;
        setTimeout(() => { alert("Login Successful"); btn.innerHTML = originalText; }, 800);
    }
}

function handleRegister(e) {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input');
    let allValid = true;
    
    inputs.forEach(input => { if (!validateField(input)) allValid = false; });
    const btn = e.target.querySelector('button[type="submit"]');

    if (!allValid) {
        e.target.classList.add('animate-shake');
        setTimeout(() => e.target.classList.remove('animate-shake'), 500);
    } else {
            const originalText = btn.innerHTML;
            btn.innerHTML = `<svg class="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`;
            setTimeout(() => { alert("Registration Successful"); btn.innerHTML = originalText; }, 800);
    }
}