import React from 'react'
import { Crumbs } from '@/components/Crumbs'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes.constants'
import { HomeOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { AccountForm } from '@/components/AccountForm'
import { ACCOUNTS } from '@/data/accounts.data'
interface UserProps {
  params: Promise<{ id: number }>
}

const User: React.FC<UserProps> = async ({ params }) => {
  const { id } = await params
  const user = ACCOUNTS.find(user => user.id === +id)

  if (!user) {
    return null
  }

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
            { title: <Link href={ROUTES.ACCOUNTS}>Список аккаунтов</Link> },
            { title: id }
          ]}
        />
      </div>

      <div className={'bg-white'}>
        <Card title="Аккаунт">
          <AccountForm {...user} />
        </Card>
      </div>
    </>
  )
}
export default User
