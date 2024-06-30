import { StyleSheet, Text, View, Image, ScrollView, Animated, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import DPIcon from "../assets/DPIcon.svg";
import { Entypo } from "@expo/vector-icons";
import Tick from "../assets/tick.svg";
import { Feather } from "@expo/vector-icons";


import { useSelector } from "react-redux";
import { formatDateTime, handleDownloadPress } from "../screens/utils/lib";

const UserBidMessage = ({ bidDetails }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [scaleAnimation] = useState(new Animated.Value(0));
  const [downloadProgress, setDownloadProgress] = useState({});
  const user=useSelector(state=>state.storeData.userDetails);


  const handleImagePress = (image) => {
    setSelectedImage(image);
    Animated.timing(scaleAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleClose = () => {
    Animated.timing(scaleAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setSelectedImage(null));
  };
  const { formattedTime, formattedDate } = formatDateTime(
    bidDetails?.updatedAt
  );

  // console.log("bidDetails", bidDetails);
  // const userDetails = useSelector(store => store.user.userDetails);
  const requestInfo = useSelector(
    (state) => state.requestData.requestInfo || {}
  );

  // console.log('userDetails', userDetails);
  return (
    <View className="flex gap-[19px]   rounded-3xl w-[297px]  py-[20px] items-center bg-[#fafafa]">
      <View className="flex-row gap-[18px]">
        <View>
          {requestInfo?.customerId?.pic ? (
            <Image
              source={{ uri: requestInfo?.customerId?.pic }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
              // className="w-[40px] h-[40px] rounded-full"
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

          {/* <DPIcon size={20} className="object-contain" /> */}
        </View>
        <View className="w-[60%]">
          <View className="flex flex-row justify-between">
            <Text className="text-[14px] text-[#2e2c43]  capitalize" style={{ fontFamily: "Poppins-ExtraBold" }}>
              {requestInfo?.customerId?.userName}
            </Text>

            <Text className="text-[12px] text-[#2e2c43] " style={{ fontFamily: "Poppins-Regular" }}>{formattedTime}</Text>
          </View>
          <Text className="text-[14px] text-[#2e2c43]" style={{ fontFamily: "Poppins-Regular" }}>
            {bidDetails.message}
          </Text>
        </View>
      </View>
      {bidDetails?.bidImages?.length > 0 && (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            gap: 4,
            paddingHorizontal: 25,
          }}
        >
          {bidDetails?.bidImages.map((image, index) => (
            <View
              key={index}
              style={{ position: "relative", width: 96, height: 132 }}
            >
              <Pressable onPress={() => handleImagePress(image)}>
                <Image
                  source={{ uri: image }}
                  style={{ height: 132, width: 96, borderRadius: 20 }}
                />
              </Pressable>
              <Pressable
                style={{
                  position: "absolute",
                  bottom: 5,
                  right: 5,
                  backgroundColor: "gray",
                  padding: 2,
                  borderRadius: 100,
                }}
                onPress={() =>
                  handleDownloadPress(
                    image,
                    index,
                    downloadProgress,
                    setDownloadProgress
                  )
                }
              >
                <Feather name="download" size={18} color="white" />
              </Pressable>
              {downloadProgress[index] !== undefined && (
                <View style={styles.progressContainer}>
                  <Text style={styles.progressText}>
                    {Math.round(downloadProgress[index] * 100)}%
                  </Text>
                </View>
              )}
            </View>
          ))}
          <Modal
            transparent
            visible={!!selectedImage}
            onRequestClose={handleClose}
          >
            <Pressable style={styles.modalContainer} onPress={handleClose}>
              <Animated.Image
                source={{ uri: selectedImage }}
                style={[
                  styles.modalImage,
                  {
                    transform: [{ scale: scaleAnimation }],
                  },
                ]}
              />
            </Pressable>
          </Modal>
        </ScrollView>
      )}
      <View className="gap-[4px]">
        <View className="flex-row gap-[5px]">
          <Text style={{ fontFamily: "Poppins-Medium" }}>Expected Price: </Text>
          <Text className=" text-[#79B649]" style={{ fontFamily: "Poppins-SemiBold" }}>
            Rs. {bidDetails.bidPrice}
          </Text>
        </View>
        {/* <View className="flex-row gap-[5px]">
          <Text>Warranty: </Text>
          <Text className="font-bold text-[#79B649]">
            {bidDetails.warranty} months
          </Text>
        </View> */}

        {bidDetails?.bidAccepted === "rejected" && (
          <View className="flex-row items-center gap-1">
            <Entypo name="circle-with-cross" size={20} color="#E76063" />
            <Text className="text-[14px] text-[#E76063]" style={{ fontFamily: "Poppins-Regular" }}>Bid Rejected by You</Text>
          </View>
        )}
        {bidDetails?.bidAccepted === "accepted" && (
          <View className="flex-row items-center gap-1">
            <Tick width={18} height={18} />
            <Text className="text-[14px] text-[#79B649]" style={{ fontFamily: "Poppins-Regular" }}>Bid Accepted by You</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default UserBidMessage;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalImage: {
    width: 300,
    height: 400,
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  progressContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  progressText: {
    color: "white",
    fontSize: 16,
  },
});
