/* eslint-disable require-jsdoc */
export default function invertHex(hex: string): string {
    return '#' + (Number(`0x${hex.substring(1)}`) ^ 0xFFFFFF)
        .toString(16).toUpperCase().padStart(6, '0')
}
