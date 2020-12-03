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
