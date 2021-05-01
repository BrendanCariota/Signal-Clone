import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native'
import CustomListItem from '../components/CustomListItem'

const HomeScreen = () => {

    useLayoutEffect(() => {

    }, [])

    return (
        <SafeAreaView>
            <ScrollView>
                <CustomListItem />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
