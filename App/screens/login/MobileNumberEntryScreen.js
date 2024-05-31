import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  BackHandler,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import MobileNumberImg from "../../assets/mobile.svg";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthData,
  setMobileNumber,
  setUserDetails,
} from "../../redux/reducers/storeDataSlice.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import auth from "@react-native-firebase/auth";
import axios from "axios";

const MobileNumberEntryScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const route = useRoute();
  const [mobileNumber, setMobileNumberLocal] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState("");
  const [mobileScreen, setMobileScreen] = useState(true);
  const countryCode = "+91";
  const uniqueToken=useSelector(state=>state.storeData.uniqueToken)


 

  useEffect(() => {
    const backAction = () => {
      // If on OTP screen, set mobileScreen to true to go back to mobile number entry screen
      if (!mobileScreen) {
        setMobileScreen(true);
        return true; // Prevent default back action
      }

      return false;
    };

    // Add event listener for hardware back button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    // Clean up event listener
    return () => backHandler.remove();
  }, [mobileScreen]);

  const handleMobileNo = (mobileNumber) => {
    // Update the mobile number state
    setMobileNumberLocal(mobileNumber);

    // Log the mobile number value
    // console.log(mobileNumber);
  };

  const handleOtp = (otp) => {
    setOtp(otp);
    console.log(otp);
  };
  const sendVerification = async () => {
    if (mobileNumber.length === 10) {
      // Navigate to OTP screen if the phone number is valid
      setLoading(true);
      try {
        const phoneNumber = countryCode + mobileNumber;
        console.log(phoneNumber);
        // const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        // setConfirm(confirmation);
        // console.log(confirmation);
        dispatch(setMobileNumber(phoneNumber));
        setMobileScreen(false);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    } else {
      // Display an alert if the phone number is invalid
      alert("Please enter correct mobile number.");
    }
  };

  //   const ConfirmCode=async()=>{
  //      const credentials=await confirm.confirm(code);
  //      const user=credentials.user;
  //      console.log(user);
  //   }

  const checkMobileNumber = async () => {
    setLoading(true);
    try {
      // Make a request to your backend API to check if the mobile number is registered

      //  console.log(confirm)
      //  const res=await confirm.confirm(otp);
      //  console.log("res",res);
      console.log(otp);
      // if(res){
      const phoneNumber = countryCode + mobileNumber;
      console.log("phone", phoneNumber);
      const response = await axios.get(
        "https://genie-backend-meg1.onrender.com/retailer/",
        {
          params: {
            storeMobileNo: phoneNumber,
          },
        }
      );
      console.log("res", response);
      setMobileScreen(true);
      if (response.data.storeMobileNo) {
        // If mobile number is registered, navigate to home screen
        
      
        setOtp("");
        setMobileNumberLocal("");
        const res = await axios.patch(`https://genie-backend-meg1.onrender.com/retailer/editretailer`, {
          _id: response?.data?._id,
          uniqueToken:uniqueToken
        });
        dispatch(setUserDetails(res.data));
        await AsyncStorage.setItem('userData', JSON.stringify(res.data));
        navigation.navigate("home");
      } else if (response.data.status === 404) {
        // If mobile number is not registered, continue with the registration process
        setMobileNumberLocal("");
        navigation.navigate("registerUsername");
      }
      //   }
      //   else{
      //     setLoading(false);
      //     console.log('Invalid otp:');
      //     alert('Invalid otp');
      //     return;
      //   }
    } catch (error) {
      console.error("Error checking mobile number:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {mobileScreen && (
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            extraScrollHeight={100}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <View style={{ flex: 1 }}>
                {/* Your existing content */}
                <View className="bg-white flex-col justify-center">
                  {/* <View className="w-full  z-40  top-16 flex flex-row justify-between items-center  px-[32px]">
                                <Pressable onPress={() => { navigation.goBack() }} className="flex flex-row items-center  gap-2">
                                    <FontAwesome name="arrow-left" size={15} color="black" />
                                </Pressable>
                            </View> */}
                  <View className="flex flex-col justify-center items-center  px-[32px]">
                    <MobileNumberImg height={385} width={306} />
                  </View>
                  <View className="mt-[84.4px] mb-[60px]  px-[32px]">
                    <View className="flex flex-col gap-[24px]">
                      <View className="flex flex-col gap-[5px]">
                        <Text className="text-[16px] font-semibold">
                          Please enter your store owner
                        </Text>
                      </View>
                      <KeyboardAvoidingView className="flex flex-col gap-[15px]">
                        <Text className="  text-[14px] font-normal ">
                          Mobile Number
                        </Text>
                        <View className="flex flex-row items-center gap-[10px] px-[8px] bg-[#F9F9F9] py-[11px] border-[1px] border-[#c9c8c7] border-opacity-10 rounded-[16px] ">
                          <View className="text-[16px] font-extrabold border-r-[1px] border-[#b6b5b4] flex flex-row gap-[9px] pr-[9px] items-center">
                            <Text className="text-[16px] font-extrabold">
                              +91
                            </Text>
                            <Entypo
                              name="chevron-down"
                              size={16}
                              color="black"
                              className=""
                            />
                          </View>
                          <TextInput
                           value={mobileNumber}
                            placeholder="Ex : 9088-79-0488"
                            placeholderTextColor={"#dbcdbb"}
                            keyboardType="numeric"
                            onChangeText={handleMobileNo}
                            maxLength={10}
                            className="w-full text-[16px] font-semibold text-black "
                          />
                        </View>
                      </KeyboardAvoidingView>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                  disabled={!mobileNumber}
                  onPress={sendVerification}
                  style={{
                    position: "absolute",
                    right: 0,
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <View className="w-full flex justify-center items-center">
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "#fb8c00",
                      paddingVertical: 18,
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    Next
                  </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#fb8c00" />
            </View>
          )}
        </SafeAreaView>
      )}
      {!mobileScreen && (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <KeyboardAvoidingView behavior="padding">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={{ alignItems: "center" }}>
                <View className="w-full z-40 top-[20px]  absolute flex flex-row justify-between items-center  px-[32px]">
                  <Pressable
                    onPress={() => {
                      setMobileScreen(true);
                    }}
                    className="flex flex-row p-2 items-center  gap-2"
                  >
                    <FontAwesome name="arrow-left" size={15} color="black" />
                  </Pressable>
                </View>

                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <MobileNumberImg height={388} width={306} />
                </View>

                <View style={{ paddingHorizontal: 32 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#001b33",
                      marginTop: 35.54,
                    }}
                  >
                    ENTER OTP
                  </Text>
                  <Text style={{ fontSize: 14, color: "#2e2c43" }}>
                    It should be autofilled or type manually
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      marginTop: 19,
                    }}
                  >
                    <TextInput
                      placeholder="* * * * * *"
                      maxLength={6}
                      placeholderTextColor={"#dbcdbb"}
                      keyboardType="numeric"
                      onChangeText={handleOtp}
                      style={{
                        letterSpacing: 8,
                        textAlignVertical: "center",
                        borderWidth: 1,
                        borderColor: "#2e2c43",
                        backgroundColor: "#f9f9f9",
                        borderRadius: 16,
                        width: "100%",
                        height: 53,
                        textAlign: "center",
                        fontSize: 17,
                      }}
                    />
                  </View>

                  <View style={{ flexDirection: "column", marginTop: 15 }}>
                    <Text style={{ fontSize: 16, color: "#2e2c43" }}>
                      Didn't receive it?
                    </Text>
                    <TouchableOpacity onPress={sendVerification}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "#e76043",
                        }}
                      >
                        RESEND
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>

          <TouchableOpacity
            disabled={otp.length !== 6}
            onPress={checkMobileNumber}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#fb8c00",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 18,
              width:"100%"
            }}
          >
             <View className="w-full flex justify-center items-center">
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "#fb8c00",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    Next
                  </Text>
                  </View>
          </TouchableOpacity>

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#fb8c00" />
            </View>
          )}
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
export default MobileNumberEntryScreen;
