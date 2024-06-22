import { Alert } from "react-native";
import * as FileSystem from 'expo-file-system';
import { Feather } from '@expo/vector-icons'; 
import * as MediaLibrary from 'expo-media-library';

export const formatDateTime = (dateTimeString) => {
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


  
export const handleDownloadPress = async (imageUri, index,downloadProgress, setDownloadProgress) => {
    const mediaLibraryPermission = await MediaLibrary.getPermissionsAsync();
    console.log("mediaLibraryPermission", mediaLibraryPermission)
    if (mediaLibraryPermission.status !== 'granted') {
        alert('Permission required', 'We need permission to save images to your gallery.');
        return;
      }
  
      const fileUri = FileSystem.documentDirectory + imageUri.split('/').pop();
  
      const downloadResumable = FileSystem.createDownloadResumable(
        imageUri,
        fileUri,
        {},
        (downloadProgress) => {
          const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
          setDownloadProgress((prevState) => ({
            ...prevState,
            [index]: progress,
          }));
        }
      );
  
      try {
        const { uri } = await downloadResumable.downloadAsync();
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync('Download', asset, true);
        setDownloadProgress((prevState) => ({
          ...prevState,
          [index]: undefined, // Clear progress after download completion
        }));
        alert('Download complete');
      } catch (e) {
        console.error(e);
        setDownloadProgress((prevState) => ({
          ...prevState,
          [index]: undefined, // Clear progress on error
        }));
        alert('Download failed');
      }
    }
    
