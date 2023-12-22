<template>
    <div>
        <div class="list-box">
            <table>
                <tr>
                    <th v-for="item, i in listHeader" :key="i">{{ item }}</th>
                    <th v-if="$slots.itemControl">操作</th>
                </tr>
                <tr v-for="items, i in pageList[pageActive - 1]" :key="symbol(i)">
                    <td v-for="item, i in items" :key="i">{{ item }}</td>
                    <td v-if="$slots.itemControl">
                        <slot name="itemControl" :index="i">
                        </slot>
                    </td>
                </tr>
            </table>
        </div>
        <div class="page-box">
            <span class="pageChangeBtn" @click="pageChange">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" step="start">
                    <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
                </svg>
            </span>
            <span class="pageChangeBtn" @click="pageChange">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" step="preceding">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </span>
            <div style="display: flex;" :class="{ hideafter: hideafter, hidebefore: hidebefore }">
                <span class="pageChangeBtn pageNum" :class="{ active: page === pageActive }" v-for="page in pageList.length"
                    @click="pageChange" v-show="!(page > pageActive + 2 || page < pageActive - 2)">
                    {{ page }}
                </span>
            </div>

            <span class="pageChangeBtn" @click="pageChange">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" step="next">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </span>
            <span class="pageChangeBtn" @click="pageChange">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" step="end">
                    <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
                </svg>
            </span>
        </div>
    </div>
</template>


<script setup lang='ts'>
import { ref, watch } from 'vue';
type listType = {
    itemid: number;
    supplierName: string;
    itemName: string;
    nickname: string;
    Classification: string;
    Unit: string;
    price: number;
    purchasesNum: number;
    inStockNum: number;
    weight: number;
    amount: number;
    status: string;
    createTime: string;
}

const listHeader = {
    itemid: '序号',
    supplierName: '供应商',
    itemName: '商品名称',
    nickname: '商品别名',
    Classification: '商品分类',
    Unit: '商品单位',
    price: '商品单价',
    purchasesNum: '商品采购数量',
    inStockNum: '商品库存数量',
    weight: '商品重量',
    amount: '商品总价',
    status: '商品状态',
    createTime: '商品创建时间'
}
const Props = withDefaults(defineProps<{
    tableList: listType[],
    pageSize?: number,
    search?: { [key: string]: string }[]
}>(), {
    pageSize: 10
})

const Emits = defineEmits<{
    (e: 'overStartError'): void,
    (e: 'overEndError'): void
}>()
const symbol = (i: number) => Symbol(i)
const computedPage = (tableList: listType[], pageSize: number) => {
    pageSize < 1 ? pageSize = 1 : (pageSize > tableList.length ? pageSize = tableList.length : pageSize)
    const len = tableList.length
    const pageCount = Math.ceil(len / pageSize)
    tableList.forEach(item => item['amount'] = item['price'] * item['purchasesNum'])
    const pageList: listType[][] = []
    for (let i = 0; i < pageCount; i++) {
        pageList.push(tableList.slice(i * pageSize, (i + 1) * pageSize))
    }

    return pageList
}
let { tableList, pageSize } = Props
const pageList = ref(computedPage(tableList, pageSize))


const pageActive = ref(1)
const hideafter = ref<boolean>()
const hidebefore = ref<boolean>()
const pageBoxStyleChange = () => {
    hideafter.value = pageActive.value + 2 < pageList.value.length
    hidebefore.value = pageActive.value - 2 > 1
}
pageBoxStyleChange()
interface step {
    [key: string]: number
}
const stepChange = (value: number) => {
    pageActive.value += value
    if (pageActive.value < 1) {
        pageActive.value = 1
        Emits('overStartError')
    } else if (pageActive.value > pageList.value.length) {
        pageActive.value = pageList.value.length
        Emits('overEndError')
    }
    pageBoxStyleChange()
}
const pageChange = (e: MouseEvent) => {
    const dom = e.target as HTMLElement
    if (dom.classList.contains('pageNum')) {
        pageActive.value = Number(dom.innerText)
    } else {
        let step = ''
        if (dom.getAttribute('step')) {
            step = dom.getAttribute('step') as string
        } else {
            step = dom.parentElement?.getAttribute('step') as string;
        }
        let stepTurn = ref<step>({
            'start': 1 - pageActive.value,
            'preceding': -1,
            'next': +1,
            'end': pageList.value.length - pageActive.value
        })
        for (let key in stepTurn.value) {
            if (step === key) {
                stepChange(stepTurn.value[key])
            }
        }
    }
    pageBoxStyleChange()
}

watch(() => Props.search, () => {
    const searchData = JSON.parse(JSON.stringify(Props.search))
    let first = true;
    let temp: listType[] = [];
    searchData.forEach((item: listType) => {
        if (Object.values(item)[0]) {
            if (temp.length === 0 && first) {
                temp = tableList.filter((tableitem: { [key: string]: any }) => {
                    for (let key in tableitem) {
                        if (key === Object.keys(item)[0] && Object.values(item)[0] === tableitem[key]) {
                            return true
                        }
                    }
                })
                first = false
            } else {
                temp = temp.filter((tableitem: { [key: string]: any }) => {
                    for (let key in tableitem) {
                        if (key === Object.keys(item)[0] && Object.values(item)[0] === tableitem[key]) {
                            console.log(key, Object.keys(item)[0], Object.values(item)[0], tableitem[key]);
                            return true
                        }
                    }
                })
            }
        }
    })
    if (temp.length === 0 && first) {
        temp = tableList;
    }
    pageList.value = computedPage(temp, pageSize)
    pageActive.value = 1;
    pageBoxStyleChange()
})

</script>


<style scoped lang="scss">
.list-box {
    width: calc(100% - 2px);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    table {
        width: 100%;
        height: 100%;
        padding: 0px;
        margin: 0px;
        border-spacing: 0px;

        tr {

            td,
            th {
                text-align: center;
                font-size: 14px;
                padding: 8px 10px;
                border-bottom: 1px solid #ccc;
                border-right: 1px solid #ccc;
            }

            th {
                background-color: #eee;
            }

            &:hover {
                background-color: #f5f5f5;
            }
        }
    }
}

.page-box {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ccc;
    font-size: 14px;
    margin-top: 40px;

    .pageChangeBtn {
        width: 24px;
        height: 24px;
        margin: 0px 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: 1px solid #ccc;
        border-radius: 4px;
        transition: all .2s;

        svg {
            stroke: #ccc;
            transition: all .2s;
        }

        &:hover {
            border-color: #187cff;
            color: #187cff;

            & svg {
                stroke: #187cff;
            }
        }



    }

    .active {
        border-color: #187cff;
        color: #187cff;
    }

    .hideafter::after {
        content: '...';
        color: #ccc;
    }

    .hidebefore::before {
        content: '...';
        color: #ccc;
    }
}
</style>