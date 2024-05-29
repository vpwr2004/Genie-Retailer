import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import Tick from "../assets/tick.svg";
import DPIcon from "../assets/DPIcon.svg";
import { useSelector } from 'react-redux';

const UserMessage = ({ bidDetails }) => {
    // console.log("bidDetails", bidDetails);

    // const userDetails = useSelector(store => store.user.userDetails);


    return (
        <View className="flex gap-[19px]    rounded-3xl w-[297px] h-[max-content] py-[10px] items-center bg-[#fafafa]">
            <View className="flex-row gap-[18px] ">
                <View >
                    <Image
                                                source={{ uri: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" }}

                        style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                     {/* <DPIcon size={20} className="object-contain" /> */}

                </View>
                <View className="w-[60%]">
                    <Text className="text-[14px] text-[#2e2c43] font-bold">Customer</Text>
                    <Text className="text-[12px] text-[#2e2c43]">{bidDetails.message}</Text>
                </View>
            </View>

            { bidDetails?.bidImages?.length>0 &&
            
            <ScrollView horizontal={true} contentContainerStyle={{ flexDirection: 'row', gap: 4, paddingHorizontal: 25, }}>
                {
                    bidDetails.bidImages?.map((image, index) => (
                        <View key={index}>
                            <Image source={{ uri: image }} style={{ height: 132, width: 96, borderRadius: 24, backgroundColor: '#EBEBEB' }} />
                        </View>
                    ))
                }
            </ScrollView>
            }
            {bidDetails?.bidPrice > 0 && <View className="flex-row gap-[5px]">
                <Text>Expected Price: </Text>
                <Text className="font-bold text-[##79B649]">Rs. {bidDetails.bidPrice}</Text>


            </View>}

            {/* <View className="gap-[4px]">
                <View className="flex-row gap-[5px]">
                    <Text>Expected Price: </Text>
                    <Text className="font-bold text-[##79B649]">Rs. {bidDetails.bidPrice}</Text>


                </View>

                {bidDetails?.bidAccepted === "rejected" && (
                    <View className="flex-row items-center gap-1">
                        <Entypo name="circle-with-cross" size={20} color="#E76063" />
                        <Text className="text-[14px] text-[#E76063]">
                            Bid Rejected
                        </Text>
                    </View>
                )}
                {bidDetails?.bidAccepted === "accepted" && (
                    <View className="flex-row items-center gap-1">
                        <Tick width={18} height={18} />
                        <Text className="text-[14px] text-[#79B649]">
                            Bid Accepted
                        </Text>
                    </View>
                )}



            </View> */}
        </View>
    )
}

export default UserMessage;

const styles = StyleSheet.create({})