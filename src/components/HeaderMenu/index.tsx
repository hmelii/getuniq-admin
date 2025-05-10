'use client'
import { Badge, Button, Menu, MenuProps, Grid, Drawer } from 'antd'
import { DashboardOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { useBreakpoint } = Grid

const items1: MenuProps['items'] = [
  {
    icon: <DashboardOutlined />,
    key: 1,
    label: (
      <>
        <span>Отклоненные переводы</span>

        <span className={'ml-[10px]'}>
          <Badge
            count={11}
            showZero
            style={{ backgroundColor: '#fff', color: '#000' }}
          />
        </span>
      </>
    )
  },
  {
    icon: <DashboardOutlined />,
    key: 2,
    label: (
      <>
        <span>Отклоненные платежи</span>
        <span className={'ml-[10px]'}>
          <Badge
            count={12}
            showZero
            style={{ backgroundColor: '#fff', color: '#000' }}
          />
        </span>
      </>
    )
  },
  {
    icon: <DashboardOutlined />,
    key: 3,
    label: (
      <>
        <span>Создать аккаунты</span>
        <span className={'ml-[10px]'}>
          <Badge
            count={14}
            showZero
            style={{ backgroundColor: '#fff', color: '#000' }}
          />
        </span>
      </>
    )
  }
]

export const HeaderMenu = () => {
  const screens = useBreakpoint()
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  if (screens.xl) {
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={items1}
        style={{ flex: 1, minWidth: 0 }}
      />
    )
  }

  return (
    <>
      <Button
        onClick={showDrawer}
        type={'default'}
        icon={<MenuFoldOutlined />}
      />
      <Drawer
        title="Меню"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={onClose}
        open={open}
      >
        <Menu
          theme="light"
          mode="vertical"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Drawer>
    </>
  )
}
