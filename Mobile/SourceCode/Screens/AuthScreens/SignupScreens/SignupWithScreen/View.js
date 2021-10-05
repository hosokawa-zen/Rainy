//================================ React Native Imported Files ======================================//

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View, Text, Image, TouchableOpacity, StatusBar, Platform, Modal} from 'react-native';
// import { NavigationContainer, route } from '@react-navigation/native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import RNProgressHud from 'progress-hud';
import {Alert} from 'react-native';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../../Components/AppHeader/AppHeader';
import Button from '../../../../Components/Button/Button';
import colors from '../../../../Assets/Colors/colors';
import images from '../../../../Assets/Images/images';
import MyModel from '../../../../Components/Model/Model';
import styles from './Styles';
import database from '@react-native-firebase/database';
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import appleAuth from '@invertase/react-native-apple-authentication';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';

class SignupWith extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
        this.userId = '';
    }

    signupWithGoogle = async () => {
        try {
            await GoogleSignin.configure({
                webClientId: '541669291562-eaa1uptudj4ft14sdfqd561naoae6sle.apps.googleusercontent.com',
                offlineAccess: true,
            });
            await GoogleSignin.hasPlayServices();
            const {serverAuthCode, idToken, user} = await GoogleSignin.signIn();

            if (idToken && user) {
                const credential = auth.GoogleAuthProvider.credential(
                    idToken,
                    serverAuthCode,
                );
                var signed = await auth().signInWithCredential(credential);
                this.saveUser(signed);
            }
        } catch (error) {
            console.log(error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    saveUser = (credential) => {
        try {
            RNProgressHud.showWithStatus("Loading...");
            const user_id = credential.user.uid;
            var update = {};
            update[`users/${user_id}/user_id`] = user_id;
            update[`users/${user_id}/name`] = credential.user.displayName;
            update[`users/${user_id}/role`] = 3;
            update[`users/${user_id}/password`] = '';
            update[`users/${user_id}/email`] = credential.user.email;
            update[`users/${user_id}/avatar`] = credential.user.photoURL;
            update[`users/${user_id}/term_accepted`] = true;
            this.userId = user_id;
            database().ref().update(update).then(() => {
                RNProgressHud.dismiss();
                this.navigteToHome();
            });
        } catch (error) {
            alert(JSON.stringify(error));
            RNProgressHud.dismiss();
        }
    };

    signupWithFaceBook = async () => {
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
                return;
            }

            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
                throw new Error('Something went wrong obtaining access token');
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

            const signed = await auth().signInWithCredential(facebookCredential);
            this.saveUser(signed);
        } catch (error) {
            console.log(error);
        }
    };

    singupWithApple = async () => {
        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });

            // Ensure Apple returned a user identityToken
            if (!appleAuthRequestResponse.identityToken) {
                throw new Error('Apple Sign-In failed - no identify token returned');
            }

            // Create a Firebase credential from the response
            const {identityToken, nonce} = appleAuthRequestResponse;
            const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

            // Sign the user in with the credential
            const userCredential = await auth().signInWithCredential(appleCredential);
            this.saveUser(userCredential);
        } catch (error) {
        }
    };

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    };

    navigateScreem() {
        if (this.props && this.props.navigation) {
            this.props.navigation.navigate('TermsAndCondtions');
            this.setModalVisible(false);
        }
    }

    Privacy() {
        if (this.props && this.props.navigation) {
            this.props.navigation.navigate('PrivacyScreen');
            this.setModalVisible(false);
        }
    }

    navigteToHome() {
        this.props.navigation.navigate('drawer');
    }

    render() {
        const {modalVisible} = this.state;
        return (
            <View style={styles.mainContainer}>
                {/* //================================ StatusBar ======================================// */}
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor={colors.appDarkBlue}
                    translucent={false}
                />

                {/* //================================ Header ======================================// */}
                <View style={styles.headerView}>
                    <AppHeader
                        title={'Sign Up With'}
                    />
                </View>
                {/* //================================ Logo ======================================// */}
                <View style={styles.upperView}>
                    <Image style={styles.imageStyles} source={images.logo}></Image>
                </View>
                {/* //================================ Sign up Buttons ======================================// */}
                <View style={styles.midView}>
                    <Button
                        style={styles.buttonStyles}
                        title={'Sign up with Facebook'}
                        iconPlace={'left'}
                        icon={images.ic_fb}
                        bgColor={colors.fb_color}
                        titleColor={colors.white}
                        titleStyle={[styles.titleStyles, {color: colors.white}]}
                        iconWidth={wp(3)}
                        onPress={() => {
                            this.signupWithFaceBook();
                        }}
                    />
                    <Button
                        style={styles.buttonStyles}
                        title={'Sign up with Google'}
                        iconPlace={'left'}
                        bgColor={colors.white}
                        icon={images.googleIcon}
                        titleStyle={[styles.titleStyles, {color: colors.app_header_color}]}
                        iconStyle={styles.iconStyles}
                        onPress={() => {
                            this.signupWithGoogle();
                        }}
                    />
                    {Platform.OS === 'ios' && <Button
                        style={styles.buttonStyles}
                        title={'Sign up with Apple'}
                        iconPlace={'left'}
                        bgColor={colors.black}
                        icon={images.appleIcon}
                        iconTintColor={colors.white}
                        iconWidth={wp(5)}
                        titleStyle={[styles.titleStyles, {color: colors.white}]}
                        onPress={() => {
                            this.singupWithApple();
                        }}
                    />}
                    <Button
                        style={styles.buttonStyles}
                        title={'Sign up with Email'}
                        iconPlace={'left'}
                        bgColor={colors.app_button_color}
                        icon={images.ic_email}
                        iconTintColor={colors.app_background}
                        titleStyle={[styles.titleStylesEmail, {color: colors.app_header_color}]}
                        onPress={() => {
                            if (this.props && this.props.navigation) {
                                this.props.navigation.navigate('SignUpScreen');
                            }
                        }}
                    />
                </View>

                <View style={styles.lowerView}>
                    {/* //================================ Login Button ======================================// */}
                    <TouchableOpacity
                        onPress={() => {
                            if (this.props && this.props.navigation) {
                                this.props.navigation.navigate('LoginScreen');
                            }
                        }}>
                        <Text style={styles.textStyle}>Already have an account?</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!modalVisible);
                    }}>
                    <MyModel
                        onPressPrivacy={() => this.Privacy()}
                        onPressTerm={() => this.navigateScreem()}
                        onPressCondition={() => this.navigateScreem()}
                        onPressAgree={() => this.navigteToHome()}
                        onPressCancel={() => {
                            this.setModalVisible(!modalVisible);
                        }}
                    />
                </Modal>
            </View>
        );
    }
}

export default SignupWith;
