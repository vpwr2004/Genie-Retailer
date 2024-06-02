import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () => {
    const navigation=useNavigation();
    const insets = useSafeAreaInsets();
  return (
    <SafeAreaView edges={['top', 'bottom']}>
            <View className="flex  items-center h-screen">
                
            </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({})