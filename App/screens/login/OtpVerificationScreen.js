

import { View, Text, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, Pressable ,ActivityIndicator,ScrollView,StyleSheet, ToastAndroid} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import MobileNumberImg from '../../assets/mobile.svg'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUserDetails } from '../../redux/reducers/storeDataSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';





const OtpVerificationScreen = () => {
    const dispatch=useDispatch();
    const inputRefs = useRef([]);
    const navigation = useNavigation();
    const mobileNumber = useSelector(state => state.storeData.mobileNumber);
    const[loading,setLoading]=useState(false)
    const [otp,setOtp]=useState("")
    const route=useRoute();
   const[confirm,setConfirm]=useState()
    // const confirm=useSelector(state => state.storeData.authData);
    


    useEffect(() => {
        if (route.params) {
            setConfirm(route.params?.confirmed);
            console.log("verify",confirm)
           
            //         // console.log('images', images);
            //         // console.log('route.params.data', route.params.data);
        }
    }, [route.params])
    
//   

    const handleOtp = (otp) => {
        setOtp(otp);
        console.log(otp)
    };

   
   


    // const handleInputChange = (index, value) => {
    //     // If the backspace key is pressed and the value is empty
    //     if (value === '' && index > 0) {
    //       // Focus the previous input
    //       inputRefs.current[index - 1].focus();
    //       // Remove the character at the current index from the OTP string
    //       setOtp(prevOtp => prevOtp.slice(0, index - 1) + prevOtp.slice(index));
    //     } else if (value.length === 1) {
    //       // Automatically move focus to the next input box
    //       if (index < inputRefs.current.length - 1) {
    //         inputRefs.current[index + 1].focus();
    //       }
    //       // Append the new character to the OTP string
    //       setOtp(prevOtp => prevOtp + value);
    //     }
    //   };
    // useEffect(() => {
    //     const fetchUserData = async () => {
    //       try {
    //         // Make a request to your backend to fetch user data
    //       //    console.log('Fetching user data',user.storeMobileNo);
  
    //         const response = await axios.get('https://genie-backend-meg1.onrender.com/retailer/',{
    //           params: {
    //         storeMobileNo: "7070707060" // Pass storeMobileNo as a query parameter
    //       }
    //       });
  
    //       console.log("userdata",response.data);
  
    //       //   setUserData(response.data);
            
    //       } catch (error) {
    //         console.error('Error fetching user data:', error);
    //       }
    //     }; 
    
    //     fetchUserData();
    //   }, []);


    const checkMobileNumber = async () => {
        setLoading(true);
        try {
            // Make a request to your backend API to check if the mobile number is registered
             
             console.log(confirm)
             const res=await confirm.confirm(otp);
             console.log("res",res);
             console.log(otp);
          //   if(res){
          //   const response = await axios.get('https://genie-backend-meg1.onrender.com/retailer/',{
          //       params: {
          //                   storeMobileNo:mobileNumber 
          //               }
          //   });
          //   console.log("res",response);
          //   if (response.data.storeMobileNo) {
          //       // If mobile number is registered, navigate to home screen
          //       dispatch(setUserDetails(response.data));
          //       await AsyncStorage.setItem('userData', JSON.stringify(response.data));
          //       setOtp("");
          //       navigation.navigate('home');
          //   } else if(response.data.status === 404 ){
          //       // If mobile number is not registered, continue with the registration process
          //       navigation.navigate('registerUsername');
          //   }
          // }
          // else{
          //   console.log('Invalid otp:');
          // }
        } catch (error) {
            console.error('Error checking mobile number:', error);
        }finally{
            setLoading(false);
        }
    };
    

    return (
      
        <SafeAreaView style={{ flex: 1 ,backgroundColor:"white"}}>
        <KeyboardAvoidingView behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
       
          <View style={{   alignItems: 'center' }}>
             <View className="w-full z-40 top-[20px]  absolute flex flex-row justify-between items-center  px-[32px]">
                                <Pressable onPress={() => { navigation.goBack() }} className="flex flex-row p-2 items-center  gap-2">
                                    <FontAwesome name="arrow-left" size={15} color="black" />
                                </Pressable>
            </View>                  

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <MobileNumberImg height={388} width={306} />
            </View>
           
            <View style={{ paddingHorizontal: 32 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#001b33', marginTop: 35.54 }}>ENTER OTP</Text>
              <Text style={{ fontSize: 14, color: '#2e2c43' }}>It should be autofilled or type manually</Text>
             
               
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 19 }}>
                    <TextInput
                       placeholder="* * * * * *"
                       maxLength={6}
                       placeholderTextColor={"#dbcdbb"}
                       keyboardType='numeric'
                       onChangeText={handleOtp}
                    style={{ letterSpacing:8,textAlignVertical:'center',borderWidth: 1, borderColor: '#2e2c43', backgroundColor: '#f9f9f9', borderRadius: 16,width:"100%",  height: 53, textAlign: 'center', fontSize: 17 }}
                    />
                </View>
              
              
              <View style={{ flexDirection: 'column', marginTop: 15 }}>
                <Text style={{ fontSize: 16, color: '#2e2c43' }}>Didn't receive it?</Text>
                <Pressable onPress={() => console.log("Resend clicked")}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#e76043' }}>RESEND</Text>
                </Pressable>
              </View>
             
              
            </View>
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
        
        <TouchableOpacity  disabled={otp.length!==6} onPress={checkMobileNumber} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fb8c00', justifyContent: 'center', alignItems: 'center', paddingVertical: 18 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Next</Text>
        </TouchableOpacity>
        
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fb8c00" />
          </View>
        )}
      </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
            ...StyleSheet.absoluteFill,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }
    });

export default OtpVerificationScreen