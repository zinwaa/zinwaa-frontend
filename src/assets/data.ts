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
            name: '项目1',
            description: '项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述',
            link: 'https://www.baidu.com'
        },
    ]
}