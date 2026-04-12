/**
 * 时钟组件 - 从le项目移植
 * 显示实时时间和日期
 */
class Clock {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.options = {
            showSeconds: true,
            showDate: true,
            format24: true,
            updateInterval: 1000,
            ...options
        };
        
        this.formattedTime = '';
        this.formattedDate = '';
        this.intervalId = null;
        
        this.init();
    }
    
    init() {
        if (!this.container) {
            console.error(`Clock container with id "${this.containerId}" not found`);
            return;
        }
        
        this.createClockHTML();
        this.startClock();
    }
    
    createClockHTML() {
        this.container.innerHTML = `
            <div class="clock-widget" style="
                background: rgba(255, 255, 255, 0.15);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border-radius: 25px;
                padding: 25px;
                text-align: center;
                border: 1px solid rgba(255, 255, 255, 0.3);
                box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1);
                max-width: 320px;
                margin: 0 auto;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            ">
                <div class="clock-time" style="
                    font-size: clamp(2.0rem, 6.2vw, 2.8rem);
                    font-weight: 900;
                    color: #fff;
                    margin-bottom: 12px;
                    font-family: 'digitalfont', 'Digital-Play', monospace;
                    text-shadow: 0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.2);
                    letter-spacing: clamp(1px, 0.6vw, 3px);
                    line-height: 1.1;
                    white-space: nowrap;
                    word-break: keep-all;
                ">${this.formattedTime}</div>
                <div class="clock-date" style="
                    font-size: 1.1rem;
                    color: #fff;
                    margin-bottom: 18px;
                    font-weight: 600;
                    text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
                    opacity: 0.9;
                ">${this.formattedDate}</div>
                <div class="clock-turntable">
                    <div class="svg-frame" style="
                        transform: scale(0.8);
                        position: relative;
                        height: 170px;
                        transform-style: preserve-3d;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    ">
                        <svg style="--i:0;--j:0; position: absolute; transition: .5s; z-index: 1; transform-origin: center; width: 344px; height: 344px; fill: none;">
                            <defs>
                                <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#00ffff;stop-opacity:1" />
                                    <stop offset="50%" style="stop-color:#00cccc;stop-opacity:0.8" />
                                    <stop offset="100%" style="stop-color:#00ffff;stop-opacity:1" />
                                </linearGradient>
                                <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#ffff00;stop-opacity:1" />
                                    <stop offset="50%" style="stop-color:#ffcc00;stop-opacity:0.8" />
                                    <stop offset="100%" style="stop-color:#ffff00;stop-opacity:1" />
                                </linearGradient>
                            </defs>
                            <g id="out1">
                                <!-- 最外圈 - 实心圆环带渐变 -->
                                <circle cx="172" cy="172" r="100" fill="none" stroke="url(#cyanGradient)" stroke-width="4" opacity="0.9" filter="drop-shadow(0 0 5px #00ffff)"/>
                                <!-- 外圈 - 点状圆环 -->
                                <circle cx="172" cy="172" r="85" fill="none" stroke="#00ffff" stroke-width="2" stroke-dasharray="2 8" opacity="0.8" filter="drop-shadow(0 0 3px #00ffff)"/>
                                <!-- 中圈 - 实心圆环 -->
                                <circle cx="172" cy="172" r="70" fill="none" stroke="url(#yellowGradient)" stroke-width="3" opacity="0.9" filter="drop-shadow(0 0 4px #ffff00)"/>
                            </g>
                        </svg>
                        <svg style="--i:1;--j:1; position: absolute; transition: .5s; z-index: 0.8; transform-origin: center; width: 344px; height: 344px; fill: none;">
                            <defs>
                                <radialGradient id="radialCyan" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" style="stop-color:#00ffff;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#00ffff;stop-opacity:0.3" />
                                </radialGradient>
                                <pattern id="dots" patternUnits="userSpaceOnUse" width="8" height="8">
                                    <circle cx="4" cy="4" r="1" fill="#ffff00" opacity="0.8"/>
                                </pattern>
                            </defs>
                            <g id="out2" style="animation: rotate16 7s ease-in-out infinite alternate; transform-origin: center;">
                                <!-- 动态青色圆环 - 实心带径向渐变 -->
                                <circle cx="172" cy="172" r="95" fill="none" stroke="url(#radialCyan)" stroke-width="3" opacity="0.8" filter="drop-shadow(0 0 6px #00ffff)"/>
                                <!-- 动态黄色圆环 - 点状图案 -->
                                <circle cx="172" cy="172" r="60" fill="none" stroke="url(#dots)" stroke-width="2" opacity="0.9" filter="drop-shadow(0 0 4px #ffff00)"/>
                                <!-- 动态青色圆环 - 波浪线 -->
                                <path d="M 127 172 A 45 45 0 1 1 127.1 172" fill="none" stroke="#00ffff" stroke-width="2" opacity="0.7" filter="drop-shadow(0 0 3px #00ffff)" stroke-dasharray="8 4"/>
                            </g>
                        </svg>
                        <svg style="--i:0;--j:2; position: absolute; transition: .5s; z-index: 0.6; transform-origin: center; width: 344px; height: 344px; fill: none;">
                            <defs>
                                <pattern id="hexagon" patternUnits="userSpaceOnUse" width="12" height="12">
                                    <polygon points="6,2 10,5 10,9 6,12 2,9 2,5" fill="none" stroke="#00ffff" stroke-width="0.5" opacity="0.6"/>
                                </pattern>
                                <pattern id="triangle" patternUnits="userSpaceOnUse" width="8" height="8">
                                    <polygon points="4,1 7,6 1,6" fill="none" stroke="#ffff00" stroke-width="0.5" opacity="0.7"/>
                                </pattern>
                            </defs>
                            <g id="inner3" style="animation: rotate16 4s ease-in-out infinite alternate; transform-origin: center;">
                                <!-- 内层青色圆环 - 六边形图案 -->
                                <circle cx="172" cy="172" r="55" fill="none" stroke="url(#hexagon)" stroke-width="2" opacity="0.8" filter="drop-shadow(0 0 3px #00ffff)"/>
                                <!-- 内层黄色圆环 - 三角形图案 -->
                                <circle cx="172" cy="172" r="40" fill="none" stroke="url(#triangle)" stroke-width="2" opacity="0.9" filter="drop-shadow(0 0 3px #ffff00)"/>
                                <!-- 内层青色圆环 - 实心圆环 -->
                                <circle cx="172" cy="172" r="30" fill="none" stroke="#00ffff" stroke-width="2" opacity="0.8" filter="drop-shadow(0 0 2px #00ffff)"/>
                            </g>
                        </svg>
                        <svg style="--i:2;--j:4; position: absolute; transition: .5s; z-index: 0.2; transform-origin: center; width: 344px; height: 344px; fill: none;">
                            <defs>
                                <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" style="stop-color:#ffff00;stop-opacity:1" />
                                    <stop offset="70%" style="stop-color:#00ffff;stop-opacity:0.8" />
                                    <stop offset="100%" style="stop-color:#ffffff;stop-opacity:1" />
                                </radialGradient>
                                <pattern id="spiral" patternUnits="userSpaceOnUse" width="16" height="16">
                                    <path d="M8,8 A4,4 0 1,1 8,8.1" fill="none" stroke="#00ffff" stroke-width="0.5" opacity="0.6"/>
                                </pattern>
                            </defs>
                            <!-- 中心区域多层圆环 -->
                            <circle cx="172" cy="172" r="25" fill="none" stroke="url(#spiral)" stroke-width="1.5" opacity="0.8" filter="drop-shadow(0 0 3px #ffff00)"/>
                            <circle cx="172" cy="172" r="18" fill="none" stroke="#00ffff" stroke-width="1" opacity="0.7" filter="drop-shadow(0 0 2px #00ffff)"/>
                            
                            <!-- 中心黄色实心圆 - 带径向渐变 -->
                            <circle cx="172" cy="172" r="12" fill="url(#centerGradient)" opacity="0.9" id="center1" style="animation: rotate16 2s ease-in-out infinite alternate; transform-origin: center;" filter="drop-shadow(0 0 6px #ffff00)"/>
                            
                            <!-- 中心青色小圆 - 带发光效果 -->
                            <circle cx="172" cy="172" r="6" fill="#00ffff" opacity="0.9" id="center" filter="drop-shadow(0 0 4px #00ffff)"/>
                            
                            <!-- 最中心白色亮点 -->
                            <circle cx="172" cy="172" r="3" fill="#ffffff" opacity="1" filter="drop-shadow(0 0 3px #ffffff)"/>
                            
                            <!-- 中心装饰线条 -->
                            <line x1="160" y1="172" x2="184" y2="172" stroke="#ffffff" stroke-width="1" opacity="0.6" filter="drop-shadow(0 0 2px #ffffff)"/>
                            <line x1="172" y1="160" x2="172" y2="184" stroke="#ffffff" stroke-width="1" opacity="0.6" filter="drop-shadow(0 0 2px #ffffff)"/>
                        </svg>
                    </div>
                </div>
            </div>
            <style>
                @keyframes rotate16 {
                    to {
                        transform: rotate(360deg);
                    }
                }
                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.8;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.05);
                    }
                }
                @keyframes glow {
                    0%, 100% {
                        filter: drop-shadow(0 0 3px currentColor);
                    }
                    50% {
                        filter: drop-shadow(0 0 8px currentColor);
                    }
                }
                @keyframes morph {
                    0%, 100% {
                        stroke-dasharray: 8 4;
                    }
                    50% {
                        stroke-dasharray: 4 8;
                    }
                }
                @keyframes scale {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                }
                @keyframes rotate {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
                .clock-widget:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 60px rgba(255, 107, 53, 0.2), 0 0 0 1px rgba(255, 107, 53, 0.2);
                }
                .svg-frame:hover svg {
                    transform: rotate(-80deg) skew(30deg) translateX(calc(45px * var(--i))) translateY(calc(-35px * var(--i)));
                }
                .svg-frame:hover svg #center {
                    transform: rotate(-30deg) translateX(45px) translateY(-3px);
                    animation: pulse 1s ease-in-out infinite;
                }
                .svg-frame:hover svg #center1 {
                    transform: rotate(-30deg) translateX(45px) translateY(-3px);
                    animation: glow 2s ease-in-out infinite;
                }
                .svg-frame:hover circle {
                    animation: glow 3s ease-in-out infinite;
                }
            </style>
        `;
    }
    
    getFormattedTime(currentDate) {
        return currentDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: this.options.showSeconds ? '2-digit' : undefined,
            hour12: !this.options.format24,
        }).replace(/:/g, ' : ');
    }
    
    getFormattedDate(currentDate) {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][currentDate.getDay()];
        
        return `${year} 年 ${month} 月 ${day} 日 ${weekday}`;
    }
    
    updateClock() {
        const now = new Date();
        this.formattedTime = this.getFormattedTime(now);
        this.formattedDate = this.getFormattedDate(now);
        
        const timeElement = this.container.querySelector('.clock-time');
        const dateElement = this.container.querySelector('.clock-date');
        
        if (timeElement) {
            timeElement.textContent = this.formattedTime;
        }
        if (dateElement) {
            dateElement.textContent = this.formattedDate;
        }
    }
    
    startClock() {
        this.updateClock(); // 立即更新一次
        this.intervalId = setInterval(() => {
            this.updateClock();
        }, this.options.updateInterval);
    }
    
    stopClock() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    
    destroy() {
        this.stopClock();
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
    
    // 获取当前时间字符串（供外部使用）
    getCurrentTime() {
        return this.formattedTime;
    }
    
    // 获取当前日期字符串（供外部使用）
    getCurrentDate() {
        return this.formattedDate;
    }
}

// 导出到全局
window.Clock = Clock;
