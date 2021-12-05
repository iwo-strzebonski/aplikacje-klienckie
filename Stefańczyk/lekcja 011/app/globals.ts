import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#303F9F',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alarmList: {
        width: '100%',
        backgroundColor: '#303F9F',
    },
    alarm: {
        width: '100%',
        padding: '2%',
        alignSelf: 'center'
    },
    removeAlarm: {
        fontSize: 32
    },
    header: {
        color: '#FFFFFF',
        fontSize: 48
    },
    primary: {
        color: '#FFFFFF',
        fontSize: 24
    },
    secondary: {
        color: '#C5CAE9',
        fontSize: 24
    },
    addButton: {
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        width: '100%',
        bottom: 30,
    }
})
