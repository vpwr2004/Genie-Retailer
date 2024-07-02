export const getCurrentUserId = (requestInfo) => {
    console.log("getCurrentChat", requestInfo?.requestId?._id);
    return requestInfo?.requestId?._id;
  };
