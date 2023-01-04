import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from 'antd'
import { DownOutlined, SortDescendingOutlined, SortAscendingOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import Button from 'components/Button'
import clsx from 'clsx'
import { ORDER_BY } from 'globalConstants/sort'
import { SAVED_HOME_SHOW_OPTIONS, SAVED_HOME_SORT_OPTIONS } from '../../contants'
import s from './SortSection.module.scss'

const SortSection = () => {
  const { t } = useTranslation('savedHomePage')

  const [filterValue, setFilterValue] = useState<number[]>([1, 2, 3])
  const [sortValue, setSortValue] = useState<number>(1)
  const [orderBy, setOrderBy] = useState<ORDER_BY>('asc')

  const tagText = useMemo(
    () => (filterValue.length === SAVED_HOME_SHOW_OPTIONS.length ? t('sort.showAll') : t('sort.showSome')),
    [filterValue],
  )
  const filterTagRender = () => <span>{tagText}</span>

  const toggleOrderBy = () => {
    const order = orderBy === 'asc' ? 'desc' : 'asc'
    setOrderBy(order)
  }

  return (
    <section className={s.sortSection}>
      <div className={s.plainText}>
        <p>5 {t('mainTitle')}</p>
        <p>
          2 {t('filter.forSave')}, 1 {t('filter.pending')}, 2 {t('filter.offMarket')}
        </p>
      </div>

      <div className={s.actions}>
        <div className={s.filterSelect}>
          <Select
            style={{ width: '100%' }}
            defaultValue={filterValue}
            mode="multiple"
            showArrow
            tagRender={filterTagRender}
            showSearch={false}
            onChange={(val) => setFilterValue(val)}
            menuItemSelectedIcon={<DownOutlined />}
          >
            {SAVED_HOME_SHOW_OPTIONS.map((item) => (
              <Select.Option
                value={item.value}
                key={item.value}
                disabled={filterValue.length === 1 && filterValue[0] === item.value}
                className={s.filterSelectOption}
              >
                <p>
                  <span className={clsx('filterOptionCheckbox', 'checked')}>
                    <FontAwesomeIcon icon={faCheckSquare} />
                  </span>
                  <span className={clsx('filterOptionCheckbox', 'uncheck')} />
                  {/* @ts-ignore */}
                  {t(`${item.label}`)}
                </p>
                <span>1</span>
              </Select.Option>
            ))}
          </Select>
        </div>

        <div className={s.sortSelect}>
          <Select
            style={{ width: '100%' }}
            defaultValue={sortValue}
            onChange={(val) => setSortValue(val)}
            suffixIcon={<DownOutlined />}
          >
            {SAVED_HOME_SORT_OPTIONS.map((item) => (
              <Select.Option value={item.value} key={item.value} className={s.sortSelectOption}>
                {/* @ts-ignore */}
                {t(`${item.label}`)}
              </Select.Option>
            ))}
          </Select>
        </div>

        <Button type="link" className={s.sortButton} onClick={toggleOrderBy}>
          {orderBy === 'asc' ? <SortDescendingOutlined /> : <SortAscendingOutlined />}
        </Button>
      </div>
    </section>
  )
}

export default SortSection
