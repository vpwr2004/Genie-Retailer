import { View, Text, Pressable, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import ArrowLeft from '../../assets/arrow-left.svg';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
// import { setMainImage,addOtherImage } from '../../redux/reducers/storeDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setImages } from '../../redux/reducers/storeDataSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const ImagePreview= () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [imagesLocal, setImagesLocal] = useState();
    const dispatch=useDispatch()
    const storeDescription=useSelector(state=>state.storeData.storeDescription)

    useEffect(() => {
        if (route.params) {
            setImagesLocal(route.params.data);
                 console.log('images', imagesLocal);
            //         // console.log('route.params.data', route.params.data);
        }
    }, [])

    

    const handleImage = async () => {
        const userData = JSON.parse(await AsyncStorage.getItem('userData'));
        const userId = userData._id;
    
        try {
            
    
            imagesLocal?.forEach(image => {
                console.log("otherimage",image);
                // dispatch(setImages(image));
            });
    
            // Update location on server
            const response = await axios.patch(`https://genie-backend-meg1.onrender.com/retailer/editretailer`, {
                _id: userId,
                storeImages:imagesLocal,
                storeDescription: storeDescription
            });
    
            console.log('Image updated successfully:', response.data);
            
            // Update user data in AsyncStorage
            await AsyncStorage.setItem('userData', JSON.stringify(response.data));
            
            // Navigate to home only after successfully updating the location
             navigation.navigate('home');
        } catch (error) {
            console.error('Failed to update images:', error);
            // Optionally handle error differently here
        }
    };
    
    

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                    <View className="w-full z-40 mt-[40px]  flex flex-row justify-between items-center  px-[32px]">
                            <Pressable onPress={() => { navigation.goBack()}} className="flex p-2 flex-row items-center  gap-2">
                                <FontAwesome name="arrow-left" size={15} color="black"/>
                            </Pressable>
                            <Text className="flex flex-1 justify-center items-center text-center text-[16px]">Select Store Profile Pic</Text>
                    </View>
                

                <View className="w-full flex items-center justify-center mt-[36px]">
                    <View style={{ overflowX: 'scroll' }} className="flex-row w-screen justify-center  gap-[10px] mt-[25px]">{
                       
                            <View className="rounded-full">

                                {
                                    imagesLocal ?( <Image
                                         source={{ uri: imagesLocal[0] }}
                                         width={271}
                                         height={271}
                                         className="rounded-full border-[1px] border-slate-400 object-contain"
                                />):
                                (
                                     <View className="h-[271px] w-[271px] rounded-full border-[1px] border-slate-400 object-contain">
                                     
                                     </View>

                                )
                               } 
                            </View>
                        

                    }

                    </View>
                </View>
             
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    <View className="flex-row  gap-[10px] mt-[25px] px-[32px]">
                     {imagesLocal?.map((image, index) => ( // Start from index 1 to exclude the first image
                                     <View key={index} className="rounded-3xl">
                                             <Image
                                               source={{ uri: image }}
                                                width={140}
                                                height={200}
                                               className="rounded-3xl border-[1px] border-slate-400 object-contain"
                                        />
                                    </View>
                            ))}
                    </View>
                </ScrollView>

                    
                
               

                <View className="w-full h-[68px]  bg-[#fb8c00] justify-center absolute bottom-0 left-0 right-0">
                    <Pressable onPress={handleImage}>
                        <Text className="text-white font-bold text-center text-[16px]">Continue</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ImagePreview