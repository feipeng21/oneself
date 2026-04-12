// 打字机效果组件 - 从le项目迁移
class TypeWriter {
    constructor(containerId, config) {
        this.containerId = containerId;
        this.config = config;
        this.currentStringIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typeSpeed = 150;
        this.deleteSpeed = 100;
        this.pauseTime = 2000;
        this.timeout = null;
        this.init();
    }

    init() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Container with id "${this.containerId}" not found`);
            return;
        }

        // 创建打字机容器
        container.innerHTML = `
            <div class="leleo-typewriter" style="text-align: center;">
                <span class="qm">" </span>
                <span class="msg" id="typewriter-text"></span>
                <span class="qm"> "</span>
                <span class="cursorChar" style="font-size: 26px;color: #ff6b35;">|</span>
            </div>
        `;

        // 添加样式
        this.addStyles();

        // 开始打字效果
        this.type();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .leleo-typewriter .msg, .leleo-typewriter .qm {
                color: #ff6b35;
                letter-spacing: 2px;
                font-family: Arial, sans-serif;
                font-size: 25px;
                font-weight: bold;
                text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
            }
            
            .leleo-typewriter .cursorChar {
                display: inline-block;
                margin-left: 2px;
                animation: blink 1s infinite;
            }
            
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
            
            @media screen and (min-width: 960px) and (max-width: 1200px) {
                .leleo-typewriter .msg, .leleo-typewriter .qm {
                    font-size: 20px;
                }
            }
            
            @media (max-width: 960px) {
                .leleo-typewriter {
                    min-height: 76px;   
                }
                .leleo-typewriter .msg, .leleo-typewriter .qm {
                    font-size: 16px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    type() {
        const textElement = document.getElementById('typewriter-text');
        if (!textElement) return;

        const currentString = this.config.strings[this.currentStringIndex];
        
        if (this.isDeleting) {
            // 删除字符
            textElement.textContent = currentString.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
            
            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentStringIndex = (this.currentStringIndex + 1) % this.config.strings.length;
                this.timeout = setTimeout(() => this.type(), this.pauseTime);
                return;
            }
        } else {
            // 添加字符
            textElement.textContent = currentString.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
            
            if (this.currentCharIndex === currentString.length) {
                this.timeout = setTimeout(() => {
                    this.isDeleting = true;
                    this.type();
                }, this.pauseTime);
                return;
            }
        }

        // 随机化打字速度，模拟真实打字
        const speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        const randomSpeed = speed + Math.random() * 100;
        
        this.timeout = setTimeout(() => this.type(), randomSpeed);
    }

    destroy() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
}

// 导出类
window.TypeWriter = TypeWriter;
