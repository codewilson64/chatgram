import React from 'react'

const Container = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className='max-w-[1280px] w-full mx-auto pb-4 relative'>
      {children}
    </div>
  )
}

export default Container