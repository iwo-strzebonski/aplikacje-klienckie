/* eslint-disable require-jsdoc */
export default function createDate(date: number): string {
    const d = new Date(date)
    return (
        d.toLocaleString().substring(8, 10) +
        d.toLocaleString().substring(3, 7)
    )
}
