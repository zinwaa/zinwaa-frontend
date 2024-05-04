<template>
    <div class="containers">
        <div class="card">
            <div class="title">
                <span>
                    公开表信息
                </span>
                <a-button type="primary">创建表</a-button>
            </div>
            <div class="content">
                <!-- 搜索 -->
                <a-input-search :style="{ width: '320px' }" placeholder="请输入表名" button-text="搜索" search-button
                    class="search" @search="allTableSearch" />

                <!-- 所有公开表信息 -->
                <a-list class="list-demo-action-layout" :bordered="false"
                    :data="allTableData.filter(item => !allSearchValue || item.name.includes(allSearchValue))"
                    :pagination-props="allTableDataPaginationProps" style="margin: 20px 0;">
                    <template #item="{ item }">
                        <a-list-item class="list-demo-item" action-layout="vertical">
                            <template #actions>
                                <span>{{ item.time }}</span>
                                <span>复制语句</span>
                            </template>
                            <template #extra>
                                <a-button type="outline">导入</a-button>
                            </template>
                            <a-list-item-meta style="align-items: stretch;flex-direction: column;">
                                <template #title>
                                    <span style="color: #000;font-size: 16px;font-weight: 600;">
                                        {{ item.title }}
                                    </span>
                                </template>
                                <template #description>
                                    <a-row>
                                        <a-col :span="12">
                                            <div>表名：{{ item.name }}</div>
                                        </a-col>
                                        <a-col :span="12">
                                            <div>表注释：{{ item.comment }}</div>
                                        </a-col>
                                    </a-row>
                                    <div>
                                        <div>字段列表：{{ item.fieldList.join(', ') }}</div>
                                    </div>
                                </template>
                            </a-list-item-meta>
                        </a-list-item>
                    </template>
                </a-list>
            </div>
        </div>
        <div class="card">
            <div class="title">
                <span>个人表</span>
                <a-button type="primary">创建表</a-button>
            </div>
            <div class="content">
                <!-- 搜索 -->
                <a-input-search :style="{ width: '320px' }" placeholder="请输入表名" button-text="搜索" search-button
                    class="search" @search="ownselfTableSearch" />

                <!-- 所有个人表信息 -->
                <a-list class="list-demo-action-layout" :bordered="false"
                    :data="ownselfTableData.filter(item => !ownselfSearchValue || item.name.includes(ownselfSearchValue))"
                    :pagination-props="ownselfTableDataPaginationProps" style="margin: 20px 0;">
                    <template #item="{ item }">
                        <a-list-item class="list-demo-item" action-layout="vertical">
                            <template #actions>
                                <span>{{ item.time }}</span>
                                <span>复制语句</span>
                            </template>
                            <template #extra>
                                <a-button type="outline">导入</a-button>
                            </template>
                            <a-list-item-meta style="align-items: stretch;flex-direction: column;">
                                <template #title>
                                    <span style="color: #000;font-size: 16px;font-weight: 600;">
                                        {{ item.title }}
                                    </span>
                                </template>
                                <template #description>
                                    <a-row>
                                        <a-col :span="12">
                                            <div>表名：{{ item.name }}</div>
                                        </a-col>
                                        <a-col :span="12">
                                            <div>表注释：{{ item.comment }}</div>
                                        </a-col>
                                    </a-row>
                                    <div>
                                        <div>字段列表：{{ item.fieldList.join(', ') }}</div>
                                    </div>
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

interface TableData {
    title: string,
    name: string,
    comment: string,
    fieldList: string[],
    time: string
}
const allTableData: TableData[] = reactive([])
const ownselfTableData: TableData[] = reactive([])

// 获取表
import { getTableApi } from '@/api/table/getTable';
import type { Table } from '@/types/interface';
onMounted(async () => {
    const res = await getTableApi('');
    const username = sessionStorage.getItem('username');
    res?.forEach(item => {
        const tableItem: { saveTableData: string } = JSON.parse(item.tableData);
        const tableData: Table = JSON.parse(tableItem.saveTableData);
        allTableData.push({
            title: item.title,
            name: tableData.tableName,
            comment: tableData.tableComments,
            fieldList: tableData.tableFields.map(item => item.name),
            time: item.time.split('T')[0]
        })

        if (item.userid === username) {
            ownselfTableData.push({
                title: item.title,
                name: tableData.tableName,
                comment: tableData.tableComments,
                fieldList: tableData.tableFields.map(item => item.name),
                time: item.time.split('T')[0]
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
