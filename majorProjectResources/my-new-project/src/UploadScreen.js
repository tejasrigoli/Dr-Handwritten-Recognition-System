import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../config';
import { async } from '@firebase/util';

const UploadScreen = () => {

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        //no permission request is neccessary for launching the image library

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });

        const source = { uri: result.assets[0].uri };
        console.log(source);
        setImage(source);

    };

    const uploadImage = async () => {
        setUploading(true);
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);
        var ref = firebase.storage().ref().child(filename).put(blob);

        try {
            await ref;

        } catch (e) {
            conole.log(e);
            throw error;
        }
        finally{
            setUploading(false);
        Alert.alert(
            'Photo uploaded..!!'
        );

        setImage(null);
        }
        
    };

    return (

        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
                <Text style={styles.buttonText}>Pick an Image</Text>
            </TouchableOpacity>
            <View styles={styles.imageContainer}>
                {image && <Image source={{ uri: image.uri }} style={{ width: 300, height: 300 }} />}
                <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
                    <Text style={styles.buttonText}>
                        Upload Image
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    );
};


export default UploadScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectButton: {
        borderRadius: 5,
        width: 150,
        height: 150,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadButton: {
        borderRadius: 5,
        width: 150,
        height: 150,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    imageContainer: {
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center',
    }
});
