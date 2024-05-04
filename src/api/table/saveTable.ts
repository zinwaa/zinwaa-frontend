// 保存表
import axios from 'axios';
import { tips } from '@/utils/tips';
import BACKEND_URL from '@/config/backendUrl';
import type { reaponse } from '@/types/interface';

export const saveTableApi = async (data: object) => {
    try {
        const reaponse: reaponse = (await axios.post(`${BACKEND_URL}/sqlcreate/table/addTable`, data)).data;
        // 保存成功
        if (reaponse.status) {
            tips('success', reaponse.message);
        } else {
            tips('warning', reaponse.message);
        }
    } catch (error) {
        console.log(error);
        tips('warning', '服务器打盹了，请稍后重试或联系管理员');
    }
};