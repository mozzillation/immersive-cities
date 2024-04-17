import Plyr from 'plyr-react'
import "plyr-react/plyr.css"
import { useRef } from 'react'
import styles from './Audio.module.sass'
import PropTypes from 'prop-types'
import Markdown from 'markdown-to-jsx'

export default function Audio({ title, src }) {
    const audioRef = useRef()

    let source = {
        type: 'audio',
        title: title,
        sources: [
            {
                src: src,
                type: 'audio/mp3'
            }
        ]
    }

    let options = {
        hideControls: true,
        controls: ['play', 'progress', 'current-time'],
        settings: false
    }

    return (
        <div className={styles.Audio}>
            <div className={styles.Filename}>
                <Markdown>{title}</Markdown>
            </div>
            <div className={styles.Wrapper}>
                <Plyr source={source} ref={audioRef} options={options} />
            </div>
        </div>
    )
}

Audio.propTypes = {
    title: PropTypes.string,
    src: PropTypes.string.isRequired
}
