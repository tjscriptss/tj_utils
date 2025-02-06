window.addEventListener('message', function(event) {
    const data = event.data;
    
    switch(data.action) {
        case 'showNotification':
            showNotification(data.data);
            break;
        case 'showProgress':
            showProgress(data.data);
            break;
        case 'updateProgress':
            hideProgress();
            break;
        case 'showTextUI':
            showTextUI(data.data);
            break;
        case 'hideTextUI':
            hideTextUI();
            break;
    }
});

// Notifications
function showNotification(data) {
    const wrapper = document.getElementById('notifications-wrapper');
    const notification = document.createElement('div');
    const audio = new Audio('sounds/notification.mp3');
    
    audio.volume = 0.4;
    audio.play();
    
    wrapper.className = `notifications-wrapper position-${data.position || 'top-right'}`;
    
    notification.className = `notification ${data.type}`;
    notification.innerHTML = `
        <i class="fas ${data.icon || getDefaultIcon(data.type)}"></i>
        <div class="notification-content">
            <div class="notification-title">${data.title}</div>
            <div class="notification-description">${data.description}</div>
        </div>
        <div class="notification-progress">
            <div class="notification-progress-fill"></div>
        </div>
    `;
    
    wrapper.appendChild(notification);
    
    const progressFill = notification.querySelector('.notification-progress-fill');
    progressFill.style.animation = `progress ${data.duration || 5000}ms linear forwards`;
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        setTimeout(() => notification.remove(), 400);
    }, data.duration || 5000);
}

function getDefaultIcon(type) {
    switch(type) {
        case 'info': return 'fa-circle-info';
        case 'success': return 'fa-circle-check';
        case 'error': return 'fa-circle-xmark';
        case 'warning': return 'fa-triangle-exclamation';
        default: return 'fa-circle-info';
    }
}

// Progress Bar
let progressTimer = null;

function showProgress(data) {
    if (progressTimer) {
        clearInterval(progressTimer);
        progressTimer = null;
    }

    const container = document.getElementById('progress-container');
    const content = container.querySelector('.progress-content');
    const label = container.querySelector('.progress-label');
    const fill = container.querySelector('.progress-fill');
    const icon = document.createElement('i');
    
    container.className = `progress-container position-${data.position || 'bottom'}`;
    
    if (data.icon) {
        icon.className = `fas ${data.icon} progress-icon`;
        content.insertBefore(icon, label);
    }
    
    label.textContent = data.label;
    fill.style.width = '0%';
    container.classList.remove('hidden');

    const startTime = Date.now();
    const duration = data.duration;

    progressTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        
        fill.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(progressTimer);
            progressTimer = null;
            setTimeout(() => hideProgress(), 200);
        }
    }, 10);
}

function hideProgress() {
    if (progressTimer) {
        clearInterval(progressTimer);
        progressTimer = null;
    }
    const container = document.getElementById('progress-container');
    container.classList.add('hidden');
    
    const icon = container.querySelector('.progress-icon');
    if (icon) icon.remove();
}

// TextUI
function showTextUI(data) {
    const container = document.getElementById('textui-container');
    const icon = container.querySelector('.textui-icon');
    const title = container.querySelector('.textui-title');
    const description = container.querySelector('.textui-description');
    
    container.className = `textui-container position-${data.position || 'middle-right'}`;
    
    void container.offsetWidth;
    
    icon.className = `textui-icon fas ${data.icon || 'fa-circle-info'}`;
    title.textContent = data.title || '';
    description.textContent = data.description;
    container.classList.remove('hidden');
}

function hideTextUI() {
    const container = document.getElementById('textui-container');
    container.classList.add('hidden');
}