//================================ React Native Imported Files ======================================//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  Platform, KeyboardAvoidingView,
} from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../../Components/AppHeader/AppHeader';
import AppInput from '../../../../Components/AppInput/AppInput';
import Button from '../../../../Components/Button/Button';
import MyModel from '../../../../Components/Model/Model';
import colors from '../../../../Assets/Colors/colors';
import images from '../../../../Assets/Images/images';
import styles from './Styles';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import RNProgressHud from 'progress-hud';
import { Alert } from 'react-native';

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      view: 'this',
      showPassword: true,
      checkValue: false,
      email: "",
      password: "",
      emailValidate: false,
      charLengthValidate: false,
      charLetterValidate: false,
      charNumberValidate: false,
      charSpecValidate: false
    };
    this.userId = "";
  }

  //================================ Navigation Functions ======================================//



  signupWithEmailPassword = () => {
    try {
      const self = this;
      if (this.state.emailValidate && this.state.charLengthValidate && this.state.charLetterValidate && this.state.charNumberValidate && this.state.charSpecValidate) {
        RNProgressHud.showWithStatus("Loading...");
        auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((credential) => {
          RNProgressHud.dismiss()
          if (credential.user) {
            const user_id = credential.user.uid;
            var update = {};
            update[`users/${user_id}/user_id`] = user_id;
            update[`users/${user_id}/user_id`] = user_id;
            update[`users/${user_id}/role`] = 3;
            update[`users/${user_id}/password`] = this.state.password;
            update[`users/${user_id}/email`] = this.state.email;
            database().ref().update(update);
            this.userId = user_id;
            self.setModalVisible(true);
          }
        }).catch(error => {
          console.log(error)
          alert(error.message)
          RNProgressHud.dismiss()
        })
      }
    } catch (error) {
      alert(JSON.stringify(error))
      RNProgressHud.dismiss()
    }
  }

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateSpecialChar = (password) => {
    const re = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return re.test(String(password).toLowerCase());
  }

  validateNumber = (password) => {
    return /\d/.test(password);
  }

  validateLetter = (password) => {
    return /[A-Za-z]/g.test(password)
  }

  onChangeEmail = (value) => {
    this.setState({email: value})
    this.setState({emailValidate: this.validateEmail(value)})
  }

  onChangePassword = (value) => {
    this.setState({password: value})
    this.setState({charLengthValidate: value.length >= 6})
    this.setState({charSpecValidate: this.validateSpecialChar(value)})
    this.setState({charNumberValidate: this.validateNumber(value)})
    this.setState({charLetterValidate: this.validateLetter(value)})
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

  togglePassword() {
    this.setState({showPassword: !this.state.showPassword});
  }
  render() {
    const {modalVisible} = this.state;
    return (
      <KeyboardAvoidingView style={styles.mainContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* //================================ StatusBar ======================================// */}
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={colors.app_background}
          translucent={false}
        />
        {/* //================================ Header ======================================// */}
        <View style={styles.headerView}>
          <AppHeader
            leftIconPath={images.headerLeftBack}
            title={'Sign Up'}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
        </View>
        {/* //================================ Logo ======================================// */}
        <View style={styles.upperView}>
          <Image style={styles.imageStyles} source={images.logo}></Image>
        </View>
        <View style={styles.midView}>
          {/* //================================ Email Input ======================================// */}
          <AppInput
            height={Platform.OS === 'ios' ? hp(6) : hp(8)}
            placeholder={'Email'}
            colortextInput={colors.white}
            paddingLeft={wp(5)}
            marginBottom={wp(3)}
            marginTop={5}
            borderRadius={wp(1)}
            backgroundColor={colors.app_header_color}
            placeholderTextColor={colors.grey1}
            value = {this.state.email}
            onChangeText = {(text) => {this.onChangeEmail(text)}}
          />
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxIcon}>
              <Image
                style={styles.checkBoxIconStyle}
                source={this.state.emailValidate ? images.ic_check_green : images.ic_check}
              />
            </View>
            <View style={styles.checkBoxText}>
              <Text style={styles.checkBoxTextStyle}>Valid email</Text>
            </View>
          </View>
          {/* //================================ Password Input ======================================// */}
          <AppInput
            height={Platform.OS === 'ios' ? hp(6) : hp(8)}
            borderRadius={wp(1)}
            placeholder={'Password'}
            marginTop={5}
            secureEntry={this.state.showPassword}
            onRightIconPress={() => this.togglePassword()}
            colortextInput={colors.white}
            paddingLeft={wp(5)}
            marginBottom={wp(3)}
            rightIconSize={wp(5)}
            backgroundColor={colors.app_header_color}
            placeholderTextColor={colors.grey1}
            rightIconPath={images.ic_eye}
            tintColor={colors.app_light_blue}
            value = {this.state.password}
            onChangeText = {(text) => {this.onChangePassword(text)}}
          />
          {/* //================================ CheckBoxs ======================================// */}
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxIcon}>
              <Image
                style={[
                  styles.checkBoxIconStyle,
                  {tintColor: this.state.tintcolorLength},
                ]}
                source={this.state.charLengthValidate ? images.ic_check_green : images.ic_check}
              />
            </View>
            <View style={styles.checkBoxText}>
              <Text
                style={[
                  styles.checkBoxTextStyle
                ]}>
                At least 6 characters long
              </Text>
            </View>
          </View>
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxIcon}>
              <Image
                style={[
                  styles.checkBoxIconStyle,
                  {tintColor: this.state.tintColorLetter},
                ]}
                source={this.state.charLetterValidate ? images.ic_check_green : images.ic_check}
              />
            </View>
            <View style={styles.checkBoxText}>
              <Text
                style={[
                  styles.checkBoxTextStyle,
                ]}>
                Contains a letter
              </Text>
            </View>
          </View>
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxIcon}>
              <Image
                style={[
                  styles.checkBoxIconStyle,
                  {tintColor: this.state.tintColorNumber},
                ]}
                source={this.state.charNumberValidate ? images.ic_check_green : images.ic_check}
              />
            </View>
            <View style={styles.checkBoxText}>
              <Text
                style={[
                  styles.checkBoxTextStyle,
                ]}>
                Contains a number
              </Text>
            </View>
          </View>
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxIcon}>
              <Image
                style={[
                  styles.checkBoxIconStyle,
                  {tintColor: this.state.tintColorSpecial},
                ]}
                source={this.state.charSpecValidate ? images.ic_check_green : images.ic_check}
              />
            </View>
            <View style={styles.checkBoxText}>
              <Text
                style={[
                  styles.checkBoxTextStyle,
                ]}>
                Contains a special character
              </Text>
            </View>
          </View>
        </View>
        {/* //================================ Buttons ======================================// */}
        <View style={styles.buttonView}>
          <Button
            height={hp(8)}
            width={'80%'}
            style={styles.buttonStyles}
            title={'Sign Up'}
            titleColor={colors.app_header_color}
            titleStyle={[styles.titleStyles]}
            onPress={() => {this.signupWithEmailPassword()}}
          />
        </View>
        <View style={styles.lowerView}>
          <TouchableOpacity
            onPress={() => {
              if (this.props && this.props.navigation) {
                this.props.navigation.navigate('LoginScreen')
              }
            }}>
            <Text style={styles.textStyle}>Already have an account?</Text>
          </TouchableOpacity>
        </View>
        {/* //================================ model ======================================// */}
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
      </KeyboardAvoidingView>
    );
  }
}
export default SignUpScreen;
