import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ItemImg from "../assets/ItemImg.svg"
import Time from "../assets/time.svg"
import Calendar from "../assets/calendar.svg"
import { formatDateTime } from '../screens/utils/lib'

const ProductOrderCard = ({product}) => {
    // console.log("productdetails",product);
    // const prods = product?.filter(product => 
    //     product?.users?.some(user => user?.type === 'UserRequest')
    // );
    const prod=product;
    // console.log("prod",prod.requestId?.requestImages[0]);
    

   

    // Call the function to format the date and time
    const { formattedTime, formattedDate } = formatDateTime(prod?.updatedAt);
  return (
    <View className="max-w-[340px] flex-row items-center justify-between bg-white gap-[15px]  rounded-3xl shadow-2xl  px-[20px] h-max py-[20px]" >
                       <View className="w-[95px] h-[95px]  rounded-[15px]">
          
                              <Image source={{ uri:prod?.requestId?.requestImages?.length>0? prod.requestId.requestImages[0]:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" }} className="w-full h-full object-contain rounded-[15px]"  />
                        

                          
                       </View>
                        

                        <View className="w-10/12 px-[10px]"> 
                            <View className="flex flex-wrap w-10/12 pb-1 ">
                                <Text className="text-[14px] w-full " style={{ fontFamily: "Poppins-Regular" }}>{prod?.requestId?.requestDescription}</Text>
                            </View>

                            <View className="flex-row py-1 w-10/12 ">
                                <Text className="text-[12px]" style={{ fontFamily: "Poppins-Medium" }}>Expected Price: </Text>
                                <Text className="text-[12px] text-[#70B241] " style={{ fontFamily: "Poppins-SemiBold" }}>Rs. {prod?.requestId?.expectedPrice}</Text>
                            </View>
                            <View className="flex-row gap-[8px] w-10/12">
                                <View className="flex-row items-center  gap-[8px]">
                                    <Time size={13}/>
                                    <Text className="text-[12px]" style={{ fontFamily: "Poppins-Regular" }}>{formattedTime}</Text>
                                </View>
                                <View className="flex-row items-center gap-[8px]">
                                    <Calendar size={11}/>
                                    <Text className="text-[12px]" style={{ fontFamily: "Poppins-Regular" }}>{formattedDate}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
  )
}

export default ProductOrderCard

const styles = StyleSheet.create({})