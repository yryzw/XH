// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '1rem 0';
        }
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 移动端汉堡菜单切换
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        // 切换菜单显示
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // 防止页面滚动
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // 点击菜单项后关闭菜单
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // 点击菜单外部区域关闭菜单
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = navToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // 窗口大小改变时重置菜单状态
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // 图片懒加载
    const lazyLoadImages = function() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    };
    
    lazyLoadImages();

    // 滚动动画
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.overview-item, .feature-item, .facility-item');
        
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            elementObserver.observe(el);
        });
    };
    
    animateOnScroll();

    // 视频点击事件
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach(item => {
        item.addEventListener('click', function() {
            // 这里可以添加跳转到抖音视频的逻辑
            console.log('视频被点击，可以在这里添加跳转逻辑');
            // 例如：window.open('douyin-url', '_blank');
        });
    });

    // 微信公众号二维码显示
    const wechatLink = document.querySelector('.wechat-link');
    if (wechatLink) {
        wechatLink.addEventListener('click', function(e) {
            e.preventDefault();
            // 这里可以添加显示微信公众号二维码的逻辑
            alert('请扫描网站下方的微信公众号二维码关注我们！');
        });
    }

    // 表单验证（如果存在表单）
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            let isValid = true;
            
            // 简单的表单验证
            form.querySelectorAll('input[required], textarea[required]').forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                    
                    // 显示错误消息
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = '此字段为必填项';
                    errorMsg.style.color = 'red';
                    errorMsg.style.fontSize = '0.8rem';
                    errorMsg.style.marginTop = '0.2rem';
                    
                    // 移除旧的错误消息
                    const oldError = field.parentNode.querySelector('.error-message');
                    if (oldError) {
                        oldError.remove();
                    }
                    
                    field.parentNode.appendChild(errorMsg);
                } else {
                    field.style.borderColor = '';
                    const oldError = field.parentNode.querySelector('.error-message');
                    if (oldError) {
                        oldError.remove();
                    }
                }
            });
            
            if (isValid) {
                // 这里可以添加表单提交逻辑
                console.log('表单验证通过，可以提交');
                // 例如：使用 AJAX 提交表单
                form.reset();
                alert('感谢您的留言，我们会尽快与您联系！');
            }
        });
    });

    // 返回顶部按钮
    const createBackToTopButton = function() {
        const button = document.createElement('button');
        button.className = 'back-to-top';
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        
        const style = document.createElement('style');
        style.textContent = `
            .back-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: #4CAF50;
                color: white;
                border: none;
                cursor: pointer;
                display: none;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                transition: all 0.3s ease;
                z-index: 1000;
            }
            
            .back-to-top:hover {
                background-color: #45a049;
                transform: translateY(-3px);
            }
            
            .back-to-top.show {
                display: flex;
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(button);
        
        // 显示/隐藏按钮
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                button.classList.add('show');
            } else {
                button.classList.remove('show');
            }
        });
        
        // 点击返回顶部
        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    createBackToTopButton();

    // 页面加载动画
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
});

// 工具函数
const utils = {
    // 防抖函数
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },
    
    // 节流函数
    throttle: function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // 格式化日期
    formatDate: function(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('zh-CN', options);
    }
};

// 联系我们页面功能
document.addEventListener('DOMContentLoaded', function() {
    // FAQ展开/收起功能
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                // 关闭其他FAQ项
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // 切换当前FAQ项
                item.classList.toggle('active');
            });
        }
    });

    // 联系表单提交处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const phone = formData.get('phone').trim();
            const email = formData.get('email').trim();
            const subject = formData.get('subject');
            const message = formData.get('message').trim();
            
            // 验证表单
            let isValid = true;
            let errorMessage = '';
            
            if (!name) {
                isValid = false;
                errorMessage += '姓名不能为空\\n';
            }
            
            if (!phone) {
                isValid = false;
                errorMessage += '电话不能为空\\n';
            } else if (!/^1[3-9]\\d{9}$/.test(phone)) {
                isValid = false;
                errorMessage += '请输入有效的手机号码\\n';
            }
            
            if (email && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
                isValid = false;
                errorMessage += '请输入有效的邮箱地址\\n';
            }
            
            if (!message) {
                isValid = false;
                errorMessage += '留言内容不能为空';
            }
            
            if (!isValid) {
                alert('请检查以下问题：\\n' + errorMessage);
                return;
            }
            
            // 模拟表单提交
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = '提交中...';
            submitButton.disabled = true;
            
            // 模拟异步提交
            setTimeout(() => {
                alert('感谢您的留言！我们会尽快与您联系。');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // 社交媒体链接处理
    const wechatLink = document.querySelector('.wechat-link');
    const douyinLink = document.querySelector('.douyin-link');
    const socialIcons = document.querySelectorAll('.social-icon');
    
    // 微信公众号链接
    if (wechatLink) {
        wechatLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('请扫描网站下方的微信公众号二维码关注我们！');
        });
    }
    
    // 抖音链接
    if (douyinLink) {
        douyinLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('请在抖音搜索"兴禾生态农场"关注我们！');
        });
    }
    
    // 社交图标链接
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            if (icon.classList.contains('wechat')) {
                alert('请扫描网站下方的微信公众号二维码关注我们！');
            } else if (icon.classList.contains('douyin')) {
                alert('请在抖音搜索"兴禾生态农场"关注我们！');
            }
        });
    });

    // 地图点击处理
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', function() {
            alert('地图功能正在开发中，请联系我们获取详细地址信息。');
        });
    }

    // 表单输入实时验证
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            const value = this.value;
            if (value && !/^1[3-9]\\d{0,9}$/.test(value)) {
                this.setCustomValidity('请输入有效的手机号码');
            } else {
                this.setCustomValidity('');
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const value = this.value;
            if (value && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]*$/.test(value)) {
                this.setCustomValidity('请输入有效的邮箱地址');
            } else {
                this.setCustomValidity('');
            }
        });
    }

    // 平滑滚动到联系表单（如果从其他页面跳转）
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('contact') === 'true') {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            setTimeout(() => {
                contactForm.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 500);
        }
    }
}

// 抖音视频展示功能增强
const videoItems = document.querySelectorAll('.video-item');
const douyinLink = document.querySelector('.douyin-link');

// 视频点击事件
videoItems.forEach((item, index) => {
    item.addEventListener('click', function() {
        // 模拟打开抖音视频
        const videoTitles = ['农场日常', '佛手种植', '收获季节'];
        const videoDescriptions = [
            '了解兴禾生态农场的日常工作和管理',
            '观看佛手种植的专业技术和管理方法',
            '体验佛手收获的喜悦和成果展示'
        ];
        
        const modal = createVideoModal(videoTitles[index], videoDescriptions[index]);
        document.body.appendChild(modal);
        
        // 添加动画效果
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    });
    
    // 添加悬停效果
    item.addEventListener('mouseenter', function() {
        const overlay = this.querySelector('.video-overlay');
        if (overlay) {
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const overlay = this.querySelector('.video-overlay');
        if (overlay) {
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        }
    });
});

// 抖音链接点击事件
if (douyinLink) {
    douyinLink.addEventListener('click', function(e) {
        e.preventDefault();
        showDouyinInfo();
    });
}

// 创建视频模态框
function createVideoModal(title, description) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const content = document.createElement('div');
    content.className = 'video-modal-content';
    content.style.cssText = `
        background-color: white;
        padding: 2rem;
        border-radius: 10px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        position: relative;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
        padding: 0.5rem;
    `;
    
    const logo = document.createElement('div');
    logo.innerHTML = '<i class="fab fa-tiktok"></i>';
    logo.style.cssText = `
        font-size: 3rem;
        color: #FF0050;
        margin-bottom: 1rem;
    `;
    
    const titleEl = document.createElement('h3');
    titleEl.textContent = title;
    titleEl.style.cssText = `
        color: #2c5530;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    `;
    
    const descEl = document.createElement('p');
    descEl.textContent = description;
    descEl.style.cssText = `
        color: #666;
        margin-bottom: 2rem;
        line-height: 1.6;
    `;
    
    const watchBtn = document.createElement('button');
    watchBtn.textContent = '在抖音观看';
    watchBtn.className = 'btn btn-primary';
    watchBtn.style.cssText = `
        background-color: #FF0050;
        border-color: #FF0050;
        margin: 0;
    `;
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = '取消';
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.style.cssText = `
        margin-left: 1rem;
    `;
    
    // 添加事件监听
    closeBtn.addEventListener('click', () => closeModal(modal));
    watchBtn.addEventListener('click', () => {
        closeModal(modal);
        showDouyinInfo();
    });
    cancelBtn.addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // 组装内容
    content.appendChild(closeBtn);
    content.appendChild(logo);
    content.appendChild(titleEl);
    content.appendChild(descEl);
    content.appendChild(watchBtn);
    content.appendChild(cancelBtn);
    modal.appendChild(content);
    
    // 添加动画效果
    setTimeout(() => {
        content.style.transform = 'scale(1)';
    }, 10);
    
    return modal;
}

// 关闭模态框
function closeModal(modal) {
    modal.style.opacity = '0';
    const content = modal.querySelector('.video-modal-content');
    if (content) {
        content.style.transform = 'scale(0.9)';
    }
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
}

// 显示抖音信息
function showDouyinInfo() {
    alert('请在抖音APP中搜索"兴禾生态农场"或扫描我们的抖音二维码关注我们！\\n\\n抖音号：XingHeFarm');
}

// 添加视频懒加载功能
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const item = entry.target;
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
            
            videoObserver.unobserve(item);
        }
    });
}, {
    threshold: 0.1
});

videoItems.forEach(item => {
    videoObserver.observe(item);
});
});