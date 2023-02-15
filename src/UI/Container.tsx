import React from 'react'

type Props = {
    children: React.ReactNode,
    className?: string
}

function Container({children, className}: Props) {
  return (
    <div className={'container mx-auto ' + className}>
        {children}
    </div>
  )
}

export default Container