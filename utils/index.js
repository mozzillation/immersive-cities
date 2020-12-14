import React from 'react'

export function getKeyByValue(object, value) {
    if (Object.getOwnPropertyNames(object).find((key) => key === value)) {
        return object[value]
    }
}

export function useDeviceDetect() {
    const [isMobile, setMobile] = React.useState(false)

    React.useEffect(() => {
        const userAgent =
            typeof window.navigator === 'undefined' ? '' : navigator.userAgent
        const mobile = Boolean(
            userAgent.match(
                /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
            )
        )
        setMobile(mobile)
    }, [])

    return { isMobile }
}

export const calcWinsize = () => {
    if (process.browser) {
        return { width: window.innerWidth, height: window.innerHeight }
    }
}

export const GA_TRACKING_ID = 'xxx'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url
    })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
    })
}