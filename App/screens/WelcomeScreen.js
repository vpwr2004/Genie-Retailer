import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import GinieIcon from "../assets/GinieIcon.svg"
import GinieLogo from "../assets/Ginielogo.svg"
import Culturtap from "../assets/culturTaptext.svg"
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () => {
    const navigation=useNavigation();
    const insets = useSafeAreaInsets();
  return (
    <SafeAreaView edges={['top', 'bottom']}>
            <View className="flex  items-center h-screen">
                <GinieIcon className="w-[141px] h-[202px]"/>
                <Culturtap />
                <GinieLogo className="w-[121px] h-[48px]"/>
                <Text className="text-[16px] mt-[11px] italic">For business</Text>
                <View className="flex flex-col gap-[13px] mt-[56px] items-center">
                <TouchableOpacity onPress={()=>{navigation.navigate('mobileNumber')}}> 
                        <Text className="w-[324px] text-center text-[16px]  font-extrabold text-[#FB8C00] px-[34px] py-[20px] border-[2px] border-[#FB8C00]  rounded-[24px]">Already Registered Seller</Text>
                </TouchableOpacity>
                <Text className="text-[16px]">New Seller ?</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('locationScreen')}}>
                        <Text className="w-[324px] text-center text-[16px] font-extrabold text-white px-[34px] py-[20px] bg-[#FB8C00]  rounded-[24px]">Register here</Text>
                </TouchableOpacity>
            </View>
            <View className="mt-[33px] flex flex-col items-center">
                <Text className="text-[16px]">All rights reserve to</Text>
                <Text className=" text-[16px] font-bold">Culturtap Tourism India Pvt. Ltd.</Text>
            </View>
         </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({})