import { Message } from '@arco-design/web-vue';
//tips
export const tips = (status: 'success' | 'warning', message = '') => {
    switch (status) {
        case 'success':
            Message.success({
                content: message || '成功生成',
                position: "top",
            })
            break;
        case 'warning':
            Message.warning({
                content: message || '请输入必填字段',
                position: "top",
            })
            break;
    }
}