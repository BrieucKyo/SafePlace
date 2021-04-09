import React, { ReactNode } from 'react'
import LayoutBottom from '@/components/common/UI/LayoutBottom'
import LayoutSound from '@/components/common/UI/LayoutSound'
import DebugNavigation from './DebugNavigation'

const LayoutDom = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <DebugNavigation />
      <div className='dom font-serif relative h-screen w-screen z-10 pointer-events-none'>
        <LayoutBottom>
          <div id='layout-bottom-left'></div>
          <div id='layout-bottom-right'>
            <LayoutSound />
          </div>
        </LayoutBottom>
        {children}
      </div>
    </>
  )
}

export default LayoutDom
