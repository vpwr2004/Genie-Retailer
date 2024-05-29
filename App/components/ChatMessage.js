import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import DPIcon from "../assets/DPIcon.svg";
import { Entypo } from "@expo/vector-icons";
import Tick from "../assets/tick.svg";

const ChatMessage = ({ bidDetails }) => {
  console.log("bidDetails", bidDetails.bidImages);

  return (
    <View className="flex gap-[19px]  border-[1px] border-gray-200 rounded-3xl w-[297px] h-max py-[10px] items-center">
      <View className="flex-row gap-[18px]">
        <View className="flex w-max h-max justify-center items-center rounded-full">
          <DPIcon size={20} className="object-contain" />
        </View>
        <View className="w-[60%]">
          <Text className="text-[14px] text-[#2e2c43] font-bold">Customer</Text>
          <Text className="text-[12px] text-[#2e2c43]">
            {bidDetails.message}
          </Text>
        </View>
      </View>
      {bidDetails.bidType === true && (
        <>
          <View className="flex-row w-full items-center">
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
              <Text className="font-bold text-[#79B649]">
                Rs. {bidDetails.bidPrice}
              </Text>
            </View>
            <View className="flex-row gap-[5px]">
              <Text>Warranty: </Text>
              <Text className="font-bold text-[#79B649]">
                {bidDetails.warranty} months
              </Text>
            </View>

            {bidDetails?.bidAccepted === "rejected" && (
              <View className="flex-row items-center gap-1">
                <Entypo name="circle-with-cross" size={20} color="#E76063" />
                <Text className="text-[14px] text-[#E76063]">Bid Rejected</Text>
              </View>
            )}
            {bidDetails?.bidAccepted === "accepted" && (
              <View className="flex-row items-center gap-1">
                <Tick width={18} height={18} />
                <Text className="text-[14px] text-[#79B649]">Bid Accepted</Text>
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({});
