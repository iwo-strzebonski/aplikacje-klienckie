/* eslint-disable require-jsdoc */
import { note } from '../@types/Notes'

export default function filterNotes(
    notes: note[],
    filter: string
): note[] {
    return notes.filter(
        n => 
            n.title.includes(filter) ||
            n.text.includes(filter) ||
            n.category.includes(filter)
        )
}
