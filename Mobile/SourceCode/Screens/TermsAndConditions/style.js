
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import {Platform, StyleSheet} from 'react-native';

//================================ Local Imported Files ======================================//

import colors from "../../Assets/Colors/colors";

const Styles = StyleSheet.create({

    mainContainer:
        {
            flex: 1,
            backgroundColor: colors.app_dark_white
        },

    headerView:
        {
            flex: 0.1,
            backgroundColor: colors.appDarkBlue
        },
    container:
        {
            flex:Platform.OS === 'ios' ? 0.7 : 0.7,
            alignItems: 'center',
            padding: wp(5),
            borderTopColor: colors.white,
            borderTopWidth: wp(0.7),
            backgroundColor:colors.white,
            marginTop:wp(4),
            marginHorizontal:wp(4),
        },
    textContainer:
        {
            fontSize: wp(4.3),
            color: colors.black,
        },
    buttonView:{
        flex:Platform.OS === 'ios' ? 0.15 : 0.15,
        alignItems: 'center',
        justifyContent:'center'
    }
});
export default Styles;
