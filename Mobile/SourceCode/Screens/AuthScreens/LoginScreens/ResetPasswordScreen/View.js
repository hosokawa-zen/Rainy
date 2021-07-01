//================================ React Native Imported Files ======================================//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View, Text, Alert, Image, StatusBar} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../../Components/AppHeader/AppHeader';
import AppInput from '../../../../Components/AppInput/AppInput';
import Button from '../../../../Components/Button/Button';
import colors from '../../../../Assets/Colors/colors';
import images from '../../../../Assets/Images/images';
import styles from './Styles';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }
  ShowAlert = (title, message) => {
    Alert.alert(title, message, [{text: 'OKAY'}]);
  };

  resetPassword = () => {
    try {
      auth().sendPasswordResetEmail(this.state.email)
      Alert.alert(
        'Reset Password',
        'We have sent a password reset link to your email',
        [{text: 'OKAY'}],
      )
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  onChangeEmail = (value) => {
    this.setState({email: value})
  }

  render() {
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
              title={'Reset Password'}
            leftIconPath={images.headerLeftBack}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
        </View>

        {/* //================================ Logo ======================================// */}
        <View style={styles.upperView}>
          <Image style={styles.imageStyles} source={images.logo}></Image>

        </View>
        {/* //================================ Password Input ======================================// */}
        <View style={styles.midView}>
          <AppInput
            height={hp(6)}
            borderRadius={wp(1)}
            placeholder={'Email Address'}
            width={'80%'}
            marginTop={5}
            colortextInput={colors.white}
            paddingLeft={wp(5)}
            rightIconSize={wp(5)}
            marginBottom={wp(3)}
            backgroundColor={colors.app_header_color}
            placeholderTextColor={colors.white}
            tintColor={colors.grey1}
            value = {this.state.email}
            onChangeText = {(text) => {this.onChangeEmail(text)}}
          />
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>
              Input the email used to create your account. We will send you a
              link to reset your password.
            </Text>
          </View>
        </View>
        {/* //================================ Button ======================================// */}
        <View style={styles.lowerView}>
          <Button
            height={hp(8)}
            width={'80%'}
            style={styles.buttonStyles}
            title={'RESET PASSWORD'}
            bgColor={colors.app_button_color}
            titleColor={colors.dark_red}
            titleStyle={[styles.titleStyles]}
            onPress={() => this.resetPassword()}
          />
        </View>
      </View>
    );
  }
}

export default ResetPassword;
