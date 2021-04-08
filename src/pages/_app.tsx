import { Children, ComponentType } from 'react'
import Head from '@/components/common/Head'
import dynamic from 'next/dynamic'
import LayoutDom from '@/components/common/LayoutDom'
import '@/styles/style.scss'
import { AppProps } from 'next/dist/next-server/lib/router/router'

let LayoutCanvas: ComponentType<{ children: any }> | null = null
LayoutCanvas = dynamic(() => import('@/components/common/LayoutCanvas'), {
  ssr: false,
})

function MyApp({ Component, pageProps }: AppProps) {
  let r3fArr: any[] = []
  let compArr: any[] = []
  Children.forEach(
    (Component as any)(pageProps).props.children,
    (child: any) => {
      if (child.props && child.props.r3f) {
        r3fArr.push(child)
      } else {
        compArr.push(child)
      }
    }
  )

  return (
    <>
      <Head />
      {compArr && <LayoutDom dom={compArr} />}
      {LayoutCanvas && (
        <LayoutCanvas>{r3fArr && <group>{r3fArr}</group>}</LayoutCanvas>
      )}
    </>
  )
}

export default MyApp
