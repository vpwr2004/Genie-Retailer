import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import Tick from "../assets/tick.svg";
import DPIcon from "../assets/DPIcon.svg";
import { useSelector } from 'react-redux';
import { formatDateTime } from '../screens/utils/lib';

const UserMessage = ({ bidDetails }) => {
    // console.log("bidDetails", bidDetails);
    const { formattedTime, formattedDate } = formatDateTime( bidDetails?.updatedAt);

    // const userDetails = useSelector(store => store.user.userDetails);
  const requestInfo= useSelector(state => state.requestData.requestInfo || {});



    return (
        <View className="flex gap-[19px]    rounded-3xl w-[297px] h-[max-content] py-[10px] items-center bg-[#fafafa]">
            <View className="flex-row gap-[18px] ">
                <View >
                {
              requestInfo?.customerId?.pic ? (  <Image
                source={{ uri:requestInfo?.customerId?.pic  }}
                style={{ width: 40, height: 40, borderRadius: 20 }}
            // className="w-[40px] h-[40px] rounded-full"
            />):(
                <Image
                source={{ uri: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" }}
                style={{ width: 40, height: 40, borderRadius: 20 }}
            // className="w-[40px] h-[40px] rounded-full"
            />
              )

              
          }

                </View>
                <View className="w-[60%]">
                <View className="flex flex-row justify-between">
            <Text className="text-[14px] text-[#2e2c43] font-bold capitalize">
              {requestInfo?.customerId?.userName}
            </Text>

            <Text className="text-[14px] text-[#2e2c43] ">{formattedTime}</Text>
          </View>
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