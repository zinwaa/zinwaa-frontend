<template>
    <div class="containers">
        <div class="card">
            <div class="title">
                <span>输入配置</span>
            </div>
            <div class="content">
                <div class="inputBtn">
                    <a-space>
                        <a-button type="outline" @click="intelligentInputClick">智能输入</a-button>
                        <!-- <a-button type="outline">导入多条字段</a-button> -->
                    </a-space>
                </div>
                <div class="inputForm">
                    <a-form :model="form" :label-align="'left'" :label-col-props="{ span: 3, offset: 1 }"
                        @submit="onSubmit" ref="formRef">
                        <a-form-item field="databaseName" validate-trigger="input">
                            <template #label>
                                <span class="label">库名</span>
                            </template>
                            <a-input v-model="form.databaseName" placeholder="多个单词建议用下划线分割" />
                        </a-form-item>
                        <a-form-item field="tableName" validate-trigger="input" name="tableName"
                            :rules="[{ required: true, message: '请输入表名' }]">
                            <template #label>
                                <span class="label">表名</span>
                            </template>
                            <a-input v-model="form.tableName" placeholder="请输入表名" />
                        </a-form-item>
                        <a-form-item field="tableComments" validate-trigger="input">
                            <template #label>
                                <span class="label">表注释</span>
                            </template>
                            <a-input v-model="form.tableComments" placeholder="描述表的中文名称、作用等" />
                        </a-form-item>
                        <a-form-item field="tableComments" validate-trigger="change"
                            :rules="[{ required: false, message: '请输入生成条数', min: 1, max: 100 }]">
                            <template #label>
                                <span class="label">生成条数</span>
                            </template>
                            <a-input-number :style="{ width: '100px' }" placeholder="生成条数" :min="1" :max="100"
                                v-model="form.num" />
                        </a-form-item>
                        <div v-for="item, i in form.tableFields " :key="symbol(i)" class="fieldCard"
                            style="margin-bottom: 10px;">
                            <a-collapse :default-active-key="collapseActive" @change="collapseChange(i)">
                                <a-collapse-item :key="i">
                                    <template #header>
                                        <a-form-item :label-col-style="{ width: '60px' }" class="fieldTitle"
                                            hide-asterisk :rules="[{ required: true, message: '请输入字段名' }]"
                                            :field="`tableFields[${i}].name`">
                                            <template #label>
                                                <span style="display: block;width: 100px;" class="label">字段名</span>
                                            </template>
                                            <a-input v-model="item.name" placeholder="请输入字段名" style="width: 300px;"
                                                @click.stop="" />
                                        </a-form-item>
                                    </template>
                                    <template #extra>
                                        <a-button type="text" status="normal" @click.stop="saveFieldWindow(i)">
                                            保存
                                        </a-button>
                                        <a-button type="text" status="danger" @click.stop="removeField(i)">
                                            删除
                                        </a-button>
                                    </template>
                                    <div class="fieldContent">
                                        <a-form-item :field="`tableFields[${i}].type`" label-col-flex="78px"
                                            :rules="[{ required: true, message: '请输入字段类型' }]" class="fieldListBox"
                                            id="type">
                                            <template #label>
                                                <span class="label">字段类型</span>
                                            </template>
                                            <a-select :style="{ width: '320px' }" placeholder="请输入字段类型"
                                                style="background-color: #fff;" allow-search v-model="item.type"
                                                class="inputBox" popup-container="#type">
                                                <a-option>INT</a-option>
                                                <a-option>VARCHAR</a-option>
                                                <a-option>TEXT</a-option>
                                                <a-option>DATE</a-option>
                                                <a-option>TINYINT</a-option>
                                                <a-option>SMALLINT</a-option>
                                                <a-option>MEDIUMINT</a-option>
                                                <a-option>BIGINT</a-option>
                                                <a-option>DECIMAL</a-option>
                                                <a-option>FLOAT</a-option>
                                                <a-option>DOUBLE</a-option>
                                                <a-option>REAL</a-option>
                                                <a-option>BIT</a-option>
                                                <a-option>BOOLEAN</a-option>
                                                <a-option>SERIAL</a-option>
                                                <a-option>DATETIME</a-option>
                                                <a-option>TIMESTAMP</a-option>
                                                <a-option>TIME</a-option>
                                                <a-option>YEAR</a-option>
                                                <a-option>CHAR</a-option>
                                                <a-option>TINYTEXT</a-option>
                                                <a-option>TEXT</a-option>
                                                <a-option>MEDIUMTEXT</a-option>
                                                <a-option>LONGTEXT</a-option>
                                                <a-option>BINARY</a-option>
                                                <a-option>VARBINARY</a-option>
                                                <a-option>TINYBLOB</a-option>
                                                <a-option>MEDIUMBLOB</a-option>
                                                <a-option>BLOB</a-option>
                                                <a-option>LONGBLOB</a-option>
                                                <a-option>ENUM</a-option>
                                                <a-option>SET</a-option>
                                                <a-option>GEOMETRY</a-option>
                                                <a-option>POINT</a-option>
                                                <a-option>LINESTRING</a-option>
                                                <a-option>POLYGON</a-option>
                                                <a-option>MULTIPOINT</a-option>
                                                <a-option>MULTILINESTRING</a-option>
                                                <a-option>MULTIPOLYGON</a-option>
                                                <a-option>GEOMETRYCOLLECTION</a-option>

                                            </a-select>
                                        </a-form-item>
                                        <a-form-item :field="`tableFields[${i}].defaultValue`" label-col-flex="50px"
                                            class="fieldListBox" id="defaultValue">
                                            <template #label>
                                                <span class="label">默认值</span>
                                            </template>
                                            <a-input v-model="item.defaultValue" placeholder="要和字段类型匹配"
                                                class="inputBox" />
                                        </a-form-item>
                                        <a-form-item :field="`tableFields[${i}].comment`" label-col-flex="36px"
                                            class="fieldListBox" id="comment">
                                            <template #label>
                                                <span class="label">注释</span>
                                            </template>
                                            <a-input v-model="item.comment" placeholder="请输入字段注释" class="inputBox" />
                                        </a-form-item>
                                        <a-form-item :field="`tableFields[${i}].onUpdate`" label-col-flex="75px"
                                            class="fieldListBox" id="onUpdate">
                                            <template #label>
                                                <span class="label">onUpdate</span>
                                            </template>
                                            <a-select placeholder="字段更新动作" allow-clear v-model="item.onUpdate"
                                                class="inputBox" style="background-color: #fff;"
                                                popup-container="#onUpdate">
                                                <a-option>CURRENT_TIMESTAMP</a-option>
                                            </a-select>

                                        </a-form-item>
                                        <a-form-item :field="`tableFields[${i}].notNull`" label-col-flex="0px"
                                            class="fieldListBox" style="width: 80px;" id="notNull">
                                            <a-checkbox v-model="item.notNull">非空</a-checkbox>
                                        </a-form-item>
                                        <a-form-item :field="`tableFields[${i}].isPrimary`" label-col-flex="0px"
                                            class="fieldListBox" style="width: 80px;" id="isPrimary">
                                            <a-checkbox v-model="item.isPrimary">主键</a-checkbox>
                                        </a-form-item>
                                        <a-form-item :field="`tableFields[${i}].isAutoIncrement`" label-col-flex="0px"
                                            class="fieldListBox" style="width: 80px;" id="isAutoIncrement">
                                            <a-checkbox v-model="item.isAutoIncrement">自增</a-checkbox>
                                        </a-form-item>
                                        <a-form-item :field="`tableFields[${i}].fakeDataType`" label-col-flex="78px"
                                            :rules="[{ required: true, message: '不可为空' }]" class="fieldListBox"
                                            id="fakeDataType">
                                            <template #label>
                                                <span class="label">模拟类型</span>
                                            </template>
                                            <a-select :style="{ width: '400px' }" placeholder="模拟数据类型"
                                                style="background-color: #fff;" v-model="item.fakeDataType"
                                                class="inputBox" popup-container="#fakeDataType">
                                                <a-option v-for="value of Object.keys(fakeDataOptions)" :key="value">
                                                    {{ value }}
                                                </a-option>
                                            </a-select>
                                        </a-form-item>
                                        <a-form-item :field="`tableFields[${i}].fakeData`" label-col-flex="78px"
                                            :rules="[{ required: true, message: '不可为空' }]" class="fieldListBox"
                                            v-if="fakeDataOptions[item.fakeDataType]" id="fakeData">
                                            <template #label>
                                                <span class="label">模拟数据</span>
                                            </template>
                                            <a-select :style="{ width: '400px' }"
                                                :placeholder="`请输入${item.fakeDataType}`" style="background-color: #fff;"
                                                v-model="item.fakeData" class="inputBox"
                                                v-if="Array.isArray(fakeDataOptions[item.fakeDataType])"
                                                :trigger-props="{ updateAtScroll: true }" popup-container="#fakeData">
                                                <a-option v-for="value of fakeDataOptions[item.fakeDataType]"
                                                    :key="value">{{ value
                                                    }}</a-option>
                                            </a-select>
                                            <a-input :style="{ width: '400px' }"
                                                :placeholder="`请输入${item.fakeDataType}`" style="background-color: #fff;"
                                                v-model="item.fakeData" class="inputBox" v-else></a-input>
                                        </a-form-item>
                                    </div>
                                </a-collapse-item>
                            </a-collapse>
                        </div>
                        <a-button type="outline" style="border: dashed 1px rgb(var(--primary-6));margin: 10px 0;"
                            @click="addField">
                            <template #icon>
                                <icon-plus />
                            </template>
                            <template #default>新增字段</template>
                        </a-button>
                        <a-space style="margin-top: 10px;display: flex;gap: 10px;">
                            <a-button type="primary" style="width: 180px;" html-type="submit">一键生成</a-button>
                            <a-button type="outline" @click="saveTableWindow">
                                保存表
                            </a-button>
                            <a-button type="outline"
                                @click="($refs.formRef as HTMLFormElement).resetFields()">重置</a-button>
                        </a-space>
                    </a-form>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="title">
                <span>输出结果</span>
            </div>
            <div class="content">
                <a-collapse style="height: 100%;" :default-active-key="['1']">
                    <a-collapse-item header="建表语句" key="1" style="max-height: 500px;" class="buildSQLBox">
                        <template #extra>
                            <span style="font-size: 12px;" @click.stop="copySQL('buildSQL')"><icon-copy /> 复制</span>
                        </template>
                        <pre v-if="result?.buildSQL" ref="buildSQL">{{ result.buildSQL }}</pre>
                        <a-empty v-else />
                    </a-collapse-item>
                </a-collapse>
            </div>
            <div class="content" style="padding-top: 0px;">
                <a-collapse style="height: 100%;" :default-active-key="['1']">
                    <a-collapse-item header="插入语句" key="1" style="max-height: 500px;" class="insertSQLBox">
                        <template #extra>
                            <span style="font-size: 12px;" @click.stop="copySQL('insertSQL')"><icon-copy /> 复制</span>
                        </template>
                        <pre v-if="result?.insertSQL" ref="insertSQL">{{ result?.insertSQL }}</pre>
                        <a-empty v-else />
                    </a-collapse-item>
                </a-collapse>
            </div>
        </div>

    </div>
    <div>
        <a-modal v-model:visible="intelligentInputVisible" :title-align="'start'" class="windows" :footer="false">
            <template #title style="margin: 0;">
                <span class="title" style="margin: 20px 0;display: block;"> 智能输入 </span>
            </template>
            <div class="content">
                <span style="margin-bottom: 5px;display: block;">输入多个字段名称，请用【中文或英文逗号】分开:</span>
                <a-form :model="windowsData" @submit="intelligentInputOk" :wrapper-col-props="{ span: 24, offset: -2 }">
                    <a-form-item hide-asterisk :rules="[{ required: true, message: '不能为空' }]" field="intelligentInput">
                        <a-textarea placeholder="输入多个字段名称，请用【中文或英文逗号】分开" :allow-clear="false"
                            :auto-size="{ minRows: 18, maxRows: 18 }" v-model="windowsData.intelligentInput" />
                    </a-form-item>

                    <div class="inputBox" style="display: flex;justify-content: flex-end;gap: 10px;margin-top: 20px;">
                        <a-button type="outline" html-type="reset">重置</a-button>
                        <a-button type="primary" html-type="submit" style="width: 100px;">导入</a-button>
                    </div>
                </a-form>
            </div>
        </a-modal>
    </div>
    <div>
        <a-modal v-model:visible="saveTablevisible" :title-align="'start'" class="windows" :footer="false">
            <template #title style="margin: 0;">
                <span class="title" style="margin: 20px 0;display: block;">保存表信息（后续可直接导入）</span>
            </template>
            <div class="content">
                <span style="margin-bottom: 5px;display: block;color: var(--color-text-2);">注意，你提交的内容可能会被公开！</span>
                <a-form :model="TableData" @submit="saveTable" :wrapper-col-props="{ span: 24, offset: -2 }">
                    <a-form-item :rules="[{ required: true, message: '不能为空' }]" field="tableTitle"
                        :label-col-style="{ transform: 'translateX(-40%)' }" :label="'名称'">
                        <a-input v-model="TableData.tableTitle" placeholder="请输入名称" allow-clear />
                    </a-form-item>
                    <a-form-item field="intelligentInput">
                        <a-textarea placeholder="输入多个字段名称，请用【中文或英文逗号】分开" :allow-clear="false"
                            :auto-size="{ minRows: 5, maxRows: 5 }" v-model="TableData.saveTableData" />
                    </a-form-item>
                    <div class="inputBox" style="display: flex;gap: 10px;margin-top: 20px;">
                        <a-button type="primary" html-type="submit">保存表</a-button>
                        <a-button type="outline" @click="saveTableWindow">重置</a-button>
                    </div>
                </a-form>
            </div>
        </a-modal>
    </div>
    <div>
        <a-modal v-model:visible="saveFieldvisible" :title-align="'start'" class="windows" :footer="false">
            <template #title style="margin: 0;">
                <span class="title" style="margin: 20px 0;display: block;">保存字段信息（后续可直接导入）</span>
            </template>
            <div class="content">
                <span style="margin-bottom: 5px;display: block;color: var(--color-text-2);">注意，你提交的内容可能会被公开！</span>
                <a-form :model="FieldData" @submit="saveField" :wrapper-col-props="{ span: 24, offset: -2 }">
                    <a-form-item :rules="[{ required: true, message: '不能为空' }]" field="FieldTitle"
                        :label-col-style="{ transform: 'translateX(-40%)' }" :label="'名称'">
                        <a-input v-model="FieldData.title" placeholder="请输入名称" allow-clear />
                    </a-form-item>
                    <a-form-item field="intelligentInput">
                        <a-textarea placeholder="输入多个字段名称，请用【中文或英文逗号】分开" :allow-clear="false"
                            :auto-size="{ minRows: 5, maxRows: 5 }" v-model="FieldData.data" />
                    </a-form-item>
                    <div class="inputBox" style="display: flex;gap: 10px;margin-top: 20px;">
                        <a-button type="primary" html-type="submit">保存表</a-button>
                        <a-button type="outline" @click="saveFieldWindow(saveFieldChoose)">重置</a-button>
                    </div>
                </a-form>
            </div>
        </a-modal>
    </div>

