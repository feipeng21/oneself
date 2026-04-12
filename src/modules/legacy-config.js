// le项目配置文件 - 迁移到pr项目
const leConfig = {
    //网页元数据
    metaData: {
        title: '彭飞 | 前端工程师个人主页',
        description: '彭飞 - 前端工程师，专注于Vue、React、Uni-app、React Native开发，拥有丰富的项目经验和实习经历',
        keywords: '彭飞,前端工程师,Vue,React,React Native,个人主页,个人网站',
        icon: '/favicon.ico'
    },

    avatar: "/img/avatar.jpg", // 头像
    welcometitle: "Hi, I'm 彭飞", // 标题

    // 颜色配置
    color: {
        themecolor: "#FFFFFF", // 主题颜色
        welcometitlecolor: "#FFFFFF", // 标题颜色
        turntablecolor1: "#FFFF00",  // 转盘渐变色一
        turntablecolor2: "#00FFFF"   // 转盘渐变色二
    },

    brightness: 85, // 背景亮度 --%
    blur: 5, // 毛玻璃模糊效果

    // 我的标签
    tags: ['前端工程师', 'Vue.js', 'React', 'React Native', 'TypeScript', 'Node.js', '团队协作', '持续学习'],

    //极坐标图数据
    polarChart: {
        skills: ['Vue.js', 'React', 'React Native', 'TypeScript', 'JavaScript', 'Node.js', 'uni-app', 'Git', 'Webpack', 'Vite', 'ECharts'],
        skillPoints: [90, 85, 80, 85, 88, 75, 85, 90, 70, 80, 75],
    },

    //社交按钮
    socialPlatformIcons: [
        { icon: "mdi-github", link: "https://www.github.com/pengfei" },
        { icon: "mdi-email", link: "mailto:1643380863@qq.com" },
        { icon: "mdi-phone", link: "tel:17803709890" },
        { icon: "mdi-blog", link: "https://juejin.cn/user/121387835735579/posts" },
        { icon: "mdi-linkedin", link: "https://www.linkedin.com" },
        { icon: "mdi-wechat", link: "https://wx.qq.com/" }
    ],

    //打字机
    typeWriterStrings: [
        "你好，我是彭飞，一名热爱技术的前端工程师。",
        "专注于Vue、React、Uni-app、React Native开发，拥有丰富的项目经验。",
        "喜欢探索新技术，追求代码的优雅与用户体验的完美结合。",
        "相信技术改变世界，代码创造价值。让我们一起构建更美好的数字世界！"
    ],

    //项目卡片
    projectcards: [
        { go: "🚀 查看", img: "/src/img/box1.png", title: "Openstrat - AI股市分析应用", subtitle: "React Native + Expo跨平台金融应用", text: "React Native + Expo跨平台金融应用，支持iOS和Web，集成AI智能助手、实时股市数据", url: "https://juejin.cn/user/121387835735579/posts", show: false },
        { go: "📱 查看", img: "/src/img/box3.jpg", title: "指尖移通 - 微信小程序", subtitle: "uni-app开发的校园小程序", text: "uni-app开发的校园小程序，日活34000+，包含教学辅助、校园社区、功能室预约等", url: "https://juejin.cn/user/121387835735579/posts", show: false },
        { go: "📊 查看", img: "/src/img/box5.jpg", title: '"数"说节气万象 - 信息可视化', subtitle: "Vue3 + ECharts开发的中国古代自然科学分析平台", text: "Vue3 + ECharts开发的中国古代自然科学分析平台，获计算机设计大赛三等奖", url: "http://www.pengfei.site", show: false },
        { go: "🎵 查看", img: "/src/img/box2.png", title: '"云音悦" - 网易云音乐播放器', subtitle: "React + TypeScript构建的在线音乐播放器", text: "React + TypeScript构建的在线音乐播放器，支持歌单管理、搜索、评论互动", url: "https://juejin.cn/user/121387835735579/posts", show: false },
        { go: "💻 查看", img: "/src/img/box4.png", title: "网信中心报修填写小程序", subtitle: "前端采用Vue和uni-app开发，后端使用NestJS自研实现", text: "前端采用Vue和uni-app开发，后端使用NestJS自研实现，支持报修流程、数据可视化分析与管理。", url: "https://juejin.cn/user/121387835735579/posts", show: false },
        { go: "🏆 查看", img: "/src/img/box6.jpeg", title: "更多项目作品", subtitle: "查看我的掘金博客了解更多项目经验和技术分享", text: "查看我的掘金博客了解更多项目经验和技术分享", url: "https://juejin.cn/user/121387835735579/posts", show: false },
    ],

    //个人能力数据
    abilities: [
        {title:"🔍 探索创新能力", desc:"喜欢探索未知，对任何事物都充满好奇心，对科学技术拥有学习积极性，喜欢自主学习，不断拓宽知识边界"},
        {title:"💪 抗压与挑战精神", desc:"面对挑战保持乐观向上的态度，勇于尝试，敢于创新，相信通过不懈努力能够克服一切困难"},
        {title:"👥 团队领导能力", desc:"作为部门部长，保持高度的责任心与使命感，珍惜人才，致力于团队的成长与发展"},
        {title:"🎯 责任心与耐心", desc:"在网络与信息管理中心担任学生助理，具有吃苦耐劳、细心帮助老师解决问题的耐心，有向老师探索知识的好奇心"},
        {title:"🚀 技术学习能力", desc:"快速掌握新技术栈，从Vue到React Native跨平台开发的成功转换，持续关注前端技术发展趋势"},
        {title:"🏆 竞赛实战经验", desc:"多次参与国家级、省级竞赛并获奖，具备在高压环境下完成项目开发和技术创新的能力"}
    ],

    //自我评价
    selfEvaluation: "我是个喜欢探索未知，对任何事物都充满好奇心，对科学技术拥有学习积极性，喜欢自主学习，不断拓宽自己的知识边界。面对挑战，我保持乐观向上的态度，勇于尝试，敢于创新，相信通过不懈努力能够克服一切困难。作为部门部长，我保持高度的责任心与使命感，并且珍惜人才，致力于团队的成长与发展。",

    statement: [
        "彭飞 | 前端工程师",
        "电话：17803709890 | 邮箱：1643380863@qq.com",
        "博客：https://juejin.cn/user/121387835735579/posts",
        "重庆邮电大学移通学院 | 计算机科学与技术专业",
        "Copyright © 2025 彭飞. All rights reserved."
    ],
};

// 导出配置
window.leConfig = leConfig;
