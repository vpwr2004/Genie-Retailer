import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import ModalImg from "../assets/Cancel.svg"
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const RequestCancelModal= ({modalVisible,setModalVisible}) => {
  // const [modalVisible, setModalVisible] = useState(true);
  const dispatch=useDispatch();
  const navigation=useNavigation();
  const requestInfo= useSelector(state => state.requestData.requestInfo);
  const handleModal = async () => {
    
  
      try {
        console.log("RequestType canecl response", requestInfo);
        const res = await axios.patch(
          "https://genie-backend-meg1.onrender.com/chat/modify-spade-retailer",
          {
            id: requestInfo?._id,
            type: "cancelled"
          }
        );
        if(res.status===200){
          let tmp={...requestInfo,requestType:"cancelled"};
          dispatch(setRequestInfo(tmp));
          console.log("RequestType cancel response", res);
          setModalVisible(false);
        }
      } catch (error) {
        console.error("Error updating requestType 'new':", error);
      }
    } 
  
  
  
  return (
    
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   Alert.alert('Modal has been closed.');
        //   setModalVisible(!modalVisible);
        // }}
        className=" flex justify-center items-center  rounded-lg h-full ">
          <View className="flex-1  justify-center items-center">
                  <View className="bg-white w-[90%] p-[30px] justify-center items-center mt-[10px] gap-[24px] shadow-gray-600 shadow-2xl">
                      <ModalImg classname="w-[117px] h-[75px]"/>
                        <View className="">
                             <Text className="text-[15px] font-extrabold text-center">Are you sure? </Text>
                              <Text className="text-[14px] font-normal text-center  pt-[8px]">You are cancelling the bid request </Text>
                              
                        </View>
                        
                            <View className="w-full flex flex-row  justify-center">
                              <View className="flex-1 mt-[5px]">
                                  <Pressable onPress={()=>{setModalVisible(false)}} >
                                    <Text className="text-[14.5px] text-[#FB8C00] font-normal text-center">No</Text>
                          
                                  </Pressable> 
                              </View>
                            <View className="flex-1 mt-[5px]">
                                <Pressable  onPress={handleModal}>
                                  <Text className="text-[14.5px] text-[#FB8C00] font-semibold text-center">Yes</Text>
                       
                                </Pressable> 
                            </View>
                        
                  
                </View>
           </View>
      </View>
      </Modal>
      
      
  );
};

const styles = StyleSheet.create({
  
  // modalView: {
  //   margin: 20,
  //   backgroundColor: 'white',
  //   borderRadius: 20,
  //   padding: 35,
  //   alignItems: 'center',
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  
});

export default RequestCancelModal;