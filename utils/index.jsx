export function getKeyByValue(object, value) {
    if (Object.getOwnPropertyNames(object).find((key) => key === value)) {
        return object[value]
    }
}
