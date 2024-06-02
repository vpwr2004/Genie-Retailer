import { Pressable ,ScrollView,StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Profile from "../../assets/ProfileIcon.svg"
import GinieIcon from "../../assets/GinieBusinessIcon.svg"
import History from "../../assets/HistoryIcon.svg"
import { SafeAreaView } from 'react-native-safe-area-context'

const HistoryScreen = () => {
    const navigation=useNavigation()
  return (
    <SafeAreaView className="flex-1">
        <ScrollView>

         <View className="flex flex-row justify-between items-center px-[32px] ">
                    <View className="bg-[#FB8C00] p-[4px] rounded-full">
                        <TouchableOpacity onPress={()=>navigation.navigate("menu")}>
                            <Profile />
                        </TouchableOpacity>
                    </View>
                    <GinieIcon/>
                    <View className="bg-[#FB8C00] p-[4px] rounded-full">
                        <TouchableOpacity onPress={()=>navigation.navigate("history")}>
                            <History />
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <Text className="text-center text-[16px] mt-[40px]">No History</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HistoryScreen

const styles = StyleSheet.create({})