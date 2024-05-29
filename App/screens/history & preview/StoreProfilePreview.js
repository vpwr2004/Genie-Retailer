import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome} from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import EditIcon from "../../assets/editIcon.svg"
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';



const StoreProfilePreview = () => {
    const navigation = useNavigation();

    const mobileNumber = useSelector(state => state.storeData.mobileNumber);
    const  storeName = useSelector(state => state.storeData.storeName);
    const storeOwnerName = useSelector(state => state.storeData.storeOwnerName);
    const  panCard = useSelector(state => state.storeData.panCard);
    const  storeService= useSelector(state => state.storeData.storeService);
    const location= useSelector(state => state.storeData.storeLocation);
    const storeCategory= useSelector(state => state.storeData.storeCategory);
    const storeDescription= useSelector(state => state.storeData.storeDescription);
//     const mainImage=useSelector(state => state.storeData.images.mainImage);
    const storeImages=useSelector(state => state.storeData.images) || [];
    

    console.log("Mobile Number from Redux:", mobileNumber,storeName,storeOwnerName,panCard,storeService,location,storeCategory,storeDescription,storeImages);
  return (
    <SafeAreaView>
        <ScrollView showsverticallScrollIndicator={false}>
         <View className="pt-[42px] flex ">
             <View className="flex flex-row px-[32px] ">
                 <View className="">
                     <Pressable onPress={() => {navigation.goBack()}} className="flex flex-row items-center  gap-2">
                                <FontAwesome name="arrow-left" size={15} color="black" />
                     </Pressable>
                    
                 </View>
                 <Text className="text-[16px] font-extrabold flex-1 flex text-center">Store Profile Preview</Text>
             </View>
             <Text className="text-center mb-[20px]">Shiv Electronics</Text>
             <View className="flex flex-col justify-center items-center p-[18px]">
                           <Image
                                         source={{ uri: storeImages[0] }}
                                         width={129}
                                         height={129}
                                         className="rounded-full border-[1px] border-slate-400 object-contain"
                                />
                
                       </View>
                <Pressable onPress={()=>{console.log("click")}}>
                    <View className="z-40 p-2 bg-white rounded-full absolute bottom-0 -right-[50px]">
                                
                    <EditIcon className=""/>
                    </View>
                </Pressable>
                
             </View>
             <Text className="px-[32px] mb-[10px]">Other Images for references</Text>

             <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {

                
                        storeImages.length>1?(
                      
                        <View className="pl-[32px] flex flex-row gap-[11px] mb-[60px]">

                               { storeImages.slice(1)?.map((image, index) => ( // Start from index 1 to exclude the first image
                                <View key={index} className="rounded-[16px]">
                                        <Image
                                          source={{ uri: image }}
                                           width={119}
                                           height={164}
                                          className="rounded-[16px] border-[1px] border-[#cbcbce] object-contain"
                                   />
                               </View>))
                               }
                         </View>
                
                       
                        ):
                        (
                    <View className="pl-[32px] flex flex-row gap-[11px] mb-[60px]">
                        <View className="w-[119px] h-[164px] bg-[#F9F9F9] rounded-[16px] shadow-lg border-[1px] border-[#cbcbce]"></View>
                         <View className="w-[119px] h-[164px] bg-[#f9f9f9] rounded-[16px] shadow-lg border-[1px] border-[#cbcbce]"></View>
                         <View className="w-[119px] h-[164px] bg-[#f9f9f9] rounded-[16px] shadow-lg border-[1px] border-[#cbcbce]"></View>
                         <View className="w-[119px] h-[164px] bg-[#f9f9f9] rounded-[16px] shadow-lg border-[1px] border-[#cbcbce]"></View>
                    </View>

                        )
                }
                    
            </ScrollView>

             <View className="px-[32px] flex flex-col gap-[26px] mb-[40px]">
               
                   <View className="flex flex-col gap-[11px]">
                         <View className="flex flex-row justify-between">
                         <Text className="text-[14px] text-[#2e2c43]">Fetched Location</Text>
                         <Pressable onPress={()=>{console.log("refresh")}}>
                         <Text className="text-[14px] text-[#FB8C00] font-bold">Refresh</Text>
                         </Pressable>

                         </View>
                         <KeyboardAvoidingView>
                                 <View className="flex  items-center ">
                                    <TextInput
                                         placeholder={location}
                                        placeholderTextColor={"#81715D"}
                                        readOnly
                                        className="w-[330px] text-[14px]  px-[20px] py-[15px] bg-[#F9F9F9] font-semibold text-black rounded-[16px]"
                                        />
                                </View>
                        </KeyboardAvoidingView>
                   </View>
                   <View className="flex flex-col gap-[11px]">
                         <Text className="text-[14px] text-[#2e2c43] ">Store Name</Text>
                         <KeyboardAvoidingView className="flex items-center">
                                 <View className="flex flex-row items-center justify-between w-[324px] h-[54px] px-[20px] bg-[#F9F9F9] rounded-[16px]">
                                        <TextInput
                                         placeholder={storeName}
                                        placeholderTextColor={"#dbcdbb"}
                                         
                                        className="w-[280px] text-[14px]  font-semibold text-black "
                                        />
                                        <Pressable>
                                        <EditIcon className="px-[10px]"/>
                                        </Pressable>
                                </View>
                        </KeyboardAvoidingView>
                   </View>
                   <View className="flex flex-col gap-[11px]">
                         <Text className="text-[14px] text-[#2e2c43] ">Store Owner Name</Text>
                         <KeyboardAvoidingView className="flex items-center">
                                 <View className="flex flex-row items-center justify-between w-[324px] h-[54px] px-[20px] bg-[#F9F9F9] rounded-[16px]">
                                        <TextInput
                                         placeholder={storeOwnerName}
                                        placeholderTextColor={"#dbcdbb"}
                                        
                                        className="w-[280px] text-[14px]  font-semibold text-black "
                                        />
                                        <Pressable>
                                        <EditIcon className="px-[10px]"/>
                                        </Pressable>
                                </View>
                        </KeyboardAvoidingView>
                   </View>
                   <View className="flex flex-col gap-[11px]">
                         <Text className="text-[14px] text-[#2e2c43] ">Store Category</Text>
                         <KeyboardAvoidingView className="flex items-center">
                                 <View className="flex flex-row items-center justify-between w-[324px] h-[54px] px-[20px] bg-[#F9F9F9] rounded-[16px]">
                                        <TextInput
                                         placeholder={storeCategory}
                                        placeholderTextColor={"#dbcdbb"}
                                        
                                        className="w-[280px] text-[14px] font-semibold text-black "
                                        />
                                        <Pressable>
                                        <EditIcon className="px-[10px]"/>
                                        </Pressable>
                                </View>
                        </KeyboardAvoidingView>
                   </View>
                   <View className="flex flex-col gap-[11px]">
                         <Text className="text-[14px] text-[#2e2c43] ">Store Description</Text>
                         <KeyboardAvoidingView className="flex items-center">
                                 <View className="flex flex-row items-center justify-between w-[324px] h-[54px] px-[20px] bg-[#F9F9F9] rounded-[16px]">
                                        <TextInput
                                         placeholder={storeDescription}
                                        placeholderTextColor={"#dbcdbb"}
                                        
                                        className="w-[280px] text-[14px] font-semibold text-black "
                                        />
                                        <Pressable>
                                        <EditIcon className="px-[10px]"/>
                                        </Pressable>
                                </View>
                        </KeyboardAvoidingView>
                   </View>
                   <View className="flex flex-col gap-[11px]">
                         
                              <Text className="  text-[14px] font-normal">
                                 Mobile Number
                                </Text>
                                <KeyboardAvoidingView className="flex items-center">
                                 <View className="flex flex-row items-center gap-[10px] w-[324px] h-[54px] px-[20px] bg-[#F9F9F9] rounded-[16px]">
                                        <View className="text-[16px] font-extrabold border-r-[1px] border-[#dbcdbb] flex flex-row gap-[9px] pr-[9px] items-center">
                                          <Text className="text-[16px] font-extrabold">+91</Text>
                                          <Entypo name="chevron-down" size={16} color="black" className="" />
                                        </View>
                                          <TextInput
                                                placeholder={mobileNumber}
                                                placeholderTextColor={"#dbcdbb"}
                                                keyboardType='numeric'
                                                className="text-[16px] font-semibold text-black"
                                                />
                                </View>
                          </KeyboardAvoidingView>
                         
                   </View>
                   <View className="flex flex-col gap-[11px]">
                         <Text className="text-[14px] text-[#2e2c43] ">Pan Card</Text>
                         <KeyboardAvoidingView className="flex items-center">
                                 <View className="flex flex-row items-center justify-between w-[324px] h-[54px] px-[20px] bg-[#F9F9F9] rounded-[16px]">
                                        <TextInput
                                         placeholder={panCard}
                                        placeholderTextColor={"#dbcdbb"}
                                        
                                        className="w-[280px] text-[14px] font-semibold text-black "
                                        />
                                        <Pressable>
                                        <EditIcon className="px-[10px]"/>
                                        </Pressable>
                                </View>
                        </KeyboardAvoidingView>
                   </View>
                    
        
             </View>
             <TouchableOpacity >
                <Pressable onPress={() => { navigation.navigate("home") }} >
                    <View className="w-full h-[63px] bg-[#fb8c00]  flex items-center justify-center ">
                        <Text className="text-white text-[18px] font-extrabold">SUBMIT</Text>
                    </View>
                </Pressable>
             </TouchableOpacity>
         
         </ScrollView>
      
    </SafeAreaView>
  )
}

export default StoreProfilePreview

const styles = StyleSheet.create({})