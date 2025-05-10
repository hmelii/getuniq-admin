import React from 'react'

import { Crumbs } from '@/components/Crumbs'
import { HomeOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes.constants'
import { AccountTable } from '@/components/AccountTable'
import { Filters } from '@/components/Filters'
import { Card } from 'antd'
import { ACCOUNTS } from '@/data/accounts.data'

interface UsersProps {
  searchParams: Promise<{
    start_date: string
    end_date: string
    active: string
  }>
}
const Accounts: React.FC<UsersProps> = async ({ searchParams }) => {
  const {
    start_date = null,
    end_date = null,
    active = null
  } = await searchParams
  return (
    <>
      <div className={'mb-3'}>
        <Crumbs
          items={[
            {
              title: (
                <Link href={ROUTES.MAIN}>
                  <HomeOutlined />
                </Link>
              )
            },
            { title: 'Список аккаунтов' }
          ]}
        />
      </div>
      <div className={'bg-white mb-3'}>
        <Card title="Фильтры">
          <Filters
            start_date={start_date}
            end_date={end_date}
            active={active}
          />
        </Card>
      </div>
      <div className={'bg-white'}>
        <Card title="Данные">
          <AccountTable data={ACCOUNTS} />
        </Card>
      </div>
    </>
  )
}

export default Accounts
