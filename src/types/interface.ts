export interface reaponse {
    message: string,
    status: boolean,
}
export interface GetTableReaponse extends reaponse {
    data: {
        tableData: string,
        time: string,
        title: string,
        userid: string
    }[]
}

export interface Field {
    name: string;
    type: string;
    defaultValue: string;
    comment: string;
    onUpdate: string;
    isPrimary: boolean;
    notNull: boolean;
    isAutoIncrement: boolean;
    fakeDataType: '不模拟' | '固定值' | '随机值' | '正则表达式';
    fakeData: string;
}
export interface Table {
    databaseName: string;
    tableName: string;
    tableComments: string;
    num: number;
    tableFields: Field[];
}