</template>


<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import type { ValidatedError } from '@arco-design/web-vue';
import { tips } from '@/utils/tips';
import { getFakerGeneratorForFieldType, generateValueFromRegex } from '@/utils/sqlcreate/sqlcreateFuntion'


//--------------------------------------------数据部分--------------------------------------------
import type { Table } from '@/types/interface'
const form = reactive<Table>({
    databaseName: '',
    tableName: 'test_table',
    tableComments: '',
    num: 10,
    tableFields: [
        {
            name: 'test_field',
            type: '',
            defaultValue: '',
            comment: '',
            onUpdate: '',
            isPrimary: true,
            notNull: false,
            isAutoIncrement: true,
            fakeDataType: '不模拟',
            fakeData: '',
        },
    ]
})
const result = ref<{ buildSQL: string, insertSQL: string } | null>(null)
const resultType = ref<'mysql' | 'sqlServer' | 'oracle'>('mysql')


//--------------------------------------------公共功能--------------------------------------------
const symbol = (n: number) => Symbol(n)

//监听窗口变化
onMounted(() => {
    const width = document.body.clientWidth
    const containersDom = document.getElementsByClassName('containers')[0] as HTMLDivElement
    containersDom.style.flexDirection = width < 1400 ? 'column' : 'row'
    window.onresize = () => {
        return (() => {
            const width = document.body.clientWidth
            const containersDom = document.getElementsByClassName('containers')[0] as HTMLDivElement
            containersDom.style.flexDirection = width < 1400 ? 'column' : 'row'
        })()
    }
})



