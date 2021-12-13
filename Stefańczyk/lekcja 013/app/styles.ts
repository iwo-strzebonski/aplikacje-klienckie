import { Dimensions } from 'react-native'
import { StyleSheet, TouchableNativeFeedback } from 'react-native'


export const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    note: {
        borderRadius: 32,
        width: Dimensions.get('window').width / 2 - 32,
        height: Dimensions.get('window').width / 2 - 32,
        padding: '4%',
        marginTop: 16
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
        width: 64,
        height: 64,
        alignItems: 'center',
        borderRadius: 32,
        bottom: 30,
        backgroundColor: '#FFC107'
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        borderBottomColor: '#3F51B5',
        borderBottomWidth: 1,
        width: '90%',
    },
    titleInput: {
        height: 48,
    },
    valueInput: {
        marginTop: 16,
        height: 96,
        paddingBottom: 16,
        textAlignVertical: 'bottom',
        width: '90%'
    },
    noteTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    noteDate: {
        position: 'absolute',
        fontSize: 16,
        top: 16,
        right: 16
    },
    alertContainer: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: '100%',
        height: '100%',
        justifyContent: 'center'
        // zIndex: 999
    },
    alert: {
        top: Dimensions.get('window').height / 2 - 50,
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'absolute',
        alignSelf: 'center',
        width: 200,
        height: 100,
        backgroundColor: 'white',
        padding: 16
    },
    alertButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export const ripple = {
    circle: TouchableNativeFeedback.Ripple('rgba(255,255,255,0.5)', true),
    contain: TouchableNativeFeedback.Ripple('rgba(255,255,255,0.1)', false)
}
