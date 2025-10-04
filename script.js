document.addEventListener('DOMContentLoaded', function() {
    
    const loadingScreen = document.getElementById('loadingScreen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.classList.add('loaded');
        
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 2000);
    
    const navLinks = document.querySelectorAll('.nav-center a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            console.log(`Navigating to ${this.textContent}`);
        });
    });

    const reserveButton = document.querySelector('.footer button');
    if (reserveButton) {
        reserveButton.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            showNotification('Service reservation request sent! We\'ll contact you soon.');
        });
    }

    const stars = document.querySelectorAll('.rating .star');
    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            this.style.filter = 'brightness(1.5) contrast(1.2)';
            setTimeout(() => {
                this.style.filter = 'brightness(1.2)';
            }, 300);
            
            console.log(`Rated ${index + 1} stars!`);
            showNotification(`Thank you for rating us ${index + 1} star${index > 0 ? 's' : ''}!`);
        });
    });

    const footerImages = document.querySelectorAll('.footer img');
    footerImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            this.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
            
            showNotification(`Viewing customer showcase ${index + 1}`);
        });
    });

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.shirt img');
        if (parallax) {
            const speed = scrolled * 0.1;
            parallax.style.transform = `translateY(${speed}px) translateY(-10px)`;
        }
    });

    const mainHeading = document.querySelector('.left-content h1');
    if (mainHeading) {
        const text = mainHeading.textContent;
        mainHeading.textContent = '';
        mainHeading.style.opacity = '1';
        
        let index = 0;
        function typeWriter() {
            if (index < text.length) {
                mainHeading.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1500);
    }

    function showNotification(message) {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #333;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            font-size: 14px;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    let mouseX = 0, mouseY = 0;
    let cursorDot = null;

    function createCursorDot() {
        cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        cursorDot.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursorDot);
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (cursorDot) {
            cursorDot.style.left = mouseX - 4 + 'px';
            cursorDot.style.top = mouseY - 4 + 'px';
        }
    });

    createCursorDot();

    console.log('Clean-Pro website is now alive! 🎉');
});