//--------------------------------------------表单功能--------------------------------------------
//展开的字段面板发生改变时触发
const collapseActive = reactive<number[]>([])
const collapseChange = (key: number) => {
    if (collapseActive.includes(key)) {
        collapseActive.splice(collapseActive.indexOf(key), 1);
    } else {
        collapseActive.push(key)
    }
}

//表单提交
const onSubmit = (data: {
    values: Record<string, any>;
    errors: Record<string, ValidatedError> | undefined;
}) => {
    if (data.errors) { tips('warning'); return }
    else if (data.values.tableFields.length === 0) { tips('warning', '请至少添加一条字段'); return }
    else {
        tips('success');
        result.value = {
            buildSQL: generateMySQLCreateTableStatement(data.values as Table),
            insertSQL: generateMySQLInsertStatement(data.values as Table)
        };
    }
}

//添加字段
const addField = () => {
    form.tableFields.push({
        name: 'test_field',
        type: '',
        defaultValue: '',
        comment: '',
        onUpdate: '',
        isPrimary: true,
        notNull: false,
        isAutoIncrement: true,
        fakeDataType: '不模拟',
        fakeData: '',
    })
}

//删除字段
const removeField = (key: number) => {
    form.tableFields.splice(key, 1)
    collapseActive.forEach((item, index) => {
        if (item === key) {
            collapseActive.splice(index, 1);
        }
        if (item > key) {
            collapseActive[index] = item - 1;
        }
    });
}

