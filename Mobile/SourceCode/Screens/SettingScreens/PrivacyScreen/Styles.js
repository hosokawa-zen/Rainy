
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import {Platform, StyleSheet} from 'react-native';

//================================ Local Imported Files ======================================//

import colors from "../../../Assets/Colors/colors";

const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        backgroundColor: colors.app_dark_white
    },

    pdf: {
        flex: 1,
        width: wp(100),
        height: hp(100)
    },

    headerView:
    {
        flex: 0.1,
        backgroundColor: colors.appDarkBlue
    },
    container:
    {
        flex:Platform.OS === 'ios' ? 1 : 1,
        alignItems: 'center',
        backgroundColor:colors.white,
    },
    textContainer:
    {
        fontSize: wp(4.3),
        color: colors.black,
    }

});
export default Styles;
