
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from '../../../../Assets/Colors/colors';

const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        backgroundColor: colors.app_background
    },

    headerView:
    {
        flex: 0.09
    },
    textStyle1:
    {
        fontSize: wp(5),
        color: colors.appYellow,
        textAlign: 'center',
        marginBottom: wp(8)
    },
    upperView:
    {
        flex: 0.36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStyles: {
        color: colors.app_header_color,
        fontSize: wp(4),
        fontWeight: "bold"
    },
    midView:
    {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: wp(2),
    },

    lowerView:
    {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyles:
    {
        height: '60%',
        width: '60%',
        resizeMode: 'contain'
    },
    headingText:{
        fontSize: wp(4),
        color: colors.black,
        fontWeight:'bold'
    },
    textStyle:
    {
        fontSize: wp(4),
        color: colors.white,
        textAlign: 'center'
    },
    buttonStyles:
    {
        borderRadius: wp(1),
        height: hp(8),
        width: '85%',
        backgroundColor: colors.white,
        marginBottom: wp(4),
    },
    textContainer:
    {
        flex: 0.5,
        paddingHorizontal: wp(10),
        paddingTop: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
    }

});
export default Styles;
