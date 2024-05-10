import type { Field } from '@/types/interface';

/**
 * 自动补全对象以匹配 Field 接口。
 * @param field 原始对象。
 * @returns 符合 Field 接口的对象。
 */
export const completeField = (field: Partial<Field>): Field => {
    const defaultField: Field = {
        // 初始化所有可能的字段为默认值或空值
        name: '',
        type: '',
        defaultValue: '',
        comment: '',
        onUpdate: '',
        isPrimary: false,
        notNull: false,
        isAutoIncrement: false,
        fakeDataType: '不模拟',
        fakeData: '',
    };

    // 合并原始对象和默认值对象，优先使用原始对象的值
    return { ...defaultField, ...field };
};