import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
  Platform,
  Dimensions,
  
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import StoreName from "../../assets/PanScreenImg.svg";
import BackArrow from "../../assets/BackArrow.svg";
import AddMoreImage from "../../assets/AddMoreImg.svg";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  setPanCard,
  setUserDetails,
  setPanScreenImage
} from "../../redux/reducers/storeDataSlice";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { manipulateAsync } from "expo-image-manipulator";
import { AntDesign } from "@expo/vector-icons";
import { launchCamera } from "react-native-image-picker";
import DelImg from "../../assets/delImg.svg"




const PanCardScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [addMore, setAddMore] = useState(false);
  const mobileNumber = useSelector((state) => state.storeData.mobileNumber);
  const storeName = useSelector((state) => state.storeData.storeName);
  const storeOwnerName = useSelector((state) => state.storeData.storeOwnerName);
  const storeService = useSelector((state) => state.storeData.storeService);
  const storeCategory = useSelector((state) => state.storeData.storeCategory);
  const user = useSelector((state) => state.storeData.userDetails);
  const uniqueToken = useSelector((state) => state.storeData.uniqueToken);

  const [cameraScreen, setCameraScreen] = useState(false);
  const [imagesLocal, setImagesLocal] = useState("");
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [panCard, setPanCardLocal] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { width } = Dimensions.get("window");


  console.log(
    mobileNumber,
    storeCategory,
    storeName,
    storeOwnerName,
    storeService,
    panCard,
    uniqueToken
  );

  const handlePanCard = (panCard) => {
    dispatch(setPanCard(panCard));
    setPanCardLocal(panCard);
  };

  const handleNext = async () => {
    setLoading(true);

    try {
      // Create user data object

      // Send user data to the server
      console.log("User data sent to");
      const response = await axios.post(
        "https://culturtap.com/retailer/",
        {
          storeOwnerName: storeOwnerName,
          storeName: storeName,
          storeMobileNo: mobileNumber,
          storeCategory: storeCategory,
          homeDelivery: storeService,
          panCard: panCard,
          uniqueToken:uniqueToken
        }
      );
      console.log("res", response);

      // Check if user creation was successful

      if (response.status === 201) {
        console.log("User created:", response.data);
        dispatch(setUserDetails(response.data));
        console.log("user", user);
        await AsyncStorage.setItem("userData", JSON.stringify(response.data));

        // Navigate to the next screen
        navigation.navigate("home");
      } else {
        // Handle error if user creation failed
        console.error("Error creating user:");
        Alert.alert("Error", "Failed to create user. Please try again later.");
        setLoading(false);
      }
    } catch (error) {
      // Handle error if request fails
      console.error("Error creating user:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred. Please try again later."
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, [cameraScreen]);
  const takePicture = async () => {
    const options = {
      mediaType: 'photo',
      saveToPhotos: true,
    };
  
    launchCamera(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ');
      } else {
        try {
          const newImageUri = response.assets[0].uri;
          const compressedImage = await manipulateAsync(
            newImageUri,
            [{ resize: { width: 800, height: 800 } }],
            { compress: 0.5, format: "jpeg", base64: true }
          );
          await getImageUrl(compressedImage);
        } catch (error) {
          console.error('Error processing image: ', error);
        }
      }
    });
  };
  

  const getImageUrl = async (image) => {
    setLoading(true);
    const CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/kumarvivek/image/upload";
    const base64Img = `data:image/jpg;base64,${image.base64}`;
    const data = {
      file: base64Img,
      upload_preset: "CulturTap",
      quality: 50,
    };

    try {
      const response = await fetch(CLOUDINARY_URL, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      });

      const result = await response.json();
      if (result.secure_url) {
        setImagesLocal(result.secure_url);
        dispatch(setPanScreenImage(result.secure_url));
        dispatch(setPanCard(result.secure_url));
        setPanCardLocal(result.secure_url);
        console.log("panImage",result.secure_url);

        setCameraScreen(false);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };



  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      await getImageUrl(result.assets[0]);
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const deleteImage =() => {
        
     setImagesLocal("");
     dispatch(setPanCard(""));
        setPanCardLocal("");
  };
  


  return (
    <>
   {!cameraScreen && (<View style={{ flex: 1,backgroundColor:"white" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="height"
      
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, backgroundColor: "white" }}
        >
          <View
            style={{
              justifyContent: "center",
             
            }}
          >
            <View
              style={{
                position: "absolute",
                width: "100%",
                top: 48,
                zIndex: 40,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 32,
              }}
            >
              <Pressable
                onPress={() => navigation.goBack()}
                style={{ padding: 4 }}
              >
                <BackArrow width={14} height={10} />
              </Pressable>
              <TouchableOpacity onPress={handleNext}>
                <Text
                  style={{ fontSize: 14, padding: 2 ,fontFamily: 'Poppins-Bold'}}
                  className="text-white " 
                >
                  Skip
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-col justify-center items-center px-[32px] gap-[20px]">
              <StoreName width={width} className="object-cover" />
              <Text className="text-[14.5px]  text-[#FB8C00]" style={{ fontFamily: "Poppins-Bold" }}>
                Step 6/9
              </Text>
            </View>
            <View style={{
                marginTop: 20,
                paddingHorizontal:32
              }}
            >
              <Text
                style={{ fontSize: 16, color: "#2e2c43", fontFamily: "Poppins-SemiBold" }}
              >
                Please submit your documents
              </Text>
              <Text style={{ fontSize: 14, color: "#2e2c43" ,fontFamily:"Poppins-Regular"}}>
                GST Certificate/Labor Certificate
              </Text>
              <View className="flex flex-row gap-[40px] mt-[10px]">
              <TouchableOpacity onPress={() => setAddMore(!addMore)}>
                  <View>
                    <AddMoreImage />
                  </View>
                </TouchableOpacity>

                {
                  imagesLocal.length>0 && (
                    <View  className="rounded-[16px]">
                  <Image
                    source={{ uri: imagesLocal }}
                    width={154}
                    height={124}
                    className="rounded-[16px] border-[1px] border-[#cbcbce] object-cover"
                  />
                  <Pressable
                              onPress={() => deleteImage()}
                              style={styles.deleteIcon}
                            >
                             <DelImg/>
                            </Pressable>
                </View>
                  )
                }
              </View>
             
               
              </View>
              
          </View>
        </ScrollView>
        {!addMore && (
          <TouchableOpacity
            onPress={handleNext}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 68,
              backgroundColor: "#fb8c00",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
             {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
            <Text style={{ color: "white", fontSize: 18, fontFamily:"Poppins-Black" }}>
              NEXT
            </Text>
            )}
          </TouchableOpacity>
        )}
        {addMore && (
          <View className="w-full absolute bottom-0 items-center left-0 right-0 px-[10px]">
            <TouchableOpacity
              onPress={() => {
                setAddMore(!addMore);
                pickImage();
              }}
            >
              <View className="w-full flex flex-row justify-between px-[40px] py-[20px]">
                <Text className="text-[14px]" style={{ fontFamily: "Poppins-Regular" }}>Upload Image</Text>
                <FontAwesome name="arrow-right" size={15} color="black" />

              </View>
            </TouchableOpacity>
            <View className="h-[1px] w-full bg-gray-300"></View>
            <TouchableOpacity
              onPress={() => {
                setAddMore(!addMore);
                takePicture();
              }}
            >
              <View className="w-full flex flex-row justify-between px-[40px] py-[20px]">
                <Text className="text-[14px]" style={{ fontFamily: "Poppins-Regular" }}>Click Image</Text>
                <FontAwesome name="arrow-right" size={15} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fb8c00" />
        </View>
       )}
    </View>)
   }
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
  deleteIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 1,
  },
});
export default PanCardScreen;
