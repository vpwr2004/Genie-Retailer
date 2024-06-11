import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
 
  Image
} from "react-native";
import React, { useState } from "react";
import ThreeDots from "../../assets/ThreeDotIcon.svg";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Profile from "../../assets/ProfileIcon2.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setBidOfferedPrice,
  setProductWarranty,
} from "../../redux/reducers/bidSlice";
import { TouchableOpacity } from "react-native";

const BidOfferedPrice = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user, messages, setMessages } = route.params;
  const [offeredPrice, setOfferedPrice] = useState(0);
  const [warranty, setWarranty] = useState(0);
  const requestInfo = useSelector((state) => state.requestData.requestInfo);

  const handleOfferedPrice = (offeredPrice) => {
    const parsedPrice = parseFloat(offeredPrice);
    // Check if the parsed value is a valid number
    if (!isNaN(parsedPrice)) {
      // Update the mobile number state with the parsed value
      setOfferedPrice(parsedPrice);
      // Log the mobile number value
      console.log(parsedPrice);
    } else {
      // Handle invalid input (optional)
      console.error("Invalid price input:", offeredPrice);
    }
  };
  const handleProductWarranty = (warranty) => {
    // Update the mobile number state
    const parsedWarranty = parseFloat(warranty);
    // Check if the parsed value is a valid number
    if (!isNaN(parsedWarranty)) {
      // Update the mobile number state with the parsed value
      setWarranty(parsedWarranty);
      // Log the mobile number value
      console.log(parsedWarranty);
    } else {
      // Handle invalid input (optional)
      console.error("Invalid warranty input:", warranty);
    }
  };

  const handleNext = () => {
    dispatch(setBidOfferedPrice(offeredPrice));
    dispatch(setProductWarranty(warranty));
    navigation.navigate("bidPreviewPage", {
      offeredPrice,
      user,
      messages,
      setMessages,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="relative flex-grow bg-[#ffe7c8]">
          <View className="z-50 bg-[#ffe7c8] w-full flex flex-row px-[32px] justify-between items-center py-[30px]">
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
            >
              <FontAwesome name="arrow-left" size={15} color="black" />
            </Pressable>

            <View className="gap-[9px]">
              <View className="flex-row gap-[18px]">
                <View className="flex items-center justify-center rounded-full">
                  {requestInfo?.customerId?.pic ? (
                    <Image
                      source={{ uri: requestInfo?.customerId?.pic }}
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                      // className="w-[40px] h-[40px] rounded-full"
                    />
                  ) : (
                    <Profile className="" />
                  )}
                </View>
                <View className="w-[70%]">
                  <Text className="text-[14px] text-[#2e2c43] capitalize">
                    {requestInfo?.customerId?.userName}
                  </Text>
                  <Text className="text-[12px] text-[#c4c4c4]">
                    Active 3 hr ago
                  </Text>
                </View>
              </View>
            </View>

            {/* <Pressable onPress={() => { console.log("hii") }}>
                                <ThreeDots />
                            </Pressable> */}
          </View>
          <View className="px-[50px] pb-[20px] flex ">
            <View className="flex-row gap-[10px] items-center">
              <Text className="text-[16px] font-bold">Request Id</Text>
              <Text>{requestInfo?.requestId?._id}</Text>
            </View>
            <Text>
            {requestInfo?.requestId?.requestDescription
              ?.split(" ")
              .slice(0, 12)
              .join(" ")}
            ....
          </Text>
          </View>
          <KeyboardAvoidingView>
            <View className="flex gap-[21px] px-[50px] pt-[10px] pb-[100px]">
              <View className="flex-row justify-between">
                <Text className="text-[14px] font-bold">Send a offer</Text>
                <Text className="text-[#FB8C00] text-[14px] font-bold">
                    Step 3/3
                  </Text>
              </View>
              <Text>Tell the offered price to the customer</Text>
              <View className="bg-white p-4 rounded-lg text-center">
                <TextInput
                  onChangeText={handleOfferedPrice}
                  placeholder="Ex: 1200 Rs"
                  placeholderTextColor="#558B2F"
                  keyboardType="numeric"
                  className="text-center font-bold text-[#558B2F]"
                />
              </View>
              <Text>Product warranty (In months)</Text>
              <View className="bg-white p-4 rounded-lg text-center">
                <TextInput
                  onChangeText={handleProductWarranty}
                  placeholder="Ex; 6 Month"
                  placeholderTextColor="#558B2F"
                  keyboardType="numeric"
                  className="text-center font-bold text-[#558B2F]"
                />
              </View>
            </View>
          </KeyboardAvoidingView>

          {/* Spacer View */}
          <View style={{ flex: 1 }} />
        </View>
      </ScrollView>

      {/* Typing Area */}
      <View className="absolute bottom-0 left-0 right-0">
        <View className="gap-[20px]">
          <TouchableOpacity disabled={!offeredPrice && !warranty} onPress={handleNext}>
            <View className="w-full h-[63px] flex items-center justify-center  bg-[#FB8C00] ">
              <Text className="font-bold text-[16px] text-white">Next</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BidOfferedPrice;
