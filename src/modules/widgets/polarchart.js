// 极坐标图表组件 - 从le项目迁移
class PolarChart {
  constructor(containerId, config) {
    this.containerId = containerId;
    this.config = config;
    this.chart = null;
    this.init();
  }

  init() {
    // 创建canvas元素
    const container = document.getElementById(this.containerId);
    if (!container) {
      console.error(`Container with id "${this.containerId}" not found`);
      return;
    }

    // 清空容器并创建canvas
    container.innerHTML = '<canvas id="polarChartCanvas"></canvas>';

    // 等待Chart.js加载
    if (typeof Chart === "undefined") {
      this.loadChartJS().then(() => {
        this.renderChart();
      });
    } else {
      this.renderChart();
    }
  }

  loadChartJS() {
    return new Promise((resolve, reject) => {
      if (typeof Chart !== "undefined") {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.js";
      script.onload = () => {
        console.log("Chart.js loaded successfully");
        resolve();
      };
      script.onerror = () => {
        console.error("Failed to load Chart.js");
        reject();
      };
      document.head.appendChild(script);
    });
  }

  generateColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      colors.push(`rgba(${r}, ${g}, ${b}, 0.6)`);
    }
    return colors;
  }

  renderChart() {
    const canvas = document.getElementById("polarChartCanvas");
    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }

    const ctx = canvas.getContext("2d");
    const colors = this.generateColors(this.config.skills.length);

    // 销毁现有图表
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: "polarArea",
      data: {
        labels: this.config.skills,
        datasets: [
          {
            label: "技能点",
            data: this.config.skillPoints,
            backgroundColor: colors,
            borderColor: colors.map((color) => color.replace("0.6", "1")),
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(40, 40, 40, 0.7)",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 2,
            padding: 10,
            caretSize: 6,
            caretPadding: 8,
            cornerRadius: 6,
            boxWidth: 10,
            boxHeight: 10,
            displayColors: true,
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.raw || "";
                return `${label}: ${value} 技能点`;
              },
              title: function (context) {
                return `${context[0].label}`;
              },
            },
          },
        },
        scales: {
          r: {
            ticks: {
              display: false,
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
              lineWidth: 0.5,
            },
            angleLines: {
              color: "rgba(0, 0, 0, 0.2)",
              lineWidth: 1,
            },
          },
        },
        animation: {
          duration: 1800,
          easing: "easeOutQuad",
          animateRotate: true,
          animateScale: true,
        },
      },
    });
  }

  destroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}

// 导出类
window.PolarChart = PolarChart;
