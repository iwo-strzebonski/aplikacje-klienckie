/* eslint-disable require-jsdoc */
import * as SQLite from 'expo-sqlite'
import { dbRow } from '../@types/Database'

const db = SQLite.openDatabase('./strzebonski_iwo_4ia1.db')

export default class Database {
    public static lastId = -1

    public static createTable(): void {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS alarms ' +
                '(id INTEGER PRIMARY KEY NOT NULL, ' +
                'hour TEXT, days TEXT, active INTEGER)'
            )
        })
    }

    public static getAll(): Promise<dbRow[]> {
        return new Promise((resolve, reject) => db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM alarms',
                [],
                (tx, results) => {
                    const result = <dbRow[]>results.rows._array

                    for (const i in result) {
                        result[i].active = Boolean(result[i].active)
                        result[i].days = JSON.parse(result[i].days)
                    }

                    if (result[result.length - 1]) {
                        Database.lastId = result[result.length - 1].id || 0
                    }

                    resolve(result)
                },
                (tx, error) => {
                    reject(error)
                    return false
                }
            )
        }))
    }

    public static addOne(
        data: dbRow
    ): void {
        db.transaction(
            tx => {
                tx.executeSql(
                    'INSERT INTO alarms (id, hour, days, active) VALUES ' +
                    `(${data.id}, ` +
                    `'${data.hour}', ` +
                    `'${JSON.stringify(data.days)}', ` +
                    `${+ data.active})`
                )
            },
        )
    }

    public static editOne(
        data: dbRow
    ): void {
        db.transaction(
            tx => {
                tx.executeSql(
                    'UPDATE alarms SET ' +
                    `hour = '${data.hour}', ` +
                    `days = '${JSON.stringify(data.days)}', ` +
                    `active = ${+ data.active} ` +
                    `WHERE id = ${data.id}`
                )
            },
        )
    }

    public static deleteOne(id: number): void {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM alarms WHERE (id = ${id})`
            )
        })
    }

    public static deleteAll(): void {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM alarms'
            )
        })
    }

    public static deleteTable(): void {
        db.transaction(tx => {
            tx.executeSql(
                'DROP TABLE IF EXISTS alarms'
            )
        })
    }
}
