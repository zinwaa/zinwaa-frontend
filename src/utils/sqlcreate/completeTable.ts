import type { Table } from '@/types/interface';
import { completeField } from './completeField';

/**
 * 自动补全对象以匹配 table 接口。
 * @param table 原始对象。
 * @returns 符合 Table 接口的对象。
 */
export const completeTable = (table: Partial<Table>): Table => {
    table.tableFields?.forEach(field => field = completeField(field))
    const defaultTable: Table = {
        // 初始化所有可能的字段为默认值或空值
        databaseName: "",
        tableName: "test_table",
        tableComments: "",
        num: 10,
        tableFields: []
    }

    // 合并原始对象和默认值对象，优先使用原始对象的值
    return { ...defaultTable, ...table };
};

