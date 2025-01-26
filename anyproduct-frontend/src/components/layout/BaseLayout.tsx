// Libraries imports
import { FC, ReactNode, useState, useEffect } from 'react'

// App level imports
import HeaderNavigationBar from './navigationBar/HeaderNavigationBar'

type BaseLayoutProps = {
  children: ReactNode
}

const Layout: FC<BaseLayoutProps> = ({ children }) => {
  const [hydrate, setHydrate] = useState(false)

  useEffect(() => { setHydrate(true) }, [])

  if (!hydrate) {
    return null
  }

  return (
    <>
      <HeaderNavigationBar />
      <section className="pages">{children}</section>
    </>
  )
}

export default Layout