//--------------------------------------------窗口功能--------------------------------------------
const intelligentInputVisible = ref(false);
const windowsData = reactive({
    intelligentInput: '',
})
const intelligentInputClick = () => {
    intelligentInputVisible.value = true;
};
const intelligentInputOk = (data: {
    values: Record<string, any>;
    errors: Record<string, ValidatedError> | undefined;
}): any => {
    if (data.errors) return
    const str: string = data.values.intelligentInput;
    form.tableFields = [];
    str.split(/[,，]/g).forEach((item) => {
        if (item.trim() !== '') {
            form.tableFields.push({
                name: item.trim(),
                type: '',
                defaultValue: '',
                comment: '',
                onUpdate: '',
                isPrimary: false,
                notNull: false,
                isAutoIncrement: false,
                fakeDataType: '不模拟',
                fakeData: '',
            })
        }
    })
    if (form.tableFields.length === 0) {
        tips('warning', '请至少添加一条字段');
        return;
    }
    tips('success');
    intelligentInputVisible.value = false;
}



//--------------------------------------------生成数据--------------------------------------------
//生成myysql语句
//生成建表语句
const generateMySQLCreateTableStatement = (form: Table) => {
    const fieldDefinitions = form.tableFields.map(field => {
        let definition = `\`${field.name}\` ${field.type}`;

        if (field.isPrimary) {
            definition += ' PRIMARY KEY';
        }

        if (field.isAutoIncrement && ['int', 'bigint'].includes(field.type.toLowerCase())) {
            definition += ' AUTO_INCREMENT';
        }

        if (field.notNull) {
            definition += ' NOT NULL';
        }

        if (field.defaultValue !== 'NULL') {
            definition += ` DEFAULT ${field.defaultValue}`;
        }

        if (field.onUpdate !== '') {
            definition += ` ON UPDATE ${field.onUpdate}`;
        }

        if (field.comment !== '') {
            definition += ` COMMENT '${field.comment.replace(/'/g, "\\'")}'`;
        }

        return definition;
    });

    const columnsClause = fieldDefinitions.join(',\n  ');

    const tableCommentsClause = form.tableComments ? `COMMENT '${form.tableComments.replace(/'/g, "\\'")}'` : '';
    const tableHeaderClause = form.databaseName ? `CREATE TABLE IF NOT EXISTS \`${form.databaseName}\`.\`${form.tableName}\`` : `CREATE TABLE IF NOT EXISTS \`${form.tableName}\``;
    return `${tableHeaderClause} (
  ${columnsClause}
) ${tableCommentsClause};`.trim();
};

