import { useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'

import SafeplacePOI from '@/constants/enums/SafeplacePOI'
import Place from '@/constants/enums/Place'
import { VoiceoverSafeplace } from '@/constants/enums/Voiceover'

import useSafeplaceStore from '@/stores/useSafeplaceStore'
import useAudioStore from '@/stores/useAudioStore'
import useSavePOIData from '@/hooks/POI/useSavePOIData'

import ColumnLink from '@/components/Safeplace/Canvas/ColumLocation/ColumnLink/ColumnLink'

const ColumnLocation = ({
  safeplacePOI,
  columnObj,
}: {
  safeplacePOI: SafeplacePOI
  columnObj: THREE.Object3D
}) => {
  const isCurrentlyAvailable = useSafeplaceStore((state) =>
    state.isCurrentlyAvailable(safeplacePOI)
  )
  const currentPOI = useSafeplaceStore((state) => state.currentPOI)
  const isCameraTravelling = useSafeplaceStore(
    (state) => state.isCameraTravelling
  )
  const setCurrentVoiceover = useAudioStore(
    (state) => state.setCurrentVoiceover
  )
  const isVoiceoverInsidePlayed = useAudioStore((state) =>
    state.isVoiceoverPlayed(VoiceoverSafeplace.Inside)
  )
  const [isVoiceoverPlayable, setIsVoiceoverPlayable] = useState(true)

  useEffect(() => {
    if (currentPOI !== SafeplacePOI.MountainColumn || !isVoiceoverPlayable)
      return
    setIsVoiceoverPlayable(false)
    console.log('will play')
    setCurrentVoiceover(Place.Safeplace, VoiceoverSafeplace.MountainColumn)
  }, [isVoiceoverPlayable, currentPOI, isCameraTravelling])

  const showColumnLink = useMemo(
    () => isVoiceoverInsidePlayed && isCurrentlyAvailable,
    [isVoiceoverInsidePlayed, isCurrentlyAvailable]
  )

  const collider = useMemo(
    () => columnObj.children.find((obj) => obj.type === 'Mesh') as THREE.Mesh,
    []
  )

  const camera = useMemo(
    () =>
      columnObj.children
        .find((o) => o.type === 'Object3D')
        ?.children.find(
          (o) => o.type === 'PerspectiveCamera'
        ) as THREE.PerspectiveCamera,
    []
  )

  useSavePOIData(safeplacePOI, camera)

  return (
    <group
      position={columnObj.position}
      rotation={columnObj.rotation}
      scale={columnObj.scale}
    >
      <mesh
        geometry={collider.geometry}
        material={collider.material}
        visible={false}
        onClick={() => console.log(safeplacePOI)}
      />

      <ColumnLink
        safeplacePOI={safeplacePOI}
        show={showColumnLink}
        position={collider.position}
      />
    </group>
  )
}

export default ColumnLocation
