export type TSkill = "HTML" | "CSS" | "Less" | "JavaScript" | "TypeScript" | "Vue3" | "React" |
    "Node" | "Mysql" | "Git" | "Vite" | "ArcoDesign" | "ES6" | 'Sass' | 'ElementUI';
export interface IGlobalData {
    info: {
        avatarUrl: string;
    };
    skills: TSkill[];
    projects: {
        name: string;
        skills: TSkill[];
        description: string[];
        link: string;
        img?: string;
    }[];
    tools: {
        name: string;
        description: string;
        link: string;
    }[];
}
export const globalData: IGlobalData = {
    info: {
        avatarUrl: '/public/img/avatar.png'
    },
    skills: [
        'HTML',
        'CSS',
        'JavaScript',
        'Vue3',
        'Less',
        'Sass',
        'TypeScript',
        'ElementUI',
        'ArcoDesign',
        'Vite',
    ],
    projects: [
        {
            name: 'sqlCreate',
            skills: ['Vue3', 'Less', 'TypeScript', 'ArcoDesign'],
            description: [
                '该项⽬是⼀个通过填写可视化表单快速⽣成可直接使⽤的SQL语句的⼯具，有效提⾼⼯作效率。',
                '该项⽬通过vue3为前端框架，采⽤vue-cli构建vue项⽬，利⽤HTML5、CSS3等各种技术以组件化开发成 响应式单⻚。',
                '项⽬可通过多种⽅式快速⽣成表单，经过简单修改后，通过js动态获取表单信息，拼接⽣成可直接使⽤的 SQL语句。'
            ],
            link: 'sqlCreate',
        },
    ],
    tools: [
        {
            name: 'svgAnimation',
            description: 'svg 的描边动画',
            link: 'svgAnimation'
        }, {
            name: 'clamp',
            description: '当文字大小能自适应视口，但vw等单位不适用的时候可使用clamp css函数。',
            link: 'clamp'
        }
    ]
}
interface IWebsiteData {
    time: string;
    title: string;
    content: string;
    status: 'success' | 'doing' | 'todo' | 'failed';
}
export const websiteData: IWebsiteData[] = [
    {
        time: '2023/12/19',
        title: '建文件夹',
        content: '一切的开始',
        status: 'success'
    }, {
        time: '2024/3/12',
        title: '打开文件夹',
        content: '决定建站，确定网站内容，正式开始写代码',
        status: 'success'
    }, {
        time: '2024/3/14',
        title: '域名',
        content: '购买域名：zinwaa.space',
        status: 'success'
    }, {
        time: '2024/3/15',
        title: 'v0.0.1',
        content: '第一个project：sql语句生成 初步完成',
        status: 'success'
    }, {
        time: '2024/3/16',
        title: '服务器',
        content: '购买服务器',
        status: 'success'
    }, {
        time: '2024/3/22',
        title: 'v0.0.2',
        content: '主页 初步完成',
        status: 'success'
    }, {
        time: '2024/3/23',
        title: '备案',
        content: '提交备案',
        status: 'success'
    }, {
        time: '2024/3/28',
        title: '小工具',
        content: '增加了两个工具：svg的描边动画和clamp函数的笔记',
        status: 'success'
    }, {
        time: '2024/4/1',
        title: '备案',
        content: '备案通过',
        status: 'success'
    }
]