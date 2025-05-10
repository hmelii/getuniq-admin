'use client'
import { Form, DatePicker, Button, Switch, FormProps, Grid } from 'antd'
import React, { useCallback, useMemo } from 'react'
const { RangePicker } = DatePicker
import ru from 'antd/es/date-picker/locale/ru_RU'

import { useRouter, usePathname /*, useSearchParams*/ } from 'next/navigation'
import dayjs, { Dayjs } from 'dayjs'
const { useBreakpoint } = Grid

const locale: typeof ru = {
  ...ru,
  lang: {
    ...ru.lang,
    fieldDateFormat: 'DD.MM.YYYY',
    fieldDateTimeFormat: 'DD.MM.YYYY HH:mm:ss',
    yearFormat: 'YYYY',
    cellYearFormat: 'YYYY'
  }
}

type InitialValuesType = {
  register_date: Dayjs[]
  active: boolean
}

type DateType = {
  $y: number
  $M: number
  $D: number
}

type FieldType = {
  register_date: DateType[]
  active: boolean | undefined
}

interface FiltersProps {
  start_date: string | null
  end_date: string | null
  active: string | null
}
export const Filters: React.FC<FiltersProps> = ({
  start_date,
  end_date,
  active
}) => {
  const router = useRouter()
  const pathname = usePathname()
  // const searchParams: any = useSearchParams()
  const screens = useBreakpoint()

  const handleFinish: FormProps<FieldType>['onFinish'] = values => {
    const { register_date, active } = values
    const [{ $y: $y1, $M: $M1, $D: $D1 }, { $y: $y2, $M: $M2, $D: $D2 }] =
      register_date

    const params = [
      createQueryString('start_date', `${$y1}-${$M1 + 1}-${$D1}`),
      createQueryString('end_date', `${$y2}-${$M2 + 1}-${$D2}`)
    ]

    if (typeof active === 'boolean') {
      params.push(createQueryString('active', '' + active))
    }

    router.push(pathname + '?' + params.join('&'))
  }

  const handleFinishFailed: FormProps<FieldType>['onFinishFailed'] =
    errorInfo => {
      console.log('Failed:', errorInfo)
    }

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams()
    params.set(name, value)
    return params.toString()
  }, [])

  const initialValues = useMemo(() => {
    const values: InitialValuesType | object = {}

    if (start_date && end_date) {
      const [y1, M1, D1] = start_date.split('-')
      const [y2, M2, D2] = end_date.split('-')

      ;(values as InitialValuesType).register_date = [
        dayjs(`${y1}/${M1}/${D1}`),
        dayjs(`${y2}/${M2}/${D2}`)
      ]
    }

    if (active) {
      ;(values as InitialValuesType).active = active === 'true'
    }

    return values
  }, [start_date, end_date, active])

  console.log(initialValues)

  return (
    <Form
      name="filters"
      labelCol={{ span: screens.xl ? 10 : 24 }}
      wrapperCol={{ span: screens.xl ? 14 : 24 }}
      layout={screens.xl ? 'horizontal' : 'vertical'}
      disabled={false}
      initialValues={initialValues}
      style={{ maxWidth: 600 }}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name={'register_date'}
        label="Дата регистрации: "
        rules={[{ required: true, message: 'Выберите промежуток!' }]}
      >
        <RangePicker locale={locale} />
      </Form.Item>
      <Form.Item name="active" label="Активность" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Фильтровать
        </Button>
      </Form.Item>
    </Form>
  )
}
