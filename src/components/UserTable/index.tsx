'use client'
import React, { useRef, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import {
  Button,
  Input,
  InputRef,
  Space,
  Table,
  TableColumnsType,
  TableColumnType,
  Tag
} from 'antd'
import type { FilterDropdownProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes.constants'
import { DataIndex, DataType } from '@/data/users.data'
import dayjs from 'dayjs'
import { createStyles } from 'antd-style'

interface TableProps {
  data: DataType[]
}

const useStyle = createStyles(({ css, prefixCls }) => {
  return {
    customTable: css`
      ${prefixCls}-table {
        ${prefixCls}-table-container {
          ${prefixCls}-table-body,
          ${prefixCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `
  }
})

export const UserTable: React.FC<TableProps> = ({ data }) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)
  const { styles } = useStyle()

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
      /*close*/
    }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Поиск
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Сбросить
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close()
            }}
          >
            close
          </Button>*/}
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100)
        }
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })

  const columns: TableColumnsType<DataType> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: '3%',
      fixed: 'left',
      rowScope: 'row',

      render: (id /*, record, index*/) => {
        return <Link href={ROUTES.USER.replace(':id', id)}>{id}</Link>
      }
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      minWidth: 150,
      sorter: (a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      },
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('name')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      minWidth: 150,
      ...getColumnSearchProps('email')
    },
    {
      title: 'Активность',
      dataIndex: 'active',
      key: 'index',
      width: '10%',
      minWidth: 150,
      render: (value /*, record, index*/) => {
        const color = value ? 'green' : 'red'

        return <Tag color={color}>{value ? 'Активен' : 'Неактивен'}</Tag>
      }
    },
    {
      title: 'Дата регистрации',
      dataIndex: 'register_date',
      key: 'register_date',
      width: '10%',
      minWidth: 150,
      render: (value /*, record, index*/) => {
        return dayjs(value).format('DD.MM.YYYY')
      }
    }
  ]

  return (
    <Table<DataType>
      className={styles.customTable}
      columns={columns}
      dataSource={data}
      scroll={{ x: 'max-content' }}
      bordered
    />
  )
}
