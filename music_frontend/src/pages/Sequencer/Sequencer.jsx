import React, { useState, useEffect } from 'react'
import Toolbar from './Components/ToolBar'
import Steps from './Components/Steps'
import TrackList from './Components/TrackList'
import PlayHead from './Components/PlayHead'
import { Provider } from './Hooks/useStore'
import useTimer from './Hooks/useTimer'
import useStyles from './Hooks/useStyles'
import './sequencer.css'

function Sequencer() {

    const baseBPMPerOneSecond = 120
    const stepsPerBar = 32
    const beatsPerBar = 4
    const barsPerSequence = 1
    const totalSteps = stepsPerBar * barsPerSequence
    const totalBeats = beatsPerBar * barsPerSequence

    const [BPM, setBPM] = useState(128)
    const [startTime, setStartTime] = useState(null)
    const [pastLapsedTime, setPastLapse] = useState(0)
    const [currentStepID, setCurrentStep] = useState(null)
    const [getNotesAreaWidthInPixels] = useStyles(totalSteps)

    const notesAreaWidthInPixels = getNotesAreaWidthInPixels(totalSteps)
    const timePerSequence = baseBPMPerOneSecond / BPM * 1000 * totalBeats
    const timePerStep = timePerSequence / totalSteps
    const isSequencePlaying = startTime !== null
    const playerTime = useTimer(isSequencePlaying)
    const lapsedTime = isSequencePlaying ? Math.max(0, playerTime - startTime) : 0
    const totalLapsedTime = pastLapsedTime + lapsedTime

    useEffect(() => {
        if (isSequencePlaying) {
            setCurrentStep(Math.floor(totalLapsedTime / timePerStep) % totalSteps)
        } else {
            setCurrentStep(null)
        }
    }, [isSequencePlaying, timePerStep, totalLapsedTime, totalSteps])

    const toolBarProps = {
        setStartTime,
        setPastLapse,
        setBPM,
        isSequencePlaying,
        startTime,
        BPM
    }

    const playHeadProps = {
        notesAreaWidthInPixels,
        timePerSequence,
        totalLapsedTime
    }

    const trackListProps = {
        currentStepID
    }

    return (
        <Provider>
            <main className="app">
                <header className="app_header">
                    <h1 className="app_title">REACT-808</h1>
                    <Toolbar {...toolBarProps} />
                </header>
                <Steps count={totalSteps} />
                <div className="app_content">
                    <PlayHead {...playHeadProps} />
                    <TrackList {...trackListProps} />
                </div>
            </main >
        </Provider>
    )
}

export default Sequencer