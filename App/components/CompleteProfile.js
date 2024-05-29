import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Location from "../assets/location.svg"
import Store from "../assets/store.svg"
import Arrow from "../assets/rightarrow.svg"
import Tick from "../assets/tick.svg"
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import HomeScreenUnverified from './HomeScreenUnverified'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CompleteProfile = ({completeProfile,location,verified,store}) => {
    const navigation=useNavigation();
//     const isFocused = useIsFocused();
//     // const [store,setStore]=useState(false)
    
//     const [location, setLocation] = useState()
//     const [store,setStore]=useState("");

//     const fetchUserData = async () => {
//       try {
//           const userData = JSON.parse(await AsyncStorage.getItem('userData'));
//           console.log(userData);
//           if (userData) {
//               setLocation(userData.location);
//               setStore(userData.storeImages);
//               if (userData.location && userData.storeImages?.length > 0) {
//                   setCompleteProfile(true);
//               }
              
//           }
//       } catch (error) {
//           console.error('Error fetching user data:', error);
//       }
//   };

//   useEffect(() => {
//       if (isFocused) {
//           fetchUserData();
//       }
//   }, [isFocused]);


    const handleLocation=() => {
         if(!location){
            navigation.navigate("locationScreen");
         }
       
    }
    const handleStore=() => {
        if(store?.length===0){
            navigation.navigate("writeAboutStore");
        }
    }
  return (
    <View className="gap-[17px] mb-[20px]">
        {
            !completeProfile?(<Text className="text-[16px] font-bold text-center">Please complete your store profile {"\n"} before starting 
            </Text>):
            (
                <View className="flex-row gap-[5px] items-center justify-center">
                      <View className="w-[16px] h-[16px] bg-[#E76063] rounded-full">
                      </View>
                      <Text className="text-[14px] font-bold"> Wait for request approval</Text>


                </View>
            )
        }
      
      <View className="flex items-center gap-[10px]">
        <Pressable onPress={(handleLocation)}>
                <View  className="w-[90%] flex-row items-center bg-white gap-[15px] h-[127px] rounded-3xl shadow-3xl px-[18px]">
                        

                        <View className="w-full flex-row justify-between" >
                            <View>
                                <Location/>
                            </View>

                            <View className="flex ">
                                <Text className="text-[14px] font-bold"> Set Store Location </Text>
                                <Text className="text-[12px]">We are fetching your location for the {"\n"}
                                 purchase reference of our customers</Text>
                            </View>
                            <View className="flex-row gap-[8px]">
                               {
                                 !location?(<Arrow/>):(<Tick/>)
                               } 
                                
                            </View>

                        </View>
                    </View>
        </Pressable>
        <Pressable onPress={(handleStore)}>
                <View  className="w-[90%] flex-row items-center bg-white gap-[15px] h-[127px] rounded-3xl shadow-3xl px-[18px]">
                        

                        <View className="w-full flex-row justify-between" >
                            <View>
                                <Store/>
                            </View>
                          
                            <View className="flex ">
                                <Text className="text-[14px] font-bold"> Complete store profile </Text>
                                <Text className="text-[12px]">We are fetching your location for the {"\n"}
                                 purchase reference of our customers</Text>
                            
                            </View>
                            <View className="flex-row gap-[8px]">
                               {
                                 store.length===0?(<Arrow/>):(<Tick/>)
                               } 
                                
                            </View>

                        </View>
                    </View>
        </Pressable>

      </View>
      {
        completeProfile && <HomeScreenUnverified  />
      }

    </View>
  )
}

export default CompleteProfile

// const styles = StyleSheet.create({})