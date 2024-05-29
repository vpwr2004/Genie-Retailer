import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AccountVerify from "../assets/AccountVerifyImg.svg"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';


const HomeScreenUnverified = () => {
//   const isFocused = useIsFocused();


//   const fetchUserData = async () => {
//     try {
//         const userData = JSON.parse(await AsyncStorage.getItem('userData'));
//         console.log(userData);
//         if (userData) {
//             if (userData.storeApproved) {
//                 setVerified(true);
//             }
            
//         }
//     } catch (error) {
//         console.error('Not verified store:', error);
//     }
// };

// useEffect(() => {
//     if (isFocused) {
//         fetchUserData();
//     }
// }, [isFocused]);

  return (
    <View className="flex flex-col gap-[32px]">
                <View className="flex justify-center items-center">
                <View className="bg-white w-[90%] flex-col items-center py-[32px] rounded-md gap-[18px] px-[5%]">
                    <AccountVerify className="bg-white w-[270px] h-[117px]" />
                   <Text className="text-[14px] font-bold text-center">Thank You!</Text>
                    <Text className=" text-[14px]">
                       We already received your request for authentic seller to our platform.
                    </Text>
                    <Text className="text-[14px]">
                    Please wait for some time, Our team will connect with you to cross verify the information you submit to us. 
                    </Text>

                </View>
                </View>
    </View>
  )
}

export default HomeScreenUnverified

const styles = StyleSheet.create({})