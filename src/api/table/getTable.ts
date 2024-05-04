// 获取表
import axios from 'axios';
import { tips } from '@/utils/tips';
import BACKEND_URL from '@/config/backendUrl';
import type { GetTableReaponse } from '@/types/interface';

export const getTableApi = async (userid: string) => {
    try {
        const data = { userid };
        const reaponse: GetTableReaponse = (await axios.post(`${BACKEND_URL}/sqlcreate/table/getTable`, data)).data;
        // 保存成功
        if (reaponse.status) {
            tips('success', reaponse.message);
            return reaponse.data;
        } else {
            tips('warning', reaponse.message);
        }
    } catch (error) {
        console.log(error);
        tips('warning', '服务器打盹了，请稍后重试或联系管理员');
    }
};