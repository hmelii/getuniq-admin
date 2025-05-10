import React from 'react'

import { Crumbs } from '@/components/Crumbs'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes.constants'
import { HomeOutlined } from '@ant-design/icons'

const Home: React.FC = () => {
  return (
    <>
      <div className={'mb-[10px]'}>
        <Crumbs
          items={[
            {
              title: (
                <Link href={ROUTES.MAIN}>
                  <HomeOutlined />
                </Link>
              )
            }
          ]}
        />
      </div>
      <div className={'bg-white'}>Главная</div>
    </>
  )
}

export default Home
