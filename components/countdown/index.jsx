import styles from './Countdown.module.sass'
import { useRouter } from 'next/router'
import { getKeyByValue } from '@utils'
import PropTypes from 'prop-types'
import Markdown from 'markdown-to-jsx'
import { Component } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { motion } from 'framer-motion'

function leftPad(number) {
    var output = number + ''
    while (output.length < 2) {
        output = '0' + output
    }
    return output
}

function secondsToDhms(seconds) {
    seconds = Number(seconds)
    var d = Math.floor(seconds / (3600 * 24))
    var h = Math.floor((seconds % (3600 * 24)) / 3600)
    var m = Math.floor((seconds % 3600) / 60)
    var s = Math.floor(seconds % 60)

    var dDisplay = leftPad(d) + (d === 1 ? 'd ' : 'd ')
    var hDisplay = leftPad(h) + (h === 1 ? 'h ' : 'h ')
    var mDisplay = leftPad(m) + (m === 1 ? 'm ' : 'm ')
    var sDisplay = leftPad(s) + (s === 1 ? 's' : 's')
    return dDisplay + hDisplay + mDisplay + sDisplay
}

export default function Countdown({ letter, setVisible }) {
    const router = useRouter()
    const { locale } = router
    const currentTrans = getKeyByValue(letter, locale)

    return (
        <motion.div className={styles.Countdown}>
            <div className={styles.Wrapper}>
                <Counter setVisible={setVisible} text={currentTrans} />
            </div>
        </motion.div>
    )
}

Countdown.propTypes = {
    letter: PropTypes.object,
    setVisible: PropTypes.func
}

class Counter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            time: 0,
            isLoaded: false
        }

        this.updateTime = this.updateTime.bind(this)
    }

    componentDidMount() {
        dayjs.extend(utc)
        dayjs.extend(timezone)

        this.interval = setInterval(() => this.updateTime(), 1000)
    }

    updateTime() {
        const now = dayjs()
        const stopTime = dayjs('2020-12-23 17:30').tz('Australia/Melbourne')

        this.countdownHasFinished = now.isAfter(stopTime)

        if (this.countdownHasFinished) {
            this.props.setVisible()
            this.setState({ time: 0, isLoaded: true })
            return
        }

        this.remainingSeconds = stopTime.diff(dayjs(), 'second')

        this.setState({ time: this.remainingSeconds, isLoaded: true })
    }

    render() {
        return (
            <>
                <motion.div
                    className={styles.Counter}
                    animate={{
                        color: this.state.isLoaded ? '#ffffff' : '#000000'
                    }}
                >
                    {secondsToDhms(this.state.time)}
                </motion.div>

                <motion.div
                    className={styles.Letter}
                    animate={{
                        color: this.state.isLoaded ? '#ffffff' : '#000000'
                    }}
                >
                    <Markdown>{this.props.text}</Markdown>
                </motion.div>
            </>
        )
    }
}

Counter.propTypes = {
    text: PropTypes.string,
    setVisible: PropTypes.func
}
