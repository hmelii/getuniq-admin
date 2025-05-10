'use client'
import { DatePicker, Form, Input, Switch } from 'antd'
import React from 'react'
import dayjs from 'dayjs'
import { DataType } from '@/data/users.data'

export const AccountForm: React.FC<DataType> = ({ register_date, ...user }) => {
  return (
    <Form
      initialValues={{
        ...user,
        register_date: dayjs(register_date.split('-').join('/'))
      }}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      disabled={false}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name={'id'} label="Id">
        <Input readOnly />
      </Form.Item>
      <Form.Item name={'name'} label="Аккаунт">
        <Input />
      </Form.Item>
      <Form.Item name={'email'} label="email">
        <Input type={'email'} />
      </Form.Item>
      <Form.Item name={'active'} label="Активный">
        <Switch />
      </Form.Item>
      <Form.Item name={'register_date'} label="Дата регистрации">
        <DatePicker />
      </Form.Item>
    </Form>
  )
}
