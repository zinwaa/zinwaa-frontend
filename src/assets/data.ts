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
        description: string;
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
        avatarUrl: '/src/assets/img/avatar.png'
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
            description: '项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述',
            link: 'sqlCreate',
        },
    ],
    tools: [
        {
            name: 'svgAnimation',
            description: '项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述',
            link: 'svgAnimation'
        },
    ]
}
interface IWebsiteData {
    time: string;
    title: string;
    content: string;
    status: 'success' | 'doing' | 'todo' | 'failed';
}
const websiteData: IWebsiteData[] = [
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
    },
]