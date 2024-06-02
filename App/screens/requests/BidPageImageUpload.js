import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import ThreeDots from "../../assets/ThreeDotIcon.svg";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Profile from "../../assets/ProfileIcon2.svg";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import ClickImage from "../../assets/ClickImg.svg";
import AddMoreImage from "../../assets/AddMoreImg.svg";
import { useDispatch, useSelector } from "react-redux";
import { setBidImages } from "../../redux/reducers/bidSlice";
import ModalCancel from "../../components/ModalCancel";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { manipulateAsync } from "expo-image-manipulator";
import { launchCamera } from "react-native-image-picker";

const BidPageImageUpload = () => {
  const [images, setImages] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { user, messages, setMessages } = route.params;
  const [imgIndex, setImgIndex] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [cameraScreen, setCameraScreen] = useState(false);
  const [addMore, setAddMore] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [whiteBalance, setWhiteBalance] = useState(
    Camera.Constants.WhiteBalance.auto
  );
  const [autoFocus, setAutoFocus] = useState(Camera.Constants.AutoFocus.on);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [scaleAnimation] = useState(new Animated.Value(0));
  const requestInfo = useSelector((state) => state.requestData.requestInfo);

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
        setImages((prevImages) => [...prevImages, result.secure_url]);

        setCameraScreen(false);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, [cameraScreen]);

  const handleNext = () => {
    dispatch(setBidImages(images));
    navigation.navigate("bidOfferedPrice", {
      user,
      messages,
      setMessages,
    });
  };

  const takePicture = async () => {
    const options = {
      mediaType: "photo",
      saveToPhotos: true,
    };

    launchCamera(options, async (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
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
          console.error("Error processing image: ", error);
        }
      }
    });
  };

  const pickImage = async () => {
    console.log("object", "hii");
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0.5,
    });

    console.log("pickImage", "result");
    if (!result.cancelled) {
      //   const processedUri = await handleImageProcessing(result.assets[0]);
      //   console.log("photodrive", processedUri);
      await getImageUrl(result.assets[0]);
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const deleteImage = (index) => {
    setImgIndex(index);
    setModalVisible(true);
  };

  return (
    <>
      {!cameraScreen && (
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="relative flex-grow bg-[#ffe7c8]">
              <View className="z-50 bg-[#ffe7c8] w-full flex flex-row px-[32px] justify-between items-center pt-[30px] pb-[20px]">
                <Pressable
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <FontAwesome name="arrow-left" size={15} color="black" />
                </Pressable>

                <View className="gap-[9px]">
                  <View className="flex-row gap-[18px]">
                    <View className="bg-[#F9F9F9] p-2 rounded-full">
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
              <View className="px-[50px] pb-[20px] flex bg-[#ffe7c8]">
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

              <View className="flex gap-[21px] px-[50px] pt-[10px] pb-[10px]">
                <View className="flex-row justify-between">
                  <Text className="font-bold">Send a Bid</Text>
                  <Text>Step 2/3</Text>
                </View>
                <Text>
                  Provide product images for better reference to customers for
                  product quality and availability
                </Text>
              </View>

              <View className="pb-[100px]">
                {images.length === 0 && (
                  <View className="z-0">
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          takePicture();
                        }}
                      >
                        <View className="flex-row justify-center">
                          <ClickImage />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          pickImage();
                          console.log("pressed pickimg");
                        }}
                      >
                        <View className="mx-[28px] mt-[30px] h-[63px] flex-row items-center justify-center border-2 border-[#fb8c00] rounded-3xl">
                          <Text className="text-[16px] font-bold text-[#fb8c00] text-center">
                            Browse Image
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                {images.length > 0 && (
                  <View>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      <View style={styles.container}>
                        <View style={styles.imageContainer}>
                          {images.map((image, index) => (
                            <Pressable
                              key={index}
                              onPress={() => handleImagePress(image)}
                            >
                              <View style={styles.imageWrapper}>
                                <Image
                                  source={{ uri: image }}
                                  style={styles.image}
                                />
                                <Pressable
                                  onPress={() => deleteImage(index)}
                                  style={styles.deleteIcon}
                                >
                                  <Entypo
                                    name="circle-with-cross"
                                    size={24}
                                    color="gray"
                                  />
                                </Pressable>
                              </View>
                            </Pressable>
                          ))}
                        </View>
                        <Modal
                          transparent
                          visible={!!selectedImage}
                          onRequestClose={handleClose}
                        >
                          <View style={styles.modalContainer}>
                            <Animated.Image
                              source={{ uri: selectedImage }}
                              style={[
                                styles.modalImage,
                                {
                                  transform: [{ scale: scaleAnimation }],
                                },
                              ]}
                            />
                            <Pressable
                              style={styles.closeButton}
                              onPress={handleClose}
                            >
                              <Entypo
                                name="circle-with-cross"
                                size={40}
                                color="white"
                              />
                            </Pressable>
                          </View>
                        </Modal>
                      </View>
                    </ScrollView>
                    <Pressable
                      onPress={() => setAddMore(!addMore)}
                      style={{ alignSelf: "flex-start" }}
                    >
                      <View style={{ marginLeft: 36, marginTop: 30 }}>
                        <AddMoreImage />
                      </View>
                    </Pressable>
                  </View>
                )}
                {!addMore ? (
                  images.length > 0 && (
                    <View className="w-full h-[68px]  bg-[#fb8c00] justify-center absolute bottom-0 left-0 right-0">
                      <TouchableOpacity onPress={handleNext}>
                        <View className="w-full flex justify-center items-center">
                        <Text className=" text-white font-bold text-center text-[16px]">
                          Next
                        </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
                ) : (
                  <View className="w-full absolute bottom-0 items-center left-0 right-0 px-[10px]">
                    <TouchableOpacity
                      onPress={() => {
                        pickImage();
                        setAddMore(false);
                      }}
                    >
                      <View className="w-full flex flex-row justify-between px-[40px] py-[15px]">
                        <Text className="text-[14px]">Upload Image</Text>
                        <FontAwesome6
                          name="arrow-right"
                          size={15}
                          color="black"
                        />
                      </View>
                    </TouchableOpacity>
                    <View className="h-[1px] w-full bg-gray-300 "></View>
                    <TouchableOpacity
                      onPress={() => {
                        takePicture();
                        setAddMore(false);
                      }}
                    >
                      <View className="w-full flex flex-row justify-between px-[40px] py-[15px]">
                        <Text className="text-[14px]">Click Image</Text>
                        <FontAwesome6
                          name="arrow-right"
                          size={15}
                          color="black"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
          <ModalCancel
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            imagesLocal={images}
            setImagesLocal={setImages}
            index={imgIndex}
          />
          {modalVisible && <View style={styles.overlay} />}
        </SafeAreaView>
      )}

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fb8c00" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginHorizontal: 30,
    gap: 5,
    marginTop: 10,
  },
  imageWrapper: {
    margin: 5,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "gray",
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 10,
  },
  // deleteIc: {
  //   position: 'absolute',
  //   top: 5,
  //   right: 5,
  // },
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
  deleteIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 2,
  },
  overlay: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent greyish background
  },
  bottomBar: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },
  captureButton: {
    alignSelf: "center",
    backgroundColor: "#FB8C00",
    padding: 10,
    borderRadius: 100,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default BidPageImageUpload;
