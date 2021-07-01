
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
    upperView:
    {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingText:{
        fontSize: wp(4),
        color: colors.black,
        fontWeight:'bold'
    },
    textStyle1:
    {
        fontSize: wp(5),
        color: colors.appYellow,
        textAlign: 'center',
        marginBottom: wp(3)
    },
    midView:
    {
        flex: 0.42,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonView:
    {
        flex: 0.15,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: wp(2),
    },
    lowerView:
    {
        flex: 0.07,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    imageStyles:
    {
        height: '60%',
        width: '60%',
        resizeMode: 'contain'
    },
    textStyle:
    {
        fontSize: wp(4),
        color: colors.app_button_color,
        textAlign: 'center',
        textDecorationLine: "underline",
    },
    buttonStyles:
    {
        borderRadius: wp(1),
        width: '85%',
        marginBottom: wp(4),

    },
    titleStyles: {
        color: colors.app_background,
        fontSize: wp(4.5),
        fontWeight: "bold"
    },
    checkBoxContainer:
    {
        flex: 0.4,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: wp(4)

    },
    checkBoxIcon:
    {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    checkBoxText:
    {
        flex: 0.9,
        paddingHorizontal: wp(2),
        justifyContent: 'center',
    },
    checkBoxIconStyle:
    {
        height: wp(4),
        width: wp(4),
        resizeMode: 'contain',
    },
    checkBoxTextStyle:
    {
        fontSize: wp(3.5),
        color: colors.white,
    }

});
export default Styles;
