import { useState, useEffect, useCallback } from 'react'
import Sound from '../Utils/Sound'

const useSound = (soundFilePath) => {
    const [sound, setSound] = useState({ play: () => { } })
    const play = useCallback(() => sound.play(), [sound])

    useEffect(() => {
        setSound(new Sound(soundFilePath))

    }, [soundFilePath])

    return [play]
}

export default useSound