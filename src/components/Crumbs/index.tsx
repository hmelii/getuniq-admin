import { Breadcrumb } from 'antd'
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb'
import React from 'react'

interface CrumbsProps {
  items: BreadcrumbItemType[]
}

export const Crumbs: React.FC<CrumbsProps> = ({ items = [] }) => {
  return (
    <div className={' px-4 xl:px-0'}>
      <Breadcrumb items={items} />
    </div>
  )
}
