import React from 'react'
import { LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Screen1 from './components/Start'
import Screen2 from './components/Gallery'
import Screen3 from './components/CameraView'
import Screen4 from './components/Photo'

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
])

const Stack = createNativeStackNavigator()

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
                        title: 'Gallery',
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
                        title: 'Camera',
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
                    name='s4'
                    component={Screen4}
                    options={{
                        title: 'Image',
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
