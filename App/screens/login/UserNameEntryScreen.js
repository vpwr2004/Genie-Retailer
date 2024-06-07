import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Pressable,
  ScrollView,
  BackHandler,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import StoreName from "../../assets/StoreName.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import {
  setStoreName,
  setStoreOwnerName,
} from "../../redux/reducers/storeDataSlice";
import StoreModal from "../../components/StoreModal";
import QuestionIcon from "../../assets/QuestionIcon.svg"
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserNameEntryScreen = () => {
  const navigation = useNavigation();
  const [storeName, setStoreNameLocal] = useState("");
  const [storeOwnerName, setStoreOwnerNameLocal] = useState("");
  const dispatch = useDispatch();
  // const navigationState = useNavigationState(state => state);
  // const isUserNameScreen= true;
  const [modalVisible,setModalVisible]=useState(false);
  const navigationState = useNavigationState(state => state);
  const isUserNameScreen = navigationState.routes[navigationState.index].name === 'registerUsername';
  console.log("isUserNameScreen",isUserNameScreen)

  useEffect(() => {
    const backAction = () => {
      if (isUserNameScreen) {

        BackHandler.exitApp();
        return true;
      }
      // } else {
      //   return false;
      // }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); // Clean up the event listener
  }, [isUserNameScreen]);

  const handleStoreName = (storeName) => {
    // Update the mobile number state
    setStoreNameLocal(storeName);
    // Log the mobile number value
    console.log(storeName);
  };
  const handleStoreOwnerName = (storeOwnerName) => {
    // Update the mobile number state
    setStoreOwnerNameLocal(storeOwnerName);
    // Log the mobile number value
    console.log(storeOwnerName);
  };

  const storeDetails = () => {
    try {
      // const authData = JSON.parse(await AsyncStorage.getItem("authData"));
      // console.log(authData);
      
      dispatch(setStoreName(storeName));
      dispatch(setStoreOwnerName(storeOwnerName));
       navigation.navigate("searchCategory");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={{flexGrow:1}}>
        <View className="bg-white flex-col justify-center " >
          <View className="w-full fixed z-40  top-16 flex flex-row justify-end items-center px-[32px]">
            {/* <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              className="flex flex-row p-2 items-center  gap-2"
            >
              <FontAwesome name="arrow-left" size={15} color="black" />
            </Pressable> */}
            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              className="flex flex-row p-2 items-center  gap-2"
            >
              <QuestionIcon/>
            </Pressable>
          </View>
          <View className="flex flex-col justify-center items-center ">
            <StoreName height={330} width={256} />
          </View>

          <View className="mt-[48px] mb-[27px] flex flex-col gap-[33px] px-[32px]">
            <View>
              <Text className="text-[16px] text-[#2e2c43]  font-semibold">
                Please enter your
              </Text>
              <Text className="text-[14px] text-[#2e2c43]">Store Name</Text>
              <KeyboardAvoidingView > 
                <View className="flex  items-center">
                  <TextInput
                    onChangeText={handleStoreName}
                    placeholder="Ex: Kishor Kumar"
                    className="w-[310px] h-[54px] bg-gray-200 stroke-[#2e2c43] rounded-3xl px-10 mt-[15px] "
                  />
                </View>
              </KeyboardAvoidingView>
            </View>
            <View>
              <Text className="text-[14px] text-[#2e2c43]">
                Store Owner Name
              </Text>
              <KeyboardAvoidingView>
                <View className="flex r items-center">
                  <TextInput
                    onChangeText={handleStoreOwnerName}
                    placeholder="Ex: Kishor Kumar"
                    className="w-[310px] h-[54px] bg-gray-200 stroke-[#2e2c43] rounded-3xl px-10 mt-[15px] "
                  />
                </View>
              </KeyboardAvoidingView>
            </View>
          </View>
          <TouchableOpacity disabled={!storeName || !storeOwnerName}
              onPress={storeDetails}>
            
              <View className=" w-full h-[63px] bg-[#fb8c00]  flex items-center justify-center  ">
                <Text className="text-white text-[18px] font-bold">NEXT</Text>
              </View>
           
          </TouchableOpacity>
        </View>
      </ScrollView>
      {
        modalVisible && <StoreModal modalConfirmVisible={modalVisible} setModalConfirmVisible={setModalVisible}/>
      }
      {modalVisible && (
                    <View style={styles.overlay} />
                )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overlay: {
      flex:1,
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent greyish background
  },

})

export default UserNameEntryScreen;
