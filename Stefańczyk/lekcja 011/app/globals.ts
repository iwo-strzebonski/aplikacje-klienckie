import { StyleSheet, TouchableNativeFeedback } from 'react-native'

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
        borderBottomColor: '#242f78',
        borderBottomWidth: 1,
        width: '100%',
        padding: '2%',
        alignSelf: 'center'
    },
    alarmDays: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    selectableDays: {
        flexDirection: 'row',
        zIndex: -1
    },
    daySelectable: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        borderRadius: 16,
        marginRight: 4
    },
    dayText: {
        color: '#FFFFFF',
        textAlign: 'center'
    },
    daysSelectedText: {
        height: 36,
        textAlignVertical: 'center',
        color: '#C5CAE9'
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
    },
    clock: {
        position: 'relative',
        top: 180
    },
    circle: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: 32,
        height: 32,
        borderRadius: 32,
        backgroundColor: 'rgba(255,255,255,0.25)'
    },
    selected: {
        borderRadius: 32,
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginTop: 16
    },
    selectedHour: {
        fontSize: 64,
        fontWeight: 'bold',
        marginTop: 16
    }
})

export const ripple = {
    circle: TouchableNativeFeedback.Ripple('rgba(255,255,255,0.1)', true),
    contain: TouchableNativeFeedback.Ripple('rgba(255,255,255,0.1)', false)
}
