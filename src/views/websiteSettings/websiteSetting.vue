<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableColumn } from '@/components/Table'
import { getTableListApi } from '@/api/table'
import { TableData } from '@/api/table/types'
import { ref, h } from 'vue'
import { ElTag, ElCard, ElDivider, ElIcon } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'
import styles from './index.module.scss'

interface Params {
  pageIndex?: number
  pageSize?: number
}

const { t } = useI18n()

const columns: TableColumn[] = [
  {
    field: 'title',
    label: t('tableDemo.title')
  },
  {
    field: 'author',
    label: t('tableDemo.author')
  },
  {
    field: 'display_time',
    label: t('tableDemo.displayTime'),
    sortable: true
  },
  {
    field: 'importance',
    label: t('tableDemo.importance'),
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return h(
        ElTag,
        {
          type: cellValue === 1 ? 'success' : cellValue === 2 ? 'warning' : 'danger'
        },
        () =>
          cellValue === 1
            ? t('tableDemo.important')
            : cellValue === 2
              ? t('tableDemo.good')
              : t('tableDemo.commonly')
      )
    }
  },
  {
    field: 'pageviews',
    label: t('tableDemo.pageviews')
  },
  {
    field: 'action',
    label: t('tableDemo.action'),
    slots: {
      default: (data) => {
        return <span>8888</span>
      }
    }
  }
]

const loading = ref(true)

const tableDataList = ref<TableData[]>([])

const getTableList = async (params?: Params) => {
  const res = await getTableListApi(
    params || {
      pageIndex: 1,
      pageSize: 10
    }
  )
    .catch(() => {})
    .finally(() => {
      loading.value = false
    })
  if (res) {
    tableDataList.value = res.data.list
  }
}

getTableList()

const actionFn = (data: any) => {
  console.log(data)
}
// el-card
// “正常”、“未接入”、“配置失败”、“回源失败”
const cardsType = ref([
  {
    name: '域名总数',
    total: 1,
    activeNum: 1,
    notActiveNum: 1,
    failedNum: 1,
    unreachableNum: 2
  },
  {
    name: '未防护域名',
    total: 1,
    activeNum: 1,
    notActiveNum: 1,
    failedNum: 1,
    unreachableNum: 2
  }
])
const statusList = ref([
  { name: '正常', count: 1, color: '#67C23A' },
  { name: '未接入', count: 2, color: '#E6A23C' },
  { name: '配置失败', count: 3, color: '#F56C6C' },
  { name: '回源失败', count: 1, color: '#909399' }
])
</script>

<template>
  <ContentWrap :title="t('tableDemo.table')" :message="t('tableDemo.tableDes')">
    <div class="flex w-full mb-4">
      <!-- <ElCard class="flex-1 mr-4 h-100px"> Hover </ElCard>
      <ElCard class="flex-1 h-100px"> Hover </ElCard> -->
      <ElCard
        :class="[
          'flex-1 h-24 flex items-center p-4',
          index !== cardsType.length - 1 ? 'mr-24' : ''
        ]"
        body-class="flex items-center"
        v-for="(item, index) in cardsType"
        :key="index"
      >
        <!-- 左边块 -->
        <div class="flex-shrink-0">
          <p>{{ item.name }}</p>
          <p>{{ item.total }}</p>
        </div>

        <!-- 分割线 -->
        <div class="w-px bg-gray-300 mx-4 h-30px"></div>

        <!-- 右边状态列表 -->
        <div class="flex items-center space-x-4 flex-1">
          <div v-for="status in statusList" :key="status.name" class="flex items-center space-x-2">
            <span
              class="inline-block w-2.5 h-2.5 rounded-full"
              :style="{ backgroundColor: status.color }"
            ></span>
            <span class="text-sm">
              {{ status.name }} <b>{{ status.count }}</b>
            </span>
          </div>

          <!-- 箭头图标 -->
          <el-icon><ArrowRight /></el-icon>
        </div>
      </ElCard>
    </div>
    <Table
      :columns="columns"
      :data="tableDataList"
      :loading="loading"
      :defaultSort="{ prop: 'display_time', order: 'descending' }"
    />
  </ContentWrap>
</template>
