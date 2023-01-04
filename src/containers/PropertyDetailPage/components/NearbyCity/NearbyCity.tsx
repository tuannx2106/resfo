import React from 'react'
import Link from 'next/link'
import s from './NearbyCity.module.scss'

const NearbyCity = () => (
  <ul className={s.root}>
    <li>
      <Link href="/">Buffalo Real estate</Link>
    </li>
    <li>
      <Link href="/">Depew Real estate</Link>
    </li>
    <li>
      <Link href="/">East Amherst Real estate</Link>
    </li>
    <li>
      <Link href="/">East Aurora Real estate</Link>
    </li>
    <li>
      <Link href="/">Grand Island Real estate</Link>
    </li>
    <li>
      <Link href="/">Hamburg Real estate</Link>
    </li>
    <li>
      <Link href="/">Lancaster Real estate</Link>
    </li>
    <li>
      <Link href="/">Orchard Park Real estate</Link>
    </li>
    <li>
      <Link href="/">Tonawanda Real estate</Link>
    </li>
    <li>
      <Link href="/">Williamsville Real estate</Link>
    </li>
    <li>
      <Link href="/">Williamsville Real estate</Link>
    </li>
    <li>
      <Link href="/">Williamsville Real estate</Link>
    </li>
  </ul>
)

export default NearbyCity
