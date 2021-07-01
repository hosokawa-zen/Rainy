
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
      newIndex: 1,
      currentIndex: 0,
    };
  }
  onIndexChanged(index) {
    this.setState({ currentIndex: index });
  }
  scrollItem() {
    if (this.state.currentIndex === 2) {
      if (this.props && this.props.navigation) {
        this.props.navigation.navigate('SignupWith');
      }
     
    } else {
      this.refs.swiper.scrollBy(1);
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
          <Swiper
            showsButtons={false}
            loop={false}
            ref={'swiper'}
            onIndexChanged={this.onIndexChanged.bind(this)}
            activeDotColor={colors.white}
            dotColor={colors.white}
            activeDot={
              <View
                style={{
                  backgroundColor: colors.app_button_color,
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3,
                }}
              />
            }>
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
          </Swiper>
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
          {
            <TouchableOpacity
              style={{
                width: wp('70%'),
                marginTop: wp(3),
                height: hp('7%'),
                alignItems: 'center',
              }}
              onPress={() => {
                if (this.props && this.props.navigation) {
                  this.props.navigation.navigate('SignupWith')
                }
              } }>
              <Text
                style={{
                  color: colors.white,
                  fontSize: wp(4),
                  textDecorationLine: 'underline',
                  fontWeight:'600'
                }}>
                Skip
              </Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}

export default OnBoarding;
