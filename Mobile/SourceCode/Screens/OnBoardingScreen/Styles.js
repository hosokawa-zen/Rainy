//================================ React Native Imported Files ======================================//

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';

const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.app_background,
  },
  upperView: {
    flex: 0.8,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageView: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  midView: {
    flex: 0.35,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: wp(10),
  },
  lowerView: {
    flex: 0.2,
    marginTop: wp(5),
    alignItems: 'center',
  },
  imageStyles: {
    height: wp(50),
    width: wp(50),
    resizeMode: 'contain',
  },
  textStyle: {
    fontSize: wp(5),
    color: colors.white,
    textAlign: 'center',
  },
  textStyleWelcome: {
    fontSize: wp(5),
    marginBottom: wp(2),
    color: colors.white,
    textAlign: 'center',
  },
  textStyleNetwork: {
    fontSize: wp(5),
    marginBottom: wp(2),
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonStyles: {
    borderRadius: wp(1),
    height: hp(8),
    width: '80%',
  },
  titleStyles: {
    color: colors.app_background,
    fontSize:16,
    fontWeight: 'bold'
  },
  slides: {
    flex: 1,
  },
});

export default Styles;
