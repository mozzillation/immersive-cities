import React, { Component, createRef } from 'react'
import { motion } from 'framer-motion'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { calcWinsize } from '@utils'
import styles from './Space.module.sass'
import Link from 'next/link'
import { getKeyByValue } from '@utils'
import PropTypes from 'prop-types'

export default class Space extends Component {
    constructor(props) {
        super(props)

        this.onHover = this.onHover.bind(this)
        this.onLeave = this.onLeave.bind(this)

        this.cursorRef = createRef()
        this.state = {
            screenWidth: 0,
            screenHeight: 0,
            ready: false,
            cursor: false,
            currentTitle: null,
            currentColor: null,
            currentName: null
        }
    }

    componentDidMount() {
        let size = calcWinsize()
        this.setState({
            screenWidth: size.width,
            screenHeight: size.height,
            ready: true,
            isVisible: false
        })

        window.addEventListener('mousemove', () => {
            this.render.bind(this)
        })
    }

    toggleCursor() {
        this.setState({
            cursor: !this.state.cursor
        })
    }

    onHover(title, name, color) {
        this.setState({
            currentTitle: title,
            isVisible: true,
            currentColor: color,
            currentName: name
        })
    }

    onLeave() {
        this.setState({
            isVisible: false
        })
    }

    render() {
        const { cities, locale } = this.props
        const {
            ready,
            screenWidth,
            screenHeight,
            isVisible,
            currentTitle,
            currentColor,
            currentName
        } = this.state

        const zoomOut = 0.6

        if (ready) {
            return (
                <>
                    <motion.div
                        className={styles.BigTitle}
                        animate={{
                            opacity: isVisible ? 1 : 0,
                            color: currentColor,
                            transition: { duration: 0.25 }
                        }}
                    >
                        <div className={styles.BigTitleName}>{currentName}</div>
                        <div className={styles.BigTitleTitle}>
                            {currentTitle}
                        </div>
                    </motion.div>

                    <div className={styles.SpaceWrapper}>
                        <TransformWrapper
                            className={styles.Transfomer}
                            defaultScale={zoomOut}
                            defaultPositionX={
                                -(2000 * zoomOut - screenWidth) / 2
                            }
                            defaultPositionY={
                                -(2000 * zoomOut - screenHeight) / 2
                            }
                            options={{
                                limitToBounds: false,
                                limitToWrapper: true,
                                minScale: 0.1,
                                centerContent: true
                            }}
                            wheel={{
                                disabled: false,
                                step: 100
                            }}
                            doubleClick={{
                                disabled: true
                            }}
                            onPanningStart={this.toggleCursor.bind(this)}
                            onPanningStop={this.toggleCursor.bind(this)}
                        >
                            <TransformComponent>
                                <div
                                    className={styles.Space}
                                    ref={this.cursorRef}
                                >
                                    {cities.map((city, index) => {
                                        const currentTrans = getKeyByValue(
                                            city,
                                            locale
                                        )

                                        return (
                                            <Pin
                                                title={city.title}
                                                name={currentTrans.name}
                                                slug={city.slug}
                                                x={city.x}
                                                y={city.y}
                                                color={city.color}
                                                classN={styles.Pin}
                                                onHover={this.onHover}
                                                onLeave={this.onLeave}
                                                key={index}
                                                i={index}
                                            />
                                        )
                                    })}
                                </div>
                            </TransformComponent>
                        </TransformWrapper>
                    </div>
                </>
            )
        } else {
            return <></>
        }
    }
}

const variants = {
    visible: (i) => ({
        opacity: 1,
        scale: [0, 2, 1],
        transition: {
            delay: i * 0.1,
            ease: 'backOut'
        }
    }),
    hidden: { opacity: 0, scale: 0 }
}

export function Pin({
    x,
    y,
    name,
    title,
    color,
    slug,
    classN,
    onHover,
    onLeave,
    i
}) {
    const styles = {
        left: x,
        top: y,
        backgroundColor: color
    }

    return (
        <Link href={'city/' + slug}>
            <motion.div
                custom={i}
                initial="hidden"
                animate="visible"
                variants={variants}
                className={classN}
                style={styles}
                whileHover={{ scale: 2 }}
                onMouseEnter={() => onHover(title, name, color)}
                onMouseLeave={() => onLeave()}
            ></motion.div>
        </Link>
    )
}

Space.propTypes = {
    cities: PropTypes.array,
    locale: PropTypes.string
}

Pin.propTypes = {
    i: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    name: PropTypes.string,
    title: PropTypes.string,
    color: PropTypes.string,
    slug: PropTypes.string,
    classN: PropTypes.string,
    onHover: PropTypes.func,
    onLeave: PropTypes.func
}
