import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import DPIcon from "../assets/DPIcon.svg";
import { formatDateTime } from "../screens/utils/lib";

const RetailerMessage = ({ bidDetails, user }) => {
  const { formattedTime, formattedDate } = formatDateTime(  bidDetails?.updatedAt);

  return (
    <View className="flex gap-[19px]   rounded-3xl w-[297px] border-[1px] border-gray-200 h-[max-content] py-[10px] items-center bg-[#ebebeb]">
      <View className="flex-row gap-[18px] ">
        <View>
          {user?.storeImages[0] ? (
            <Image
              source={{ uri: user?.storeImages[0] }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          ) : (
            <Image
              source={{
                uri: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
              }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
              // className="w-[40px] h-[40px] rounded-full"
            />
          )}
        </View>
        <View className="w-[60%]">
          <View className="flex flex-row justify-between">
            <Text className="text-[14px] text-[#2e2c43] font-bold">You</Text>
            <Text className="text-[12px] text-[#2e2c43] ">{formattedTime}</Text>
          </View>
          <Text className="text-[14px] text-[#2e2c43]">
            {bidDetails?.message}
          </Text>
        </View>
      </View>
      {bidDetails?.bidImages?.length > 0 && (
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            flexDirection: "row",
            gap: 4,
            paddingHorizontal: 25,
          }}
        >
          {bidDetails.bidImages?.map((image, index) => (
            <View key={index}>
              <Image
                source={{ uri: image }}
                style={{
                  height: 132,
                  width: 96,
                  borderRadius: 24,
                  backgroundColor: "#EBEBEB",
                }}
              />
            </View>
          ))}
        </ScrollView>
      )}
      {bidDetails?.bidPrice > 0 && (
        <View className="flex-row gap-[5px]">
          <Text>Expected Price: </Text>
          <Text className="font-bold text-[##79B649]">
            Rs. {bidDetails.bidPrice}
          </Text>
        </View>
      )}
      {/* <View className="flex-row gap-[4px]">
                <View className="h-[132px] w-[96px] rounded-3xl bg-white "></View>
                <View className="h-[132px] w-[96px] rounded-3xl bg-white"></View>

            </View>
            <View className="gap-[4px]">
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
  );
};

export default RetailerMessage;

const styles = StyleSheet.create({});
