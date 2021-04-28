import { ReactElement, ReactNode, useEffect } from 'react'
import { NextRouter, withRouter } from 'next/router'

import useJourneyStore, { JourneySection } from '@/stores/useJourneyStore'
import useSafeplaceStore, { SafeplacePOI } from '@/stores/useSafeplaceStore'
import useSceneStore, { SceneName } from '@/stores/useSceneStore'
import useUserStore from '@/stores/useUserStore'
import usePrevious from '@/hooks/usePrevious'

const ScenesRouting = ({
  router: { pathname },
}: {
  router: NextRouter
}): ReactElement<any, any> => {
  const previousPathname = usePrevious(pathname)

  const isFirstConnection = useUserStore((state) => state.isFirstConnection)

  useEffect(() => {
    const {
      mountScene,
      mountScenes,
      setRenderedScene,
      unmountAllScenes,
    } = useSceneStore.getState()

    if (pathname === '/') {
      unmountAllScenes()
      setRenderedScene(null)
    }

    if (pathname === '/onboarding') {
      const { setCurrentPOI } = useSafeplaceStore.getState()
      mountScene(SceneName.Safeplace)
      setRenderedScene(SceneName.Safeplace)
      setCurrentPOI(SafeplacePOI.OnBoarding)
    }

    if (pathname === '/safeplace') {
      const { setCurrentPOI } = useSafeplaceStore.getState()
      mountScene(SceneName.Safeplace)
      setRenderedScene(SceneName.Safeplace)
      setCurrentPOI(
        isFirstConnection == 'true'
          ? SafeplacePOI.OnBoarding
          : SafeplacePOI.Outside
      )
    }

    if (pathname === '/journey') {
      const { setSection } = useJourneyStore.getState()
      mountScenes([
        SceneName.Lake,
        SceneName.Cairns,
        SceneName.JourneyIntro,
        SceneName.Waterfall,
      ])
      setRenderedScene(SceneName.Lake)
      setSection(JourneySection.Intro)
    }
  }, [pathname])

  useEffect(() => {
    const { unmountScenes } = useSceneStore.getState()
    if (pathname == previousPathname) return
    if (previousPathname === '/journey') {
      unmountScenes([
        SceneName.Lake,
        SceneName.Cairns,
        SceneName.JourneyIntro,
        SceneName.Waterfall,
      ])
    }
  }, [previousPathname, pathname])

  return null
}

export default ScenesRouting
