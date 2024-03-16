<template>
    <div class="page">
        <div class="menu">
            <a-menu mode="pop" showCollapseButton :default-selected-keys="['0']">
                <a-menu-item key="0">
                    <template #icon><icon-apps></icon-apps></template>
                    代码生成
                </a-menu-item>
            </a-menu>
        </div>
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
                            @submit="onSubmit">
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
                            <div v-for="item, i in form.tableFields" :key="symbol(i)" class="fieldCard"
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
                                            <a-button type="text" status="danger" @click.stop="removeField(i)">
                                                删除
                                            </a-button>
                                        </template>
                                        <div class="fieldContent">
                                            <a-row :gutter="16">
                                                <a-col :span="10">
                                                    <a-form-item :field="`tableFields[${i}].type`" label-col-flex="78px"
                                                        :rules="[{ required: true, message: '请输入字段类型' }]">
                                                        <template #label>
                                                            <span class="label">字段类型</span>
                                                        </template>
                                                        <a-select :style="{ width: '320px' }" placeholder="请输入字段类型"
                                                            style="background-color: #fff;" allow-search
                                                            v-model="item.type" class="inputBox">
                                                            <a-option>TINYINT</a-option>
                                                            <a-option>SMALLINT</a-option>
                                                            <a-option>MEDIUMINT</a-option>
                                                            <a-option>INT</a-option>
                                                            <a-option>BIGINT</a-option>
                                                            <a-option>FLOAT</a-option>
                                                            <a-option>DOUBLE</a-option>
                                                            <a-option>DECIMAL</a-option>
                                                            <a-option>DATE</a-option>
                                                            <a-option>TIME</a-option>
                                                            <a-option>DATETIME</a-option>
                                                            <a-option>TIMESTAMP</a-option>
                                                            <a-option>YEAR</a-option>
                                                            <a-option>TINYTEXT</a-option>
                                                            <a-option>TEXT</a-option>
                                                            <a-option>MEDIUMTEXT</a-option>
                                                            <a-option>LONGTEXT</a-option>
                                                            <a-option>TINYBLOB</a-option>
                                                            <a-option>BLOB</a-option>
                                                            <a-option>MEDIUMBLOB</a-option>
                                                            <a-option>LONGBLOB</a-option>
                                                            <a-option>ENUM</a-option>
                                                            <a-option>SET</a-option>
                                                        </a-select>
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="9">
                                                    <a-form-item :field="`tableFields[${i}].defaultValue`"
                                                        label-col-flex="50px">
                                                        <template #label>
                                                            <span class="label">默认值</span>
                                                        </template>
                                                        <a-input v-model="item.defaultValue" placeholder="要和字段类型匹配"
                                                            class="inputBox" />
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-form-item :field="`tableFields[${i}].comment`"
                                                        label-col-flex="36px">
                                                        <template #label>
                                                            <span class="label">注释</span>
                                                        </template>
                                                        <a-input v-model="item.comment" placeholder="请输入字段注释"
                                                            class="inputBox" />
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="10">
                                                    <a-form-item :field="`tableFields[${i}].onUpdate`"
                                                        label-col-flex="75px">
                                                        <template #label>
                                                            <span class="label">onUpdate</span>
                                                        </template>
                                                        <a-select placeholder="字段更新动作" allow-clear
                                                            v-model="item.onUpdate" class="inputBox"
                                                            style="background-color: #fff;">
                                                            <a-option>CURRENT_TIMESTAMP</a-option>
                                                        </a-select>
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="4">
                                                    <a-form-item :field="`tableFields[${i}].isPrimary`"
                                                        label-col-flex="0px">
                                                        <a-checkbox v-model="item.notNull">非空</a-checkbox>
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="4" style="transform: translateX(-20px);">
                                                    <a-form-item :field="`tableFields[${i}].isAutoIncrement`"
                                                        label-col-flex="0px">
                                                        <a-checkbox v-model="item.isPrimary">主键</a-checkbox>
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="4" style="transform: translateX(-20px);">
                                                    <a-form-item :field="`tableFields[${i}].isAutoIncrement`"
                                                        label-col-flex="0px">
                                                        <a-checkbox v-model="item.isAutoIncrement">自增</a-checkbox>
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
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
                                <a-button type="outline" html-type="reset">重置</a-button>
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
                    <a-collapse style="height: 100%;">
                        <a-collapse-item header="建表语句" key="1">
                            <template #extra>
                                <span style="font-size: 12px;" @click.stop="copySQL"><icon-copy /> 复制</span>
                            </template>
                            <pre v-if="result" ref="sqlPre">{{ result.value }}</pre>
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
                    <a-form :model="windowsData" @submit="intelligentInputOk"
                        :wrapper-col-props="{ span: 24, offset: -2 }">
                        <a-form-item hide-asterisk :rules="[{ required: true, message: '不能为空' }]"
                            field="intelligentInput">
                            <a-textarea placeholder="输入多个字段名称，请用【中文或英文逗号】分开" :allow-clear="false"
                                :auto-size="{ minRows: 18, maxRows: 18 }" v-model="windowsData.intelligentInput" />
                        </a-form-item>

                        <div class="inputBox"
                            style="display: flex;justify-content: flex-end;gap: 10px;margin-top: 20px;">
                            <a-button type="outline" html-type="reset">重置</a-button>
                            <a-button type="primary" html-type="submit" style="width: 100px;">导入</a-button>
                        </div>
                    </a-form>
                </div>
            </a-modal>
        </div>
    </div>
