import { ReactElement, useEffect, useRef } from 'react'
import { NextRouter } from 'next/router'

import useJourneyStore from '@/stores/useJourneyStore'
import useSafeplaceStore from '@/stores/useSafeplaceStore'
import useSceneStore from '@/stores/useSceneStore'
import usePrevious from '@/hooks/usePrevious'
import SceneName from '@/constants/enums/SceneName'
import SafeplacePOI from '@/constants/enums/SafeplacePOI'
import JourneySection from '@/constants/enums/JourneySection'
import Routes from '@/constants/enums/Routes'

const ScenesRouting = ({
  router: { pathname },
}: {
  router: NextRouter
}): ReactElement<any, any> => {
  const previousPathname = usePrevious(pathname)
  const inTransition = useSceneStore((s) => s.inTransition)

  const scenesToUnmounts = useRef<SceneName[]>([])

  useEffect(() => {
    const {
      mountScene,
      mountScenes,
      setRenderedScene,
    } = useSceneStore.getState()

    if (pathname === Routes.Index) {
      mountScene(SceneName.Safeplace)
      setRenderedScene(null)
    }

    if (pathname === Routes.OnBoarding) {
      const { setCurrentPOI } = useSafeplaceStore.getState()
      mountScene(SceneName.Safeplace)
      setRenderedScene(SceneName.Safeplace)
      setCurrentPOI(SafeplacePOI.OnBoarding)
    }

    if (pathname === Routes.Safeplace) {
      const { setCurrentPOI } = useSafeplaceStore.getState()
      mountScene(SceneName.Safeplace)
      setRenderedScene(SceneName.Safeplace)
      setCurrentPOI(SafeplacePOI.Inside)
    }

    if (pathname === Routes.MountainColumn) {
      const { setCurrentPOI } = useSafeplaceStore.getState()
      mountScene(SceneName.Safeplace)
      setRenderedScene(SceneName.Safeplace)
      setCurrentPOI(SafeplacePOI.MountainColumn)
    }

    if (pathname === Routes.BridgeColumn) {
      const { setCurrentPOI } = useSafeplaceStore.getState()
      mountScene(SceneName.Safeplace)
      setRenderedScene(SceneName.Safeplace)
      setCurrentPOI(SafeplacePOI.BridgeColumn)
    }

    if (pathname === Routes.Resources) {
      const { setCurrentPOI } = useSafeplaceStore.getState()
      mountScene(SceneName.Safeplace)
      setRenderedScene(SceneName.Safeplace)
      setCurrentPOI(SafeplacePOI.Resources)
    }

    if (pathname === Routes.ResourcesFocus) {
      const { setCurrentPOI } = useSafeplaceStore.getState()
      mountScene(SceneName.Safeplace)
      setRenderedScene(SceneName.Safeplace)
      setCurrentPOI(SafeplacePOI.ResourceFocused)
    }

    if (pathname === Routes.Journey) {
      const { setSection } = useJourneyStore.getState()
      mountScenes([
        SceneName.Lake,
        SceneName.Cairns,
        SceneName.JourneyIntro,
        SceneName.Waterfall,
      ])
      setRenderedScene(SceneName.JourneyIntro)
      setSection(JourneySection.Intro)
    }
  }, [pathname])

  useEffect(() => {
    const { setCurrentPOI } = useSafeplaceStore.getState()
    if (pathname == previousPathname) return
    if (previousPathname === Routes.Journey) {
      scenesToUnmounts.current.push(
        SceneName.Lake,
        SceneName.Cairns,
        SceneName.JourneyIntro,
        SceneName.Waterfall
      )
    }
    if (previousPathname === Routes.OnBoarding) {
      setCurrentPOI(SafeplacePOI.Outside)
    }
  }, [previousPathname, pathname])

  useEffect(() => {
    if (inTransition) return
    const { unmountScenes } = useSceneStore.getState()
    unmountScenes(scenesToUnmounts.current)
    scenesToUnmounts.current = []
  }, [inTransition])

  return null
}

export default ScenesRouting
