import clsx from 'clsx'
import React, { ReactNode } from 'react'
import s from './SearchFormSection.module.scss'

type SearchFormSectionProps = {
  className?: string
  children: ReactNode
}

const SearchFormSection = ({ className = '', children, ...props }: SearchFormSectionProps) => (
  <section className={clsx(s.formSection, className)} {...props}>
    {children}
  </section>
)

export default SearchFormSection
