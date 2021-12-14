/* eslint-disable require-jsdoc */
import React from 'react'
import { LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import CustomDrawer from './components/CustomDrawer'
import Screen1 from './components/Notes'
import Screen2 from './components/CreateNote'
import Screen3 from './components/EditNote'

const Drawer = createDrawerNavigator()

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
])

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawer {...props} />}
            >
                <Drawer.Screen
                    name='s1'
                    component={Screen1}
                    options={{
                        title: 'notes',
                        headerStyle: {
                            backgroundColor: '#303F9F',
                        },
                        headerTintColor: '#FFFFFF',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }
                    }}
                />
                <Drawer.Screen
                    name='s2'
                    component={Screen2}
                    options={{
                        title: 'create',
                        headerStyle: {
                            backgroundColor: '#303F9F',
                        },
                        headerTintColor: '#FFFFFF',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }
                    }}
                />
                <Drawer.Screen
                    name='s3'
                    component={Screen3}
                    options={{
                        title: 'edit',
                        headerStyle: {
                            backgroundColor: '#303F9F',
                        },
                        headerTintColor: '#FFFFFF',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
