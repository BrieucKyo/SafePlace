import create from 'zustand'
import { Howl } from 'howler'

import SCENES_AMBIANTS from '@/constants/SCENES_AMBIANT'
import SceneName from '@/constants/enums/SceneName'

type AudioStore = {
  ambiantHowlMap: Map<SceneName, Howl>
  onceAudioMap: Map<string, Howl>
  initAudio: (
    url: string,
    params?: Omit<ConstructorParameters<typeof Howl>[0], 'src'>
  ) => Howl
  isMuted: boolean
  setMuted: (b: boolean) => void
}

const useAudioStore = create<AudioStore>((set, get) => ({
  ambiantHowlMap: new Map<SceneName, Howl>(
    Object.entries(SCENES_AMBIANTS).map(([sceneName, url]) => [
      sceneName as SceneName,
      new Howl({ src: [url], loop: true, autoplay: true, volume: 0 }),
    ])
  ),
  onceAudioMap: new Map<string, Howl>(),
  initAudio: (
    url: string,
    params: Omit<ConstructorParameters<typeof Howl>[0], 'src'> = {}
  ) => {
    const { onceAudioMap } = get()

    let howl = onceAudioMap.get(url)
    if (howl !== undefined) return howl

    howl = new Howl({ src: [url], rate: 1, ...params })
    onceAudioMap.set(url, howl)
    set({ onceAudioMap })

    return howl
  },
  isMuted: false,
  setMuted: (b: boolean) => set({ isMuted: b }),
}))

// window.useAudioStore = useAudioStore

export default useAudioStore
