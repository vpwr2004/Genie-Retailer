import { View, Text, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, Pressable, ScrollView, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import StoreName from "../../assets/delivery.svg"
import BackArrow from "../../assets/BackArrow.svg"

import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setStoreService } from '../../redux/reducers/storeDataSlice';
import { Octicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';



const ServiceDeliveryScreen = () => {
    const navigation = useNavigation();
    const [checked, setChecked] = useState(false);
    const dispatch=useDispatch();
  const { width } = Dimensions.get("window");


    const handleService=()=>{
        try {
           
            dispatch(setStoreService(checked));
            navigation.navigate('panCard');
         } catch (error) {
           
            console.log("error",error);
         }
    }


    return (
        <View style={{ flex: 1 }}>
        <View style={{ flex: 1,backgroundColor:"white" }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View className="w-full bg-white flex-col justify-center">
                    <View className="w-full fixed z-40 top-16 flex flex-row justify-between items-center px-[32px]">
                        <Pressable onPress={() => navigation.goBack()} className="flex flex-row items-center p-2 gap-2">
                            <BackArrow width={14} height={10} />
                        </Pressable>
                    </View>
                    <View className="flex flex-col justify-center items-center px-[32px] gap-[20px] ">
                        <StoreName height={400} width={width} className="object-cover" />
                        <Text className="text-[14.5px] font-bold text-[#FB8C00]">Step 5/9</Text>
                    </View>
                    <View className="my-[30px] flex flex-col gap-[33px] px-[32px]">
                        <View className="flex flex-col gap-[17px]">
                            <Text className="text-[16px] text-[#2e2c43]">
                                Do you provide home delivery or service at customer's doorstep?
                            </Text>
                            <KeyboardAvoidingView className="flex flex-col gap-[22px]">
                                <Pressable className="flex flex-row items-center gap-[22px]" onPress={() => setChecked(true)}>
                                    <View className={`border-[#FB8C00] h-[20px] w-[20px] flex justify-center items-center border-[1px] rounded-full ${checked === true ? "bg-[#FB8C00]" : ""}`}>
                                        {checked === true && <Entypo name="circle" size={16} color="white" />}
                                    </View>
                                    <Text className="text-[#2E2C43] text-[16px] font-semibold">Yes</Text>
                                </Pressable>
                                <Pressable className="flex flex-row items-center gap-[22px]" onPress={() => setChecked(false)}>
                                    <View className={`border-[#FB8C00] h-[20px] w-[20px] flex justify-center items-center border-[1px] rounded-full ${checked === false ? "bg-[#FB8C00]" : ""}`}>
                                        {checked === false && <Entypo name="circle" size={16} color="white" />}
                                    </View>
                                    <Text className="text-[#2E2C43] text-[16px] font-semibold">No</Text>
                                </Pressable>
                            </KeyboardAvoidingView>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={handleService}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#fb8c00',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 18,
                    width: '100%',
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'white',
                        textAlign: 'center',
                    }}
                >
                    NEXT
                </Text>
            </TouchableOpacity>
          
        </View>
    </View>
    
    );
};

export default ServiceDeliveryScreen;
