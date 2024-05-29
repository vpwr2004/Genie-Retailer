import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ItemImg from "../assets/ItemImg.svg"
import Time from "../assets/time.svg"
import Calendar from "../assets/calendar.svg"

const ProductOrderCard = ({product}) => {
    // console.log("productdetails",product);
    // const prods = product?.filter(product => 
    //     product?.users?.some(user => user?.type === 'UserRequest')
    // );
    const prod=product;
    // console.log("prod",prod.requestId?.requestImages[0]);
    

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const timeOptions = { hour: 'numeric', minute: 'numeric' };
        const dateFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

        // Format time
        const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

        // Format date
        const formattedDate = date.toLocaleDateString('en-US', dateFormatOptions);
        // console.log(formattedDate,formattedTime)

        return { formattedTime, formattedDate };
    };

    // Call the function to format the date and time
    const { formattedTime, formattedDate } = formatDateTime(prod?.updatedAt);
  return (
    <View className="max-w-[340px] flex-row items-center justify-between bg-white gap-[15px] h-[153px]  rounded-3xl shadow-2xl px-[20px] " >
                       <View className="w-[95px] h-[95px]  rounded-[15px]">
                          
                       {prod && prod.requestId && prod.requestId.requestImages && prod.requestId.requestImages[0] && (
                              <Image source={{ uri: prod.requestId.requestImages[0] }} className="w-full h-full object-contain rounded-[15px]"  />
                        )}

                          
                       </View>
                        

                        <View className="w-10/12"> 
                            <View>
                                <Text className="text-[14px] ">{prod?.requestId?.requestDescription}</Text>
                            </View>

                            <View className="flex-row py-1">
                                <Text className="text-[12px]">Expected Price: </Text>
                                <Text className="text-[12px] text-[#70B241] font-bold">Rs. {prod?.requestId?.expectedPrice}</Text>
                            </View>
                            <View className="flex-row gap-[8px]">
                                <View className="flex-row items-center  gap-[8px]">
                                    <Time size={13}/>
                                    <Text className="text-[12px]">{formattedTime}</Text>
                                </View>
                                <View className="flex-row items-center gap-[8px]">
                                    <Calendar size={11}/>
                                    <Text className="text-[12px]">{formattedDate}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
  )
}

export default ProductOrderCard

const styles = StyleSheet.create({})