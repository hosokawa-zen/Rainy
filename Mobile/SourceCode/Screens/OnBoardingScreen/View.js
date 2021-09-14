
//================================ React Native Imported Files ======================================//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import Button from '../../Components/Button/Button';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import Swiper from 'react-native-swiper';
import styles from './Styles';

class OnBoarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  scrollItem() {
    if (this.props && this.props.navigation) {
      this.props.navigation.navigate('SignupWith');
    }
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={colors.app_background}
          translucent={false}
        />
        <View style={styles.upperView}>
            <View style={styles.slides}>
              <View style={styles.imageView}>
                <Image
                  style={styles.imageStyles}
                  source={images.logo}
                />
              </View>
              <View style={styles.midView}>
                {/*<Text style={styles.textStyleWelcome}>Welcome to</Text>*/}

                <Text style={styles.textStyleNetwork}>
                  Welcome
                </Text>
              </View>
            </View>
        </View>

        <View style={styles.lowerView}>
          <Button
            height={hp(8)}
            width={'80%'}
            style={styles.buttonStyles}
            title={'CONTINUE'}
            bgColor={colors.app_button_color}
            titleColor={colors.dark_red}
            titleStyle={[styles.titleStyles]}
            onPress={() => this.scrollItem()}
          />
        </View>
      </View>
    );
  }
}

export default OnBoarding;
