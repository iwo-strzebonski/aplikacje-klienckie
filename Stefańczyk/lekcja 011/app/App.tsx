/* eslint-disable require-jsdoc */
import React from 'react'
import { LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Database from './db/Database'

import Screen1 from './components/Main'
import Screen2 from './components/Alarms'
import Screen3 from './components/CreateAlarm'

const Stack = createNativeStackNavigator()

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
])

// Database.deleteTable()
Database.createTable()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='s1'
                    component={Screen1}
                    options={{
                        title: 'Start',
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='s2'
                    component={Screen2}
                    options={{
                        title: 'Alarm list',
                        headerStyle: {
                            backgroundColor: '#303F9F',
                        },
                        headerTintColor: '#FFFFFF',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }
                    }}
                />
                <Stack.Screen
                    name='s3'
                    component={Screen3}
                    options={{
                        title: 'Create an alarm',
                        headerStyle: {
                            backgroundColor: '#303F9F',
                        },
                        headerTintColor: '#FFFFFF',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