// 生成插入语句
const generateMySQLInsertStatement = (form: Table) => {
    const tableName = form.tableName;
    const num = form.num;

    const insertStatements = Array.from({ length: num }, (_, index) => {
        const fieldDefinitions = form.tableFields.map((field) => {
            let definition = ``;
            const fieldName = field.name;
            let fakerGeneratorData = '';

            switch (field.fakeDataType) {
                case '不模拟':
                    break;
                case '固定值':
                    // 根据 field.fakeData 生成
                    fakerGeneratorData = field.fakeData;
                    break;
                case '随机值':
                    // 根据 field.fakeData 中选择的随机值类型，用 faker.js 生成
                    fakerGeneratorData = getFakerGeneratorForFieldType(field.fakeData);
                    break;
                case '正则表达式':
                    // 根据 field.fakeData 中的正则表达式，生成对应的值
                    const regex = new RegExp(field.fakeData);
                    fakerGeneratorData = generateValueFromRegex(regex);
                    break;
            }

            if (fakerGeneratorData !== '') {
                definition = `INSERT INTO \`${tableName}\` (\`${fieldName}\`) VALUES (\`${fakerGeneratorData}\`);\n`;
            }
            return definition;
        });

        return fieldDefinitions.join('');
    });

    return insertStatements.join(''); // 使用空字符串连接，保留内部的换行符
};



