import useSafeplaceStore, { SafeplacePOI } from '@/stores/useSafeplaceStore'
import { useControls } from 'leva'
import { useEffect } from 'react'

const SafeplaceDebug = () => {
  const statePOI = useSafeplaceStore((state) => state.currentPOI)
  const setCurrentPOI = useSafeplaceStore((state) => state.setCurrentPOI)

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

  return null
}

export default SafeplaceDebug
