import { View, Text, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import StoreName from "../../assets/StoreName.svg"
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setStoreService } from '../../redux/reducers/storeDataSlice';
import { Octicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';



const ServiceDeliveryScreen = () => {
    const navigation = useNavigation();
    const [checked, setChecked] = useState(false);
    const dispatch=useDispatch();

    const handleService=()=>{
        try {
           
            dispatch(setStoreService(checked));
            navigation.navigate('panCard');
         } catch (error) {
           
            console.log("error",error);
         }
    }


    return (
        <SafeAreaView>
        <ScrollView>
            <View className="w-full bg-white flex-col justify-center ">
                <View className="w-full fixed z-40 top-16 flex flex-row justify-between items-center px-[32px]">
                    <Pressable onPress={() => navigation.goBack()} className="flex flex-row items-center p-2 gap-2">
                        <FontAwesome name="arrow-left" size={15} color="black" />
                    </Pressable>
                </View>
                <View className="flex flex-col justify-center items-center px-[32px]">
                <StoreName height={350}  width={256}/>
                </View>
                <View className="my-[82.5px]  flex flex-col gap-[33px] px-[32px]">
                    <View className="flex flex-col gap-[17px]">
                        <Text className="text-[16px] text-[#2e2c43] font-semibold">Do you provide home delivery or service at customer's doorstep?</Text>
                        <KeyboardAvoidingView className="flex flex-col gap-[22px]">
                            <Pressable className="flex flex-row items-center gap-[22px]" onPress={() => setChecked(true)}>
                                <View className={`border-[#FB8C00] h-[20px] w-[20px] flex justify-center items-center border-[1px] rounded-full ${checked === true ? "bg-[#FB8C00]" : ""}`}>
                                {checked===true && <Entypo name="circle" size={16} color="white" />}
                                </View>
                                <Text className="text-[#2E2C43] text-[16px] font-semibold">Yes</Text>
                            </Pressable>
                            <Pressable className="flex flex-row items-center gap-[22px]" onPress={() => setChecked(false)}>
                                <View className={`border-[#FB8C00] h-[20px] w-[20px] flex justify-center items-center  border-[1px] rounded-full ${checked === false ? "bg-[#FB8C00]" : ""}`}>
                                {checked===false && <Entypo name="circle" size={16} color="white" />}

                                </View>
                                <Text className="text-[#2E2C43] text-[16px] font-semibold">No</Text>
                            </Pressable>
                        </KeyboardAvoidingView>
                    </View>
                </View>
                <TouchableOpacity>
                    <Pressable  onPress={handleService}>
                        <View className="w-full h-[63px] bg-[#fb8c00]  flex items-center justify-center">
                            <Text className="text-white text-[18px] font-bold">NEXT</Text>
                        </View>
                    </Pressable>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </SafeAreaView>
    );
};

export default ServiceDeliveryScreen;
