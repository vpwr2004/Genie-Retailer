import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DPIcon from "../assets/DPIcon.svg"

const ReplyMessage = ({bidDetails,user}) => {
  return (
    <View className="flex gap-[19px] bg-[#EBEBEB]  rounded-3xl w-[297px]  py-[10px] items-center">
              <View className="flex-row gap-[18px]">
                                    <View className="flex justify-center items-center rounded-full">
                                        {/* <DPIcon size={20} className="object-contain" /> */}
                                     <Image source={{ uri: user?.storeImages[0] }} className="w-[30px] h-[30px] rounded-full" />

                                    </View>
                                    <View className="w-[60%]">
                                        <Text className="text-[14px] text-[#2e2c43] font-bold">You</Text>
                                        <Text className="text-[12px] text-[#2e2c43]">{bidDetails?.message}</Text>
                                    </View>
                 </View>
                 {bidDetails.bidType === true && (
       <>
        <View className="flex-row gap-[4px]">
        {bidDetails?.bidImages?.length > 0 ? (
              <ScrollView horizontal={true}>
                <View className="justify-center pl-[30px]">
                  <View className="flex-row gap-2 items-center">
                    {bidDetails?.bidImages.map((image, index) => (
                      <Image
                        key={index}
                        source={{ uri: image }}
                        className="h-[132px] w-[96px] rounded-3xl"
                      />
                    ))}
                  </View>
                </View>
              </ScrollView>
            ) : (
              <>
                <View className="h-[132px] w-[96px] rounded-3xl bg-[#EBEBEB]"></View>
                <View className="h-[132px] w-[96px] rounded-3xl bg-[#EBEBEB]"></View>
              </>
            )}
        </View>
        <View className="gap-[4px]">
            <View className="flex-row gap-[5px]">
                <Text>Expected Price: </Text>
                <Text className="font-bold text-[#79B649]">Rs. {bidDetails.bidPrice}</Text>
            </View>
            <View className="flex-row gap-[5px]">
                <Text>Warranty: </Text>
                <Text className="font-bold text-[#79B649]"> {bidDetails.warranty} months</Text>
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
                    <Tick width={18} height={18}/>
                    <Text className="text-[14px] text-[#79B649]">
                        Bid Accepted
                    </Text>
                </View>
            )}
        </View>
    </>
)}

    </View>
  )
}

export default ReplyMessage

const styles = StyleSheet.create({})