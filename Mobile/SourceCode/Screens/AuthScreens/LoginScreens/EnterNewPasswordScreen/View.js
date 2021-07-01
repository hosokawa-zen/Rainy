//================================ React Native Imported Files ======================================//
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View, Text, StatusBar, Image, ScrollView } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../../Components/AppHeader/AppHeader';
import AppInput from '../../../../Components/AppInput/AppInput';
import Button from '../../../../Components/Button/Button';
import images from '../../../../Assets/Images/images';
import colors from '../../../../Assets/Colors/colors';
import styles from './Styles';

class NewPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: true,
      showConfirmPassword: true,
    };
  }

  togglePassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  toggleConfirmPassword() {
    this.setState({ showConfirmPassword: !this.state.showConfirmPassword });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerView}>
          {/* //================================ StatusBar ======================================// */}
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor={colors.dark_red}
            translucent={false}
          />

          {/* //================================ Header ======================================// */}
          <AppHeader
            headerHeight="100%"
            title={'ENTER NEW PASSWORD'}
            titleFontSize={wp(5)}
            leftIconPath={images.headerLeftBack}
            iconWidth={wp(3)}
            lefticonSize={wp(5)}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
        </View>
        <ScrollView>
          {/* //================================ Logo ======================================// */}
          <View style={styles.upperView}>
            <Image style={styles.imageStyles} source={images.logo}></Image>
          </View>
          {/* //================================ Input Fields ======================================// */}
          <View style={styles.midView}>
            <AppInput
              height={hp(6)}
              placeholder={'John'}
              width={'80%'}
              colortextInput={colors.white}
              paddingLeft={wp(5)}
              placeholderTextColor={colors.black}
              marginBottom={wp(3)}
              marginTop={5}
              borderRadius={wp(7)}
              backgroundColor={colors.grey}
            />
            <AppInput
              height={hp(6)}
              placeholder={'Smith'}
              width={'80%'}
              colortextInput={colors.white}
              paddingLeft={wp(5)}
              placeholderTextColor={colors.black}
              marginBottom={wp(3)}
              marginTop={5}
              borderRadius={wp(7)}
              backgroundColor={colors.grey}
            />
            <AppInput
              height={hp(6)}
              placeholder={'sample@email.com'}
              width={'80%'}
              colortextInput={colors.white}
              paddingLeft={wp(5)}
              placeholderTextColor={colors.black}
              marginBottom={wp(3)}
              marginTop={5}
              borderRadius={wp(7)}
              backgroundColor={colors.grey}
            />
            <AppInput
              height={hp(6)}
              borderRadius={wp(7)}
              placeholder={'New Password'}
              width={'80%'}
              marginTop={5}
              secureEntry={this.state.showPassword}
              onRightIconPress={() => this.togglePassword()}
              colortextInput={colors.white}
              paddingLeft={wp(5)}
              placeholderTextColor={colors.black}
              rightIconSize={wp(5)}
              marginBottom={wp(3)}
              backgroundColor={colors.grey}
              tintColor={colors.grey1}
            />
            <AppInput
              height={hp(6)}
              borderRadius={wp(7)}
              placeholder={'Confirm New Password'}
              width={'80%'}
              marginTop={5}
              secureEntry={this.state.showPassword}
              onRightIconPress={() => this.togglePassword()}
              colortextInput={colors.white}
              paddingLeft={wp(5)}
              placeholderTextColor={colors.black}
              rightIconSize={wp(5)}
              marginBottom={wp(3)}
              backgroundColor={colors.grey}
              tintColor={colors.grey1}
            />

            <View style={styles.checkBoxContainer}>
              <View style={styles.checkBoxIcon}>
                <Image
                  style={styles.checkBoxIconStyle}
                  source={images.ic_check_green}
                />
              </View>
              <View style={styles.checkBoxText}>
                <Text style={styles.checkBoxTextStyle}>Password matched</Text>
              </View>
            </View>
          </View>

          {/* //================================ Button ======================================// */}
          <View style={styles.lowerView}>
            <Button
              height={hp(8)}
              width={'80%'}
              style={styles.buttonStyles}
              title={'SAVE CHANGES'}
              bgColor={colors.AppRedColor}
              titleColor={colors.dark_red}
              titleStyle={styles.titleStyles}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default NewPassword;
