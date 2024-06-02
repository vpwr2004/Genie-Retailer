import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome} from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Profile from "../../assets/ProfileIcon.svg"
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import ModalLogout from '../../components/ModalLogout';
import { setUserDetails } from '../../redux/reducers/storeDataSlice';




const MenuScreen = () => {
    const navigation = useNavigation();
    const dispatch=useDispatch();
    const user=useSelector(state=>state.storeData.userDetails || []);
    // const [user,setUser]=useState();
    const[modalVisible,setModalVisible]=useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch user location from AsyncStorage
                const userData = JSON.parse(await AsyncStorage.getItem('userData'));

                console.log("profile",userData);
                if (userData) {
                        dispatch(setUserDetails(userData));
                        console.log("userprofile",user);
                }
            } catch (error) {
                console.error('Error fetching user location:', error)
            }
        }

        fetchUserData()
    }, [])

    const deleteUserData = async () => {
        setModalVisible(true);
        
    };

    
  return (
    <SafeAreaView style={{ flex: 1 }}>
       
         <View className="pt-[42px] flex  gap-[60px]" style={{ flex: 1 }} >
             <View className="flex flex-row px-[32px] items-center ">
                 <View className="">
                     <Pressable onPress={() => {navigation.goBack()}} className="flex flex-row p-2 items-center  gap-2">
                                <FontAwesome name="arrow-left" size={15} color="black" />
                     </Pressable>
                    
                 </View>
                 <Text className="text-[16px] font-bold flex-1 flex text-center">Menu</Text>
             </View>

            <TouchableOpacity onPress={()=>navigation.navigate("profile")}>
                <View className="flex items-center">
                    <View className="flex flex-row gap-[32px] bg-white py-[48px] w-[90%] justify-center items-center rounded-md shadow-lg">
                    <Image source={{ uri:user? user?.storeImages[0]:"" }} width={70} height={70} className="rounded-full" />
                        <View className="flex-col">
                            <Text className="text-[16px] font-bold text-center capitalize">{user ?user?.storeOwnerName:""}</Text>
                            <Text className="text-[14px]">{user ?user?.storeMobileNo :""}</Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>

             <View className="px-[32px] flex flex-col gap-[40px]">
               
                    <TouchableOpacity onPress={()=>navigation.navigate("about")}>
                        <View className="flex flex-row justify-between items-center">
                        <Text className="text-[15px]">
                            About CulturTap Genie 
                        </Text>
                        <FontAwesome6 name="arrow-right" size={15} color="black" />

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <View className="flex flex-row justify-between items-center">
                        <Text className="text-[15px]">
                        Terms & Conditions 
                        </Text>
                        <FontAwesome6 name="arrow-right" size={15} color="black" />

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("help")}>
                        <View className="flex flex-row justify-between items-center">
                        <Text className="text-[15px]">
                        Need any Help ? 
                        </Text>
                        <FontAwesome6 name="arrow-right" size={15} color="black" />

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={deleteUserData}>
                        <View className="flex flex-row justify-between items-center">
                        <Text className="text-[15px]">
                        Log Out
                        </Text>
                        <FontAwesome6 name="arrow-right" size={15} color="black" />
                        </View>
                    </TouchableOpacity>
                    
        
             </View>
             
             <View className="absolute flex justify-center items-center">
            
          <ModalLogout
            user={user}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            
          />
          
        </View>
        {modalVisible && (
                    <View style={styles.overlay} />
                )}
         </View>
      
    </SafeAreaView>
  )
}

export default MenuScreen

const styles = StyleSheet.create({
    overlay: {
        flex:1,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent greyish background
    },
 
})