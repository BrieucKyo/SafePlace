import { Suspense, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useControls } from 'leva'

import useSafeplaceStore, { SafeplacePOI } from '@/stores/useSafeplaceStore'

import SafeplaceModel from '@/components/Safeplace/SafeplaceModel'
import SafeplaceSky from '@/components/Safeplace/SafeplaceSky'
import SafeplaceGround from '@/components/Safeplace/SafeplaceGround/SafeplaceGround'
import SafeplaceInsideHouse from '@/components/Safeplace/SafeplaceInsideHouse'

import Waterfall from '../canvas/Waterfall/Waterfall'
import Grass from '../canvas/Grass/Grass'

const SafeplaceCanvas = () => {
  const statePOI = useSafeplaceStore((state) => state.currentPOI)
  const setCurrentPOI = useSafeplaceStore((state) => state.setCurrentPOI)
  const setPOIData = useSafeplaceStore((state) => state.setPOIData)

  /**
   * Debug
   */
  const [{ currentPOI }, set] = useControls('safeplace', () => ({
    currentPOI: {
      value: statePOI,
      options: SafeplacePOI,
    },
  }))

  useEffect(() => {
    setCurrentPOI(currentPOI)
  }, [currentPOI])
  useEffect(
    () =>
      useSafeplaceStore.subscribe(
        (n: SafeplacePOI) => set({ currentPOI: n }),
        (s) => s.currentPOI
      ),
    []
  )

  /**
   * SET POIS POSITION
   */
  useEffect(() => {
    setPOIData(SafeplacePOI.OnBoarding, {
      position: new THREE.Vector3(0, 6, 50),
    })
    setPOIData(SafeplacePOI.Inside, {
      position: new THREE.Vector3(0, 6, 0),
    })
  }, [])

  return (
    <>
      <Suspense fallback={null}>
        <SafeplaceSky />
        <pointLight position={[0, 20, 0]} />
        <SafeplaceInsideHouse />
        <SafeplaceModel />
        {/* <SafeplaceGround /> */}
        <Waterfall position={[-50, 6, 0]} rotation={[0, 45, 0]} />
        <Grass position={[0, -0.2, -60]} />
      </Suspense>
    </>
  )
}

export default SafeplaceCanvas
