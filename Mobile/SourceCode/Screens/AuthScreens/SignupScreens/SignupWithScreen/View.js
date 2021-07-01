//================================ React Native Imported Files ======================================//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View, Text, Image, TouchableOpacity, StatusBar, Platform, Modal } from 'react-native';
// import { NavigationContainer, route } from '@react-navigation/native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import RNProgressHud from 'progress-hud';
import { Alert } from 'react-native';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../../Components/AppHeader/AppHeader';
import Button from '../../../../Components/Button/Button';
import colors from '../../../../Assets/Colors/colors';
import images from '../../../../Assets/Images/images';
import MyModel from '../../../../Components/Model/Model';
import styles from './Styles';
import database from '@react-native-firebase/database';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import  {FBLoginManager} from 'react-native-facebook-login';
import { appleAuth , appleAuthAndroid} from '@invertase/react-native-apple-authentication';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid'

class SignupWith extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.userId = "";
  }

  signupWithGoogle = async() => {
    try {

      await GoogleSignin.configure({
        iosClientId: '541669291562-nat1bvrrqpk3cb51s33qodbn518qgmj1.apps.googleusercontent.com',
        webClientId: '541669291562-eaa1uptudj4ft14sdfqd561naoae6sle.apps.googleusercontent.com',
        offlineAccess: true
      });
      await GoogleSignin.hasPlayServices();
      const {serverAuthCode, idToken, user} = await GoogleSignin.signIn();
      console.log(user, idToken)
      if (idToken && user) {
        const credential = auth.GoogleAuthProvider.credential(
          idToken,
          serverAuthCode,
        );
        var signed = await auth().signInWithCredential(credential);
        console.log(signed)
        this.saveUser(signed);
        this.setModalVisible(true);
      }
    } catch (error) {
      console.log(error)
      alert(error.message)
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
  }

  saveUser = (credential) => {
    try {
      const user_id = credential.user.uid;
      var update = {};
      update[`users/${user_id}/user_id`] = user_id;
      update[`users/${user_id}/name`] = credential.user.displayName;
      update[`users/${user_id}/role`] = 3;
      update[`users/${user_id}/password`] = "";
      update[`users/${user_id}/email`] = credential.user.email;
      update[`users/${user_id}/avatar`] = credential.user.photoURL;
      database().ref().update(update);
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  signupWithFaceBook = () => {
    // const LoginBehavior = {
    //   'ios': FBLoginManager.LoginBehaviors.Browser,
    //   'android': FBLoginManager.LoginBehaviors.Native
    // }
    
    // FBLoginManager.setLoginBehavior(LoginBehavior[Platform.OS]); // defaults to Native
 
    // FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
    //   if (!error) {
    //     console.log("Login data: ", data);
    //     const token = data.credentials.token;
    //     auth()
    //     .signInWithCredential(auth.FacebookAuthProvider.credential(token)).then((userCredential) => {
    //       if (userCredential.user) {
    //         const user_id = credential.user.id;
    //         this.saveUser(userCredential);
    //         this.userId = user_id;
    //         this.setModalVisible(true);
    //       }
    //     })
    //   } else {
    //     alert(error.message)
    //     console.log("Error: ", error);
    //   }
    // })
  }

  singupWithApple = async () => {
    
    if (Platform.OS == 'ios') {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      const { identityToken, nonce } = appleAuthRequestResponse;
      if (identityToken) {
        const appleCredential = firebase.auth.AppleAuthProvider.credential(identityToken, nonce);
        const userCredential = await firebase.auth().signInWithCredential(appleCredential);
        if (userCredential.user) {
          this.saveUser(userCredential);
          const user_id = credential.user.id;
          this.userId = user_id;
          this.setModalVisible(true);
        }
      }
    } else {
      const rawNonce = uuid();
      const state = uuid();
  
      try {
        appleAuthAndroid.configure({
          clientId: "com.example.client-android",
          redirectUri: "https://example.com/auth/callback",
          scope: appleAuthAndroid.Scope.ALL,
          responseType: appleAuthAndroid.ResponseType.ALL,
          nonce: rawNonce,
          state,
        });
        const response = await appleAuthAndroid.signIn();
        if (response) {
          const id_token = response.id_token;
          const appleCredential = firebase.auth.AppleAuthProvider.credential(id_token, rawNonce);
          const userCredential = await firebase.auth().signInWithCredential(appleCredential);
          if (userCredential.user) {
            this.saveUser(userCredential);
            const user_id = credential.user.id;
            this.userId = user_id;
            this.setModalVisible(true);
          }
        }
      } catch (error) {
        if (error && error.message) {
          alert(error.message)
          switch (error.message) {
            case appleAuthAndroid.Error.NOT_CONFIGURED:
              console.log("appleAuthAndroid not configured yet.");
              break;
            case appleAuthAndroid.Error.SIGNIN_FAILED:
              console.log("Apple signin failed.");
              break;
            case appleAuthAndroid.Error.SIGNIN_CANCELLED:
              console.log("User cancelled Apple signin.");
              break;
            default:
              break;
          }
        }
      }
    }
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  navigateScreem() {
    if (this.props && this.props.navigation) {
      this.props.navigation.navigate('TermsAndCondtions');
      this.setModalVisible(!this.state.modalVisible);
    }
  }

  Privacy() {
    if (this.props && this.props.navigation) {
      this.props.navigation.navigate('PrivacyScreen');
      this.setModalVisible(!this.state.modalVisible);
    }
  }

  navigteToHome() {
    try {
      var update = {};
      update[`users/${this.userId}/term_accepted`] = true;
      database().ref().update(update);
      if (this.props && this.props.navigation) {
        this.props.navigation.navigate('drawer');
        this.setModalVisible(!this.state.modalVisible);
      }
    } catch (error) {
      alert(JSON.stringify(error))
    }
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
            titleStyle={[styles.titleStyles,{color:colors.white}]}
            iconWidth={wp(3)}
            onPress={() => {this.signupWithFaceBook()}}
          />
          <Button
            style={styles.buttonStyles}
            title={'Sign up with Google'}
            iconPlace={'left'}
            bgColor={colors.white}
            icon={images.googleIcon}
            titleStyle={[styles.titleStyles,{color:colors.app_header_color}]}
            iconStyle={styles.iconStyles}
            onPress={() => {this.signupWithGoogle()}}
          />
          <Button
            style={styles.buttonStyles}
            title={'Sign up with Apple'}
            iconPlace={'left'}
            bgColor={colors.black}
            icon={images.appleIcon}
            iconTintColor={colors.white}
            iconWidth={wp(5)}
            titleStyle={[styles.titleStyles,{color:colors.white}]}
            onPress={() => {this.singupWithApple()}}
          />
          <Button
            style={styles.buttonStyles}
            title={'Sign up with Email'}
            iconPlace={'left'}
            bgColor={colors.app_button_color}
            icon={images.ic_email}
            iconTintColor={colors.app_background}
            titleStyle={[styles.titleStylesEmail,{color:colors.app_header_color}]}
            onPress={() => {
              if (this.props && this.props.navigation) {
                this.props.navigation.navigate('SignUpScreen')
              }
            }}
          />
        </View>

        <View style={styles.lowerView}>
          {/* //================================ Login Button ======================================// */}
          <TouchableOpacity
            onPress={() => {
              if (this.props && this.props.navigation) {
                this.props.navigation.navigate('SocialLoginScreen')
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
