'use client'
import { useState } from 'react'
import { Button, Drawer, Grid, Menu, MenuProps } from 'antd'
import {
  AuditOutlined,
  DashboardOutlined,
  MenuUnfoldOutlined,
  SolutionOutlined,
  TeamOutlined,
  WalletOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes.constants'

const { useBreakpoint } = Grid

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: '1',
    icon: <DashboardOutlined />,
    label: <Link href={ROUTES.MAIN}>Главная</Link>
    /*children: [
      { key: '11', label: 'Option 1' },
      { key: '12', label: 'Option 2' },
      { key: '13', label: 'Option 3' },
      { key: '14', label: 'Option 4' }
    ]*/
  },
  /*{
    key: '2',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
    children: [
      { key: '21', label: 'Option 1' },
      { key: '22', label: 'Option 2' },
      {
        key: '23',
        label: 'Submenu',
        children: [
          { key: '231', label: 'Option 1' },
          { key: '232', label: 'Option 2' },
          { key: '233', label: 'Option 3' }
        ]
      },
      {
        key: '24',
        label: 'Submenu 2',
        children: [
          { key: '241', label: 'Option 1' },
          { key: '242', label: 'Option 2' },
          { key: '243', label: 'Option 3' }
        ]
      }
    ]
  },*/
  {
    key: '3',
    icon: <TeamOutlined />,
    label: 'Пользователи',
    children: [
      {
        key: '31',
        icon: <TeamOutlined />,
        label: <Link href={ROUTES.USERS}>Пользователи</Link>
      },
      { key: '32', icon: <SolutionOutlined />, label: 'Лог аутентификаций' },
      { key: '33', icon: <WalletOutlined />, label: 'Кошельки' }
    ]
  },
  {
    key: '4',
    icon: <AuditOutlined />,
    label: 'Аккаунты',
    children: [
      {
        key: '41',
        icon: <AuditOutlined />,
        label: <Link href={ROUTES.ACCOUNTS}>Аккаунты</Link>
      },
      { key: '42', icon: <SolutionOutlined />, label: 'Лог аутентификаций' },
      { key: '43', icon: <WalletOutlined />, label: 'Кошельки' }
    ]
  }
]

interface LevelKeysProps {
  key?: string
  children?: LevelKeysProps[]
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {}
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach(item => {
      if (item.key) {
        key[item.key] = level
      }
      if (item.children) {
        func(item.children, level + 1)
      }
    })
  }
  func(items1)
  return key
}

const levelKeys = getLevelKeys(items as LevelKeysProps[])

export const SideMenu = () => {
  const [open, setOpen] = useState(false)

  const screens = useBreakpoint()

  const [stateOpenKeys, setStateOpenKeys] = useState(['1'])

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const onOpenChange: MenuProps['onOpenChange'] = openKeys => {
    const currentOpenKey = openKeys.find(
      key => stateOpenKeys.indexOf(key) === -1
    )
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter(key => key !== currentOpenKey)
        .findIndex(key => levelKeys[key] === levelKeys[currentOpenKey])

      setStateOpenKeys(
        openKeys
          // remove repeat key

          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter(key => levelKeys[key] <= levelKeys[currentOpenKey])
      )
    } else {
      // close
      setStateOpenKeys(openKeys)
    }
  }

  const menuProps = stateOpenKeys.length ? { openKeys: stateOpenKeys } : {}

  if (screens.xl) {
    return (
      <Menu
        mode="inline"
        /*defaultSelectedKeys={
        [
          /!*'231'*!/
        ]
      }*/
        onOpenChange={onOpenChange}
        style={{ width: 256 }}
        items={items}
        {...menuProps}
      />
    )
  }

  return (
    <>
      <Button
        onClick={showDrawer}
        type={'default'}
        icon={<MenuUnfoldOutlined />}
      />
      <Drawer
        title="Главное меню"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={onClose}
        open={open}
        placement={'left'}
      >
        <Menu
          mode="inline"
          /*defaultSelectedKeys={
        [
          /!*'231'*!/
        ]
      }*/
          onOpenChange={onOpenChange}
          onSelect={onClose}
          items={items}
          {...menuProps}
        />
      </Drawer>
    </>
  )
}