//复制SQL语句
const insertSQL = ref<HTMLPreElement | null>(null);
const buildSQL = ref<HTMLPreElement | null>(null);
async function copySQL(copyDomRef: string) {
    const copyDom = copyDomRef === 'insertSQL' ? insertSQL.value : buildSQL.value;
    if (copyDom) {
        // navigator clipboard 需要https等安全上下文
        if (navigator.clipboard && window.isSecureContext) {
            // navigator clipboard 向剪贴板写文本
            tips('success', 'SQL 语句已复制到剪贴板')
            return navigator.clipboard.writeText(copyDom.innerText);
        } else {
            // 创建text area
            let textArea = document.createElement("textarea");
            textArea.value = copyDom.innerText;
            // 使text area不在viewport，同时设置不可见
            textArea.style.position = "absolute";
            textArea.style.opacity = '0';
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            return new Promise((res, rej) => {
                // 执行复制命令并移除文本框
                tips('success', 'SQL 语句已复制到剪贴板')
                document.execCommand('copy') ? res(null) : rej();
                textArea.remove();
            });
        }
    } else {
        tips('warning', '请先生成语句')
    }
}

// 模拟数据部分
const fakeDataOptions: { '不模拟': false, '固定值': string, '随机值': Array<string>, '正则表达式': string } = {
    '不模拟': false,
    '固定值': '请输入固定值',
    '随机值': ['人名', '手机号', '地址', '邮箱', '日期', '随机字符串', '随机数字', '随机布尔值'],
    '正则表达式': '请输入正则表达式'
}





//--------------------------------------------table 相关功能--------------------------------------------
import getCurrentDate from '@/utils/getCurrentDate';

