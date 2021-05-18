import * as THREE from 'three'
import shallow from 'zustand/shallow'
import React, { Fragment, Suspense, useEffect, useMemo, useRef } from 'react'
import { Camera, useFrame, useThree } from 'react-three-fiber'
import useSceneStore, { SceneData } from '@/stores/useSceneStore'
import TransitionScene from './TransitionScene/TransitionScene'
import SceneName from '@/constants/enums/SceneName'
import useSceneTransition from './useSceneTransition'

const Scenes = () => {
  const { size, gl } = useThree()

  const inTransition = useSceneStore((s) => s.inTransition)
  const transitionScene = useMemo(() => new THREE.Scene(), [])
  const transitionCam = useRef<THREE.Camera>(null)

  const { renderedSceneData, inProgress, outProgress } = useSceneTransition()

  const mountedSceneData = useSceneStore(
    (s) =>
      Object.fromEntries(
        s.mountedScenes.map((name) => [name, s.scenesData[name]])
      ),
    shallow
  )
  const setSceneLoaded = useSceneStore((s) => s.setSceneLoaded)

  const transitionTarget = useRef(
    new THREE.WebGLRenderTarget(size.width, size.height, {
      encoding: THREE.sRGBEncoding,
    })
  )
  useEffect(() => transitionTarget.current.setSize(size.width, size.height), [
    size,
  ])

  // Prerender a scene when it loads to avoid transition flicker
  useEffect(() => {
    let lastLoadedScenes: SceneData[] = []
    let nullRenderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight
    )
    return useSceneStore.subscribe(
      (scenes: SceneData[]) => {
        for (const s of scenes) {
          if (lastLoadedScenes.includes(s)) return
          gl.setRenderTarget(nullRenderTarget)
          gl.render(s.scene, s.cameraRef.current)
          gl.setRenderTarget(null)
        }
      },
      (s) => Object.values(s.scenesData).filter((s) => s.isLoaded),
      shallow
    )
  })

  useFrame(({ gl, camera, setDefaultCamera }) => {
    if (
      renderedSceneData?.cameraRef?.current != null &&
      renderedSceneData.cameraRef.current !== camera
    )
      setDefaultCamera(renderedSceneData.cameraRef.current as Camera)

    gl.autoClear = true
    gl.setRenderTarget(inTransition ? transitionTarget.current : null)
    if (renderedSceneData !== null)
      gl.render(renderedSceneData.scene, renderedSceneData.cameraRef.current)
    if (inTransition) {
      gl.setRenderTarget(null)
      gl.render(transitionScene, transitionCam.current)
    }
  }, 100)

  return (
    <>
      {Object.entries(mountedSceneData).map(
        ([name, { Component, scene, cameraRef }]) => (
          <Fragment key={scene.uuid}>
            <Suspense fallback={'loading'}>
              <Component
                scene={scene}
                ref={(ref: THREE.Camera) => {
                  cameraRef.current = ref
                  setSceneLoaded(name as SceneName, cameraRef.current !== null)
                }}
              />
            </Suspense>
          </Fragment>
        )
      )}
      <TransitionScene
        scene={transitionScene}
        ref={transitionCam}
        inTransition={inTransition}
        renderTarget={transitionTarget.current}
        inProgress={inProgress}
        outProgress={outProgress}
      />
    </>
  )
}

export default React.memo(Scenes)
