//================================ React Native Imported Files ======================================//

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../../../Assets/Colors/colors';

const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.app_background,
  },

  headerView: {
    flex: 0.09,
  },
  upperView: {
    flex: 0.4,

    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText:{
    fontSize: wp(4),
    color: colors.black,
    fontWeight:'bold'
  },
  textStyle1: {
    fontSize: wp(4.5),
    color: colors.appYellow,
    textAlign: 'center',
    marginBottom: wp(8),
  },
  midView: {
    flex: 0.37,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: wp(2),
    paddingHorizontal: wp(5),
  },
  lowerView: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyles: {
    height: '60%',
    width: '60%',
    resizeMode: 'contain',
  },
  textStyle: {
    fontSize: wp(4),
    color: colors.app_button_color,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  buttonStyles: {
    borderRadius: wp(1),
    height: hp(8),
    width: '90%',
    paddingLeft: wp(5),
    marginBottom: wp(2),
  },
  titleStyles: {
    color: colors.black,
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  titleStylesEmail: {
    color: colors.white,
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  iconStyles: {
    height: wp(4),
    width: wp(4),
    marginLeft: wp(3),
  },
});
export default Styles;
