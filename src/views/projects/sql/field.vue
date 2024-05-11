<template>
    <div class="containers">
        <div class="card">
            <div class="title">
                <span>
                    公开字段信息
                </span>
                <a-button type="primary">创建字段</a-button>
            </div>
            <div class="content">
                <!-- 搜索 -->
                <a-input-search :style="{ width: '320px' }" placeholder="请输入字段名" button-text="搜索" search-button
                    class="search" @search="allTableSearch" />

                <!-- 所有公开表信息 -->
                <a-list class="list-demo-action-layout" :bordered="false"
                    :data="allTableData.filter(item => !allSearchValue || item.fieldData.name.includes(allSearchValue))"
                    :pagination-props="allTableDataPaginationProps" style="margin: 20px 0;">
                    <template #item="{ item }">
                        <a-list-item class="list-demo-item" action-layout="vertical">
                            <template #actions>
                                <span style="cursor: default;">{{ item.time }}</span>
                                <span @click="copyText(JSON.stringify(item.fieldData))">复制语句</span>
                            </template>
                            <template #extra>
                                <a-button type="outline" @click="importField(item.fieldData)">导入</a-button>
                            </template>
                            <a-list-item-meta style="align-items: stretch;flex-direction: column;">
                                <template #title>
                                    <span style="color: #000;font-size: 16px;font-weight: 600;">
                                        {{ item.title }}
                                    </span>
                                </template>
                                <template #description>
                                    <a-row>
                                        <a-col :span="8">
                                            <div>字段名：{{ item.fieldData.name }}</div>
                                        </a-col>
                                        <a-col :span="8">
                                            <div>字段类型：{{ item.fieldData.type }}</div>
                                        </a-col>
                                        <a-col :span="8">
                                            <div>默认值：{{ item.fieldData.defaultValue || 'null' }}</div>
                                        </a-col>
                                    </a-row>
                                    <a-row>
                                        <a-col :span="8">
                                            <div>注释：{{ item.fieldData.comment }}</div>
                                        </a-col>
                                        <a-col :span="8">
                                            <div>更新动作：{{ item.fieldData.onUpdate || 'null' }}</div>
                                        </a-col>
                                        <a-col :span="8">
                                            <div>主键：{{ item.fieldData.isPrimary }}</div>
                                        </a-col>
                                    </a-row>
                                    <a-row>
                                        <a-col :span="8">
                                            <div>非空：{{ item.fieldData.notNull }}</div>
                                        </a-col>
                                        <a-col :span="8">
                                            <div>自增：{{ item.fieldData.isAutoIncrement }}</div>
                                        </a-col>
                                    </a-row>
                                </template>
                            </a-list-item-meta>
                        </a-list-item>
                    </template>
                </a-list>
            </div>
        </div>
        <div class="card">
            <div class="title">
                <span>个人字段</span>
                <a-button type="primary">创建字段</a-button>
            </div>
            <div class="content">
                <!-- 搜索 -->
                <a-input-search :style="{ width: '320px' }" placeholder="请输入表名" button-text="搜索" search-button
                    class="search" @search="ownselfTableSearch" />

                <!-- 所有个人表信息 -->
                <a-list class="list-demo-action-layout" :bordered="false"
                    :data="ownselfTableData.filter(item => !ownselfSearchValue || item.fieldData.name.includes(ownselfSearchValue))"
                    :pagination-props="ownselfTableDataPaginationProps" style="margin: 20px 0;">
                    <template #item="{ item }">
                        <a-list-item class="list-demo-item" action-layout="vertical">
                            <template #actions>
                                <span style="cursor: default;">{{ item.time }}</span>
                                <span @click="copyText(JSON.stringify(item.fieldData))">复制语句</span>
                            </template>
                            <template #extra>
                                <a-button type="outline" @click="importField(item.fieldData)">导入</a-button>
                            </template>
                            <a-list-item-meta style="align-items: stretch;flex-direction: column;">
                                <template #title>
                                    <span style="color: #000;font-size: 16px;font-weight: 600;">
                                        {{ item.title }}
                                    </span>
                                </template>
                                <template #description>
                                    <a-row>
                                        <a-col :span="8">
                                            <div>字段名：{{ item.name }}</div>
                                        </a-col>
                                        <a-col :span="8">
                                            <div>字段类型：{{ item.type }}</div>
                                        </a-col>
                                        <a-col :span="8">
                                            <div>默认值：{{ item.defaultValue }}</div>
                                        </a-col>
                                    </a-row>
                                    <a-row>
                                        <a-col :span="8">
                                            <div>注释：{{ item.comment }}</div>
                                        </a-col>
                                        <a-col :span="8">
                                            <div>更新动作：{{ item.onUpdate }}</div>
                                        </a-col>
                                        <a-col :span="8">
                                            <div>主键：{{ item.isPrimary }}</div>
                                        </a-col>
                                    </a-row>
                                    <a-row>
                                        <a-col :span="8">
                                            <div>非空：{{ item.notNull }}</div>
                                        </a-col>
                                        <a-col :span="8">
                                            <div>自增：{{ item.isAutoIncrement }}</div>
                                        </a-col>
                                    </a-row>
                                </template>
                            </a-list-item-meta>
                        </a-list-item>
                    </template>
                </a-list>
            </div>
        </div>
    </div>
</template>


<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import type { Field } from '@/types/interface';
import { copyText } from '@/utils/copytext';
interface FieldData {
    time: string,
    title: string,
    userid: string,
    tag: string,
    fieldData: Field
}[]
const allTableData: FieldData[] = reactive([])
const ownselfTableData: FieldData[] = reactive([])

// 获取表
import { getFieldApi } from '@/api/field/getField';
onMounted(async () => {
    const res = await getFieldApi('');
    const username = sessionStorage.getItem('username');
    res && res.forEach(item => {
        const fieldData: Field = JSON.parse(item.fieldData);

        allTableData.push({
            title: item.title,
            fieldData,
            time: item.time.split('T')[0],
            userid: item.userid,
            tag: item.tag,
        })

        if (item.userid === username) {
            ownselfTableData.push({
                title: item.title,
                fieldData,
                time: item.time.split('T')[0],
                userid: item.userid,
                tag: item.tag,
            })
        }
    })
})

const allSearchValue = ref('');
const ownselfSearchValue = ref('');
const allTableSearch = (value: string) => {
    allSearchValue.value = value;
}
const ownselfTableSearch = (value: string) => {
    ownselfSearchValue.value = value;
}

const allTableDataPaginationProps = reactive({
    defaultPageSize: 5,
    total: allTableData.length
})
const ownselfTableDataPaginationProps = reactive({
    defaultPageSize: 5,
    total: ownselfTableData.length
})


import { useRouter } from 'vue-router';
const $router = useRouter();
const importField = (fieldData: Field) => {
    sessionStorage.setItem('fieldData', JSON.stringify(fieldData))
    $router.push('/projects/sqlCreate/home')
}
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
        box-shadow: #cccccc34 0 0 4px 2px;

        .title {
            padding: 20px 30px;
            font-size: 18px;
            border-bottom: #ccc 1px solid;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .content {
            padding: 30px 25px;

            .search .arco-input-append {
                padding: 0;
            }
        }
    }
}
</style>
