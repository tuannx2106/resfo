import { Table } from 'antd'
import React, { ReactNode, useEffect, useState } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import s from './PriceHistory.module.scss'

type Column = {
  title: string
  dataIndex: string
  render?: (val: Record<string, string>) => ReactNode
  width: string
}

const dataTable = [
  {
    key: 1,
    date: {
      date: '07/11/2012',
      event: 'Sold',
      source: 'Public Records',
    },
    price: '$2,077,000',
    event: 'Sold',
    source: 'Public Records',
    expandInfo: {
      recordingDateTitle: 'Recording Date',
      recordingDateContent: '07/11/2012',
      contractDateTitle: 'Contract Date',
      contractDateContent: '07/05/2012',
      countyTransferTaxTitle: 'County Transfer Tax',
      countyTransferTaxContent: 'N/A',
      totalTransferTaxTitle: 'Total Transfer Tax',
      totalTransferTaxContent: 'N/A',
    },
  },
  {
    key: 2,
    date: {
      date: '07/11/2012',
      event: 'Listed for sale',
      source: 'Agent Provided',
    },
    price: '$2,077,000',
    event: 'Listed for sale',
    source: 'Agent Provided',
    expandInfo: {
      recordingDateTitle: 'Recording Date',
      recordingDateContent: '07/11/2012',
      contractDateTitle: 'Contract Date',
      contractDateContent: '07/05/2012',
      countyTransferTaxTitle: 'County Transfer Tax',
      countyTransferTaxContent: 'N/A',
      totalTransferTaxTitle: 'Total Transfer Tax',
      totalTransferTaxContent: 'N/A',
    },
  },
  {
    key: 3,
    date: {
      date: '07/11/2012',
      event: 'Sold',
      source: 'Public Records',
    },
    price: '$2,077,000',
    event: 'Sold',
    source: 'Public Records',
    expandInfo: {
      recordingDateTitle: 'Recording Date',
      recordingDateContent: '07/11/2012',
      contractDateTitle: 'Contract Date',
      contractDateContent: '07/05/2012',
      countyTransferTaxTitle: 'County Transfer Tax',
      countyTransferTaxContent: 'N/A',
      totalTransferTaxTitle: 'Total Transfer Tax',
      totalTransferTaxContent: 'N/A',
    },
  },
  {
    key: 4,
    date: {
      date: '07/11/2012',
      event: 'Sold',
      source: 'Public Records',
    },
    price: '$2,077,000',
    event: 'Sold',
    source: 'Public Records',
    expandInfo: {
      recordingDateTitle: 'Recording Date',
      recordingDateContent: '07/11/2012',
      contractDateTitle: 'Contract Date',
      contractDateContent: '07/05/2012',
      countyTransferTaxTitle: 'County Transfer Tax',
      countyTransferTaxContent: 'N/A',
      totalTransferTaxTitle: 'Total Transfer Tax',
      totalTransferTaxContent: 'N/A',
    },
  },
]

const defaultColumns: Column[] = [
  {
    title: 'Date',
    dataIndex: 'date',
    render: (record: Record<string, string>) => (
      <div className={s.expandDateColumn}>
        <p>{record.date}</p>
        <p>{record.event}</p>
        <p>{record.source}</p>
      </div>
    ),
    width: '25%',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    width: '25%',
  },
  {
    title: 'Event',
    dataIndex: 'event',
    width: '25%',
  },
  {
    title: 'Source',
    dataIndex: 'source',
    width: '25%',
  },
]

const PriceHistory = () => {
  const [columns, setColumns] = useState<Column[]>(defaultColumns)

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth

      // @mixin mediaquery-pc() 1007
      if (windowWidth < 1007) {
        setColumns(columns.filter((item: Column) => item.dataIndex === 'date'))
      } else {
        setColumns(defaultColumns)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Table
      className={s.root}
      pagination={false}
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <div className={s.expandRow}>
            <div className={s.expandRowItem}>
              <p>{record.expandInfo.recordingDateTitle}</p>
              <p>{record.expandInfo.recordingDateContent}</p>
            </div>

            <div className={s.expandRowItem}>
              <p>{record.expandInfo.contractDateTitle}</p>
              <p>{record.expandInfo.contractDateContent}</p>
            </div>

            <div className={s.expandRowItem}>
              <p>{record.expandInfo.countyTransferTaxTitle}</p>
              <p>{record.expandInfo.countyTransferTaxContent}</p>
            </div>

            <div className={s.expandRowItem}>
              <p>{record.expandInfo.totalTransferTaxTitle}</p>
              <p>{record.expandInfo.totalTransferTaxContent}</p>
            </div>
          </div>
        ),
        // eslint-disable-next-line no-confusing-arrow
        expandIcon: ({ expanded, onExpand, record }) =>
          expanded ? (
            <div className={s.action}>
              <p className={s.actionPrice}>$2.06M</p>
              <div role="presentation" className={s.expandBtn} onClick={(e) => onExpand(record, e)}>
                <UpOutlined />
              </div>
            </div>
          ) : (
            <div className={s.action}>
              <p className={s.actionPrice}>$2.06M</p>
              <div role="presentation" className={s.expandBtn} onClick={(e) => onExpand(record, e)}>
                <DownOutlined />
              </div>
            </div>
          ),
      }}
      expandIconColumnIndex={4}
      dataSource={dataTable}
      bordered
    />
  )
}

export default PriceHistory
