import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Text } from "react-native-elements"
import { auth } from '../firebase'


const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    // Happens before the screen is Painted
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Login',
        })
    }, [navigation])

    const register = () => {
       auth
        .createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            // Gives back several objects one if them is user
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "../images/Men-Profile-Image-PNG.png"
            })
        })
        .catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />

            <Text h3 style={{ marginBottom: 50 }}>
                Create a Signal account
            </Text>

            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Full Name"
                    autoFocus
                    type='text'
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input 
                    placeholder="Email"
                    type='email'
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                />
                <Input 
                    placeholder="Password"
                    type='password'
                    secureTextEntry
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                />
                <Input 
                    placeholder="Profile Picture URL (optional)"
                    type='text'
                    value={imageUrl}
                    onChangeText={(imageUrl) => setImageUrl(imageUrl)}
                    onSubmitEditing={register}
                />
            </View>

            <Button 
                title='Register'
                onPress={register}
                raised
                containerStyle={styles.button}
            />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    inputContainer: {
        width: 300,
    }
})