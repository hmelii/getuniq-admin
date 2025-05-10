'use client'
import { Flex, Grid } from 'antd'
import { SideMenu } from '@/components/SideMenu'
import { HeaderMenu } from '@/components/HeaderMenu'
import { FC } from 'react'
const { useBreakpoint } = Grid
interface MainProps {
  children: React.ReactNode
}
export const Main: FC<MainProps> = ({ children = null }) => {
  const screens = useBreakpoint()

  return (
    <main className={'flex flex-col min-h-screen bg-[#f5f5f5]'}>
      <header
        className={
          'flex justify-between xl:justify-items-start items-center h-[64px] bg-[#001529] px-4 xl:px-8'
        }
      >
        <Flex gap={16}>
          {!screens.xl && <SideMenu />}
          <div
            className={
              'w-[120px] mr-[100px] h-[32px] bg-[rgba(255,255,255,.2)]'
            }
          />
        </Flex>

        <HeaderMenu />
      </header>
      <div className={` ${screens.xl ? 'flex flex-auto' : ''}`}>
        {screens.xl && (
          <aside
            className={'bg-white flex-[0 0 256] min-w-[256px] max-w-[256px]'}
          >
            <SideMenu />
          </aside>
        )}
        <section className={'flex-auto py-4 xl:p-8'}>{children}</section>
      </div>
    </main>
  )
}
