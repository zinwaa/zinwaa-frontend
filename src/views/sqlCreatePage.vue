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
                            <a-button type="outline">智能输入</a-button>
                            <a-button type="outline">导入多条字段</a-button>
                        </a-space>
                    </div>
                    <div class="inputForm">
                        <a-form :model="form" :label-align="'left'" :label-col-props="{ span: 3, offset: 1 }">
                            <a-form-item field="databaseName" validate-trigger="input">
                                <template #label>
                                    <span class="label">库名</span>
                                </template>
                                <a-input v-model="form.databaseName" placeholder="多个单词建议用下划线分割" />
                            </a-form-item>
                            <a-form-item field="tableName" validate-trigger="input" required>
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
                                <a-collapse>
                                    <a-collapse-item key="1">
                                        <template #header>
                                            <a-form-item field="tableComments" validate-trigger="input"
                                                @click.prevent="" :label-col-style="{ width: '60px' }"
                                                class="fieldTitle" @click.stop="">
                                                <template #label>
                                                    <span style="display: block;width: 100px;" class="label">字段名</span>
                                                </template>
                                                <a-input v-model="item.name" placeholder="请输入字段名"
                                                    style="width: 300px;" />
                                            </a-form-item>
                                        </template>
                                        <template #extra>
                                            <a-button type="text" status="danger" @click.stop="">
                                                删除
                                            </a-button>
                                        </template>
                                        <div class="fieldContent">
                                            <a-row :gutter="16">
                                                <a-col :span="10">
                                                    <a-form-item field="tableType" label-col-flex="64px">
                                                        <template #label>
                                                            <span class="label">字段类型</span>
                                                        </template>
                                                        <a-input v-model="item.type" placeholder="请输入字段类型"
                                                            class="inputBox" />
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="9">
                                                    <a-form-item field="tableDefaultValue" label-col-flex="50px">
                                                        <template #label>
                                                            <span class="label">默认值</span>
                                                        </template>
                                                        <a-input v-model="item.defaultValue" placeholder="要和字段类型匹配"
                                                            class="inputBox" />
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-form-item field="tableComments" label-col-flex="36px">
                                                        <template #label>
                                                            <span class="label">注释</span>
                                                        </template>
                                                        <a-input v-model="item.comment" placeholder="请输入字段注释"
                                                            class="inputBox" />
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="10">
                                                    <a-form-item field="tableOnUpdate" label-col-flex="75px">
                                                        <template #label>
                                                            <span class="label">onUpdate</span>
                                                        </template>
                                                        <a-input v-model="item.onUpdate" placeholder="字段更新动作"
                                                            class="inputBox" />
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="4">
                                                    <a-form-item field="tableNotNull" label-col-flex="0px">
                                                        <a-checkbox v-model="item.notNull">非空</a-checkbox>
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="4" style="transform: translateX(-20px);">
                                                    <a-form-item field="tableIsPrimary" label-col-flex="0px">
                                                        <a-checkbox v-model="item.isPrimary">主键</a-checkbox>
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="4" style="transform: translateX(-20px);">
                                                    <a-form-item field="tableIsAutoIncrement" label-col-flex="0px">
                                                        <a-checkbox v-model="item.isAutoIncrement">自增</a-checkbox>
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                        </div>
                                    </a-collapse-item>
                                </a-collapse>
                            </div>
                            <a-button type="outline" style="border: dashed 1px rgb(var(--primary-6));margin: 10px 0;">
                                <template #icon>
                                    <icon-plus />
                                </template>
                                <!-- Use the default slot to avoid extra spaces -->
                                <template #default>新增字段</template>
                            </a-button>
                            <a-space style="margin-top: 10px;display: flex;gap: 10px;">
                                <a-button type="primary" style="width: 180px;">一键生成</a-button>
                                <a-button type="outline">重置</a-button>
                            </a-space>
                        </a-form>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="title">
                    <span>输出结果</span>
                </div>
                <div class="content"></div>
            </div>
        </div>
    </div>
</template>


<script setup lang='ts'>
import { reactive } from 'vue';

const form = reactive({
    databaseName: '',
    tableName: 'test_table',
    tableComments: '',
    tableFields: [
        {
            name: '',
            type: '',
            defaultValue: '',
            comment: '',
            onUpdate: '',
            isPrimary: true,
            notNull: false,
            isAutoIncrement: true,
        }, {
            name: '',
            type: '',
            defaultValue: '',
            comment: '',
            onUpdate: '',
            isPrimary: true,
            notNull: false,
            isAutoIncrement: true,
        }, {
            name: '',
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
const symbol = (n: number) => Symbol(n)
</script>


<style scoped>
.page {
    display: flex;

    .containers {
        flex: 1;
        display: flex;
        margin-top: 40px;
        justify-content: space-evenly;
        gap: 20px;


        .card {
            width: 700px;
            border: 1px solid #ccc;
            background-color: #fff;
            border-radius: 4px;

            .title {
                padding: 20px 30px;
                font-size: 18px;
                border-bottom: #ccc 1px solid;
            }

            .content {
                padding: 20px 25px;

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