</template>


<script setup lang='ts'>
import type { ValidatedError } from '@arco-design/web-vue';
import { Message } from '@arco-design/web-vue';
import { onMounted, reactive, ref } from 'vue';

//--------------------------------------------数据部分--------------------------------------------
interface Form {
    databaseName: string;
    tableName: string;
    tableComments: string;
    tableFields: {
        name: string;
        type: string;
        defaultValue: string;
        comment: string;
        onUpdate: string;
        isPrimary: boolean;
        notNull: boolean;
        isAutoIncrement: boolean;
    }[];
}
const form = reactive<Form>({
    databaseName: '',
    tableName: 'test_table',
    tableComments: '',
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
        },
    ]
})
const result = ref<{ value: string } | null>(null)
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

//tips
const tips = (status: 'success' | 'warning', message = '') => {
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
}): any => {
    if (data.errors) { tips('warning'); return }
    if (data.values.tableFields.length === 0) { tips('warning', '请至少添加一条字段'); return }

    tips('success');
    result.value = { value: generateMySQLCreateTableStatement(data.values as Form) };
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
const generateMySQLCreateTableStatement = (form: Form) => {
    const fieldDefinitions = form.tableFields.map(field => {
        let definition = `${field.name} ${field.type}`;

        if (field.isPrimary) {
            definition += ' PRIMARY KEY';
        }

        if (field.isAutoIncrement && ['int', 'bigint'].includes(field.type.toLowerCase())) {
            definition += ' AUTO_INCREMENT';
        }

        if (field.notNull) {
            definition += ' NOT NULL';
        }

        if (field.defaultValue !== '') {
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
//复制SQL语句
const sqlPre = ref<HTMLPreElement | null>(null);
onMounted(() => {
    if (sqlPre.value) {
        sqlPre.value.addEventListener('click', () => {
            copySQL();
        });
    }
});
async function copySQL() {
    // if (sqlPre.value) {
    //     try {
    //         await navigator.clipboard.writeText(sqlPre.value.innerText);
    //         tips('success', 'SQL 语句已复制到剪贴板')
    //     } catch (err) {
    //         console.error(err);
    //         tips('warning', '复制操作失败')
    //     }
    // } else {
    //     tips('warning', '请先生成语句')
    // }
    if (sqlPre.value) {
        // navigator clipboard 需要https等安全上下文
        if (navigator.clipboard && window.isSecureContext) {
            // navigator clipboard 向剪贴板写文本
            tips('success', 'SQL 语句已复制到剪贴板')
            return navigator.clipboard.writeText(sqlPre.value.innerText);
        } else {
            // 创建text area
            let textArea = document.createElement("textarea");
            textArea.value = sqlPre.value.innerText;
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

</script>


<style scoped>
.page {
    display: flex;
    margin-right: 40px;

    .containers {
        flex: 1;
        display: flex;
        margin-top: 40px;
        justify-content: space-evenly;
        gap: 20px;
        align-items: flex-start;

        .card {
            width: 100%;
            border: 1px solid #ccc;
            background-color: #fff;
            border-radius: 4px;
            min-width: 580px;
            box-shadow: #ccc 0 0 8px 4px;

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

                        .fieldTitle {
                            display: flex;
                            margin-bottom: 0px;
                        }

                        .fieldContent {
                            margin-top: 10px;

                            .inputBox {
                                background-color: #fff;
                            }
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

.menu {
    width: 100%;
    height: 600px;
    padding: 40px;
    box-sizing: border-box;
    background-color: var(--color-neutral-2);
    flex: 0;
}

.menu .arco-menu {
    width: 200px;
    height: 100%;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
}

.menu .arco-menu :deep(.arco-menu-collapse-button) {
    width: 32px;
    height: 32px;
    border-radius: 50%;
}

.menu .arco-menu:not(.arco-menu-collapsed) :deep(.arco-menu-collapse-button) {
    right: 0;
    bottom: 8px;
    transform: translateX(50%);
}

.menu .arco-menu:not(.arco-menu-collapsed)::before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 48px;
    height: 48px;
    background-color: inherit;
    border-radius: 50%;
    box-shadow: -4px 0 2px var(--color-bg-2), 0 0 1px rgba(0, 0, 0, 0.3);
    transform: translateX(50%);
}

.menu .arco-menu.arco-menu-collapsed {
    width: 48px;
    height: auto;
    padding-top: 24px;
    padding-bottom: 138px;
    border-radius: 22px;
}

.menu .arco-menu.arco-menu-collapsed :deep(.arco-menu-collapse-button) {
    right: 8px;
    bottom: 8px;
}
</style>