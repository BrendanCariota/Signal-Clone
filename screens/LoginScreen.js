import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Image, KeyboardAvoidingView } from 'react-native'
import { Button, Input } from "react-native-elements"
import { StatusBar } from 'expo-status-bar'
import { auth } from '../firebase'

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // When app starts
    useEffect(() => {
        // If user is authenticated then move them to home screen
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser)
            if(authUser) {
                navigation.replace('Home') //Replace replaces the screen and doesn't give the user the option to swipe back like navigate
            }
        })

        // Allows us to unsubscribe if the component remounts
        return unsubscribe
    }, [])


    const signIn = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .catch(error => alert(error))
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light" />

            <Image 
                source={{ uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png" }}
                style={{ width: 200, height: 200 }}
            />
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Email"
                    autoFocus 
                    type="email" 
                    value={email} 
                    onChangeText={(text) => setEmail(text)} 
                />
                <Input 
                    placeholder="Password" 
                    secureTextEntry  
                    type="password" 
                    value={password} 
                    onChangeText={(text) => setPassword(text)} 
                    onSubmitEditing={signIn}
                />
            </View>

            <Button 
                containerStyle={styles.button} 
                title="Login" 
                onPress={signIn}
            />
            <Button 
                containerStyle={styles.button} 
                type='outline' 
                title="Register" 
                onPress={() => navigation.navigate("Register")}
            />
            {/* If Register Button is touching keyboard this trick will work */}
            {/* <View style={{ height: 100 }} /> */}
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: 'white',
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
        marginBottom: 5,
    },
})
