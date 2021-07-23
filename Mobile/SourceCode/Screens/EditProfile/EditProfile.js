//================================ React Native Imported Files ======================================//
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Image, StatusBar, View} from 'react-native';
import React from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

//================================ Local Imported Files ======================================//
import AppHeader from '../../Components/AppHeader/AppHeader';
import AppInput from '../../Components/AppInput/AppInput';
import Button from '../../Components/Button/Button';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import styles from './style';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

import RNProgressHud from 'progress-hud';
import { Alert } from 'react-native';


class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.userId = "";
        this.state = {
            avatar: "",
            name: "",
            position: "",
            email: "",
            uploadUri: "",
        }



        auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('user is logged');
                this.userId = user.uid;
                this.getUserInfo();
            } else {
                if (this.props && this.props.navigation) {
                    this.props.navigation.navigate("SocialLoginScreen")
                }
            }
        });
    }

    getUserInfo = () => {
        try {
            RNProgressHud.showWithStatus('Loading...')
            database().ref(`users/${this.userId}/`).once('value').then(snapshot => {
                if (snapshot.exists()) {
                    const user = snapshot.val()
                    const avatar = user.avatar ? user.avatar : "";
                    const name = user.name ? user.name : "";
                    const email = user.email ? user.email : "";
                    const position = user.position ? user.position : "";
                    this.setState({ avatar: avatar })
                    this.setState({ name: name })
                    this.setState({ position: position })
                    this.setState({ email: email })
                } else {
                alert("Can't get user info")
                }
                RNProgressHud.dismiss()
            })
        } catch (error) {
            alert(JSON.stringify(error))
        }
    }

    onChangeImagePicker = () => {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
                const imageUri = response.uri;
                let newWidth = 150;
                let newHeight = 150;
                let compressFormat = 'PNG';
                let quality = 100;
                let rotation = 0;
                let outputPath = null;
                ImageResizer.createResizedImage(
                    imageUri,
                    newWidth,
                    newHeight,
                    compressFormat,
                    quality,
                    rotation,
                    outputPath,
                )
                .then((response) => {
                    // response.uri is the URI of the new image that can now be displayed, uploaded...
                    //resized image uri
                    let uri = response.uri;
                    //to resolve file path issue on different platforms
                    let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                    //setting the image name and image uri in the state
                    this.setState({
                        uploadUri,
                        avatar: uri,
                    });
                })
                .catch((err) => {
                    console.log('image resizing error => ', err);
                });
            }
          });
    }

    saveProfile = async () => {
        try {
            RNProgressHud.showWithStatus('Saving...')
            if (this.state.uploadUri) {
                await new Promise((resolve, reject) => {
                    storage()
                    .ref(`users/${this.userId}/avatar.png`)
                    .putFile(this.state.uploadUri)
                    .then((snapshot) => {
                        storage().ref(`users/${this.userId}/avatar.png`).getDownloadURL()
                        .then((url) => {
                            //from url you can fetched the uploaded image easily
                            resolve("")
                            this.setState({avatar: url});
                        })
                        .catch((e) => {
                            reject("")
                        })

                    })
                    .catch((e) => {
                        reject("")
                        console.log('uploading image error => ', e)
                    });
                })
                this.setState({uploadUri: ""})
            }
            var update = {};
            update[`users/${this.userId}/name`] = this.state.name;
            update[`users/${this.userId}/position`] = this.state.position;
            update[`users/${this.userId}/avatar`] = this.state.avatar;
            database().ref().update(update);
            this.props.navigation.pop();
            RNProgressHud.dismiss()
        } catch (error) {
            alert(error)
            RNProgressHud.dismiss()
        }
    }
    render() {
        return (
            <View style={styles.mainCotainer}>
                {/* //================================ StatusBar ======================================// */}
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    // backgroundColor={colors.AppRedColor}
                    translucent={false}
                />
                {/* //================================ Header ======================================// */}
                <View style={styles.headerCotainer}>
                    <AppHeader
                        onLeftIconPress={() => this.props.navigation.goBack()}
                        leftIconPath={images.headerLeftBack}
                        title={'EDIT PROFILE'}
                    />
                </View>
                {/* //================================ Profile ======================================// */}
                <View style={styles.editProfileCotainer}>
                    <View style={styles.profilePicCotainer}>
                        <Image source={this.state.avatar != "" ? {uri: this.state.avatar} : images.no_user_image} style={styles.ImageStyles} />
                        <Button
                            style={styles.selectButton}
                            iconPlace={'left'}
                            icon={images.ic_camera_}
                            iconStyle={{
                                height: hp(10),
                                width: wp(10),
                            }}
                            bgColor={'rgba(0,0,0,0)'}
                            title={""}
                            width = {wp(10)}
                            onPress = {() => {this.onChangeImagePicker()}}
                        />
                    </View>
                    <View style={styles.ProfileCotainer}>
                        <View style={styles.commanCotainer}>
                            <View style={styles.inputTextCotainer}>
                                {/* //================================ Input Fields ======================================// */}
                                <AppInput
                                    height={hp(8)}
                                    placeholder={'Name'}
                                    width={'90%'}
                                    colortextInput={colors.black}
                                    placeholderTextColor={colors.dark_grey}
                                    backgroundColor={'#e3e3e3'}
                                    value = {this.state.name}
                                    onChangeText = {(text) => (this.setState({name: text}))}
                                />
                            </View>
                            <View style={styles.worldImageCotainer}>
                                <Image
                                    source={images.ic_globe}
                                    style={styles.worldImageStyles}
                                />
                            </View>
                            <View style={styles.downImageCotainer}>
                                <Image source={images.ic_sort_down} style={styles.downImageStyles} />
                            </View>
                        </View>
                        {/* <View style={styles.commanCotainer}>
                            <View style={styles.inputTextCotainer}>
                                <AppInput
                                    height={hp(8)}
                                    placeholder={'Position'}
                                    width={'90%'}
                                    colortextInput={colors.black}
                                    placeholderTextColor={colors.dark_grey}
                                    backgroundColor={'#e3e3e3'}
                                    value = {this.state.position}
                                    onChangeText = {(text) => (this.setState({position: text}))}
                                />
                            </View>
                            <View style={styles.worldImageCotainer}>
                                <Image
                                    source={images.ic_globe}
                                    style={styles.worldImageStyles}
                                />
                            </View>
                            <View style={styles.downImageCotainer}>
                                <Image source={images.ic_sort_down} style={styles.downImageStyles} />
                            </View>
                        </View> */}
                        <View style={styles.commanCotainer}>
                            <View style={styles.inputTextCotainer}>
                                <AppInput
                                    disabled = {true}
                                    height={hp(8)}
                                    placeholder={'Email Address'}
                                    value = {this.state.email}
                                    width={'90%'}
                                    colortextInput={colors.black}
                                    placeholderTextColor={colors.dark_grey}
                                    backgroundColor={'#e3e3e3'}
                                />
                            </View>
                            <View style={styles.worldImageCotainer}>
                                <Image source={images.ic_lock} style={styles.worldImageStyles}/>
                            </View>
                            <View style={styles.downImageCotainer}>
                                <Image source={images.ic_sort_down} style={styles.downImageStyles} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonCotainer}>
                        {/* //================================ Button ======================================// */}
                        <Button
                            onPress = {() => {this.saveProfile()}}
                            title={'SAVE'}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

export default EditProfile;