// 保存表
import { saveTableApi } from '@/api/table/saveTable';
const saveTablevisible = ref(false);
const formRef = ref<null | HTMLFormElement>(null);
const TableData = reactive({
    tableTitle: '',
    saveTableData: '',
});
const saveTableWindow = () => {
    if (!sessionStorage.getItem('username')) {
        tips('warning', '请先登录')
        return;
    }
    formRef.value?.validate((valid: {} | undefined) => {
        if (valid) {
            tips('warning', '请输入必填字段');
            return;
        } else if (form.tableFields.length === 0) {
            tips('warning', '请至少添加一条字段');
            return;
        } else {
            saveTablevisible.value = true;
            TableData.tableTitle = JSON.stringify(form.tableComments).replace(/"/g, '');
            TableData.saveTableData = JSON.stringify(form);
        }
    });
};
const saveTable = (data: {
    values: Record<string, any>;
    errors: Record<string, ValidatedError> | undefined;
}): any => {
    if (data.errors) {
        tips('warning', '请输入表的名称');
        return;
    } else if (!sessionStorage.getItem('username')) {
        tips('warning', '请先登录')
        return;
    } else {
        const tableData = {
            data: JSON.stringify(form),
            userid: sessionStorage.username,
            time: getCurrentDate(),
            title: TableData.tableTitle,
        }
        saveTableApi(tableData)
        saveTablevisible.value = false;
    }
};


// --------------------------------------------Field 相关功能--------------------------------------------
import { saveFieldApi } from '@/api/field/saveField';
const saveFieldvisible = ref(false);
const FieldData = reactive({
    title: '',
    data: '',
});
// 保存字段
const saveFieldChoose = ref<number>(0)
const saveFieldWindow = (i: number) => {
    saveFieldChoose.value = i;
    const field = form.tableFields[i];
    if (!sessionStorage.getItem('username')) {
        tips('warning', '请先登录')
        return;
    } else if (field.name === '' || field.type === '') {
        tips('warning', '请输入必填字段');
        return;
    } else {
        saveFieldvisible.value = true;
        FieldData.title = JSON.stringify(field.comment).replace(/"/g, '');
        FieldData.data = JSON.stringify(field);
    }
};
const saveField = (data: {
    values: Record<string, any>;
    errors: Record<string, ValidatedError> | undefined;
}): any => {
    if (data.errors) {
        tips('warning', '请输入表的名称');
        return;
    } else if (!sessionStorage.getItem('username')) {
        tips('warning', '请先登录')
        return;
    } else {
        const sendfieldData = {
            data: JSON.stringify(form.tableFields[saveFieldChoose.value]),
            userid: sessionStorage.username,
            time: getCurrentDate(),
            title: FieldData.title,
            tag: sessionStorage.username === 'zinwaa' ? 'offical' : 'user',
        }
        saveFieldApi(sendfieldData)
        saveFieldvisible.value = false;
    }
};

</script>


<style scoped lang="less">
.containers {
    flex: 1;
    display: flex;
    margin-top: 40px;
    gap: 20px;
    align-items: flex-start;
    justify-content: flex-start;

    .card {
        width: 100%;
        border: 1px solid #ccc;
        background-color: #fff;
        border-radius: 4px;
        min-width: 580px;
        box-shadow: #cccccc34 0 0 8px 4px;

        .title {
            padding: 20px 30px;
            font-size: 18px;
            border-bottom: #ccc 1px solid;
        }

        .content {
            padding: 30px 25px;

            .inputForm {
                margin: 20px 0;

                .fieldCard {
                    display: flex;
                    flex-direction: column;

                    .arco-collapse {
                        overflow: visible;
                    }

                    .fieldTitle {
                        display: flex;
                        margin-bottom: 0px;
                    }

                    .fieldContent {
                        margin-top: 10px;
                        display: flex;
                        flex-wrap: wrap;
                        align-items: flex-start;
                        flex-direction: row;
                        justify-content: flex-start;
                        align-content: flex-start;
                        column-gap: 30px;
                        user-select: contain;

                        .fieldListBox {
                            width: 250px;
                            position: relative;
                        }

                        .inputBox {
                            background-color: #fff;
                        }


                    }
                }
            }
        }
    }
}


.label::after {
    content: ' :';
}
</style>