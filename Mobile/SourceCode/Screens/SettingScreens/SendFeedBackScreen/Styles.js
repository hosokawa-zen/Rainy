
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../../Assets/Colors/colors";
import AppInput from "../../../Components/AppInput/AppInput";
import React from "react";

const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
    },
    headerView:
    {
        backgroundColor: colors.appDarkBlue,
        flex: 0.09
    },
    middleView: {
        flex: 0.7,
        // marginHorizontal: wp(3),
        backgroundColor:colors.white,
        marginTop:wp(4)
    },
    headingText:{
       fontSize: wp(4.1),
       fontWeight:'600',
       color:colors.app_header_color,
        paddingLeft:'5%',
        paddingTop:"1%",
        paddingBottom:'2.5%'
    },
    LastView: {
        flex: 0.21,
        marginHorizontal: wp(3),
    },
    uploadButtonView: {
        width: '100%',
        height: '50%',
        justifyContent: "flex-end",
        alignItems: "center",

    },
    saveButtonView: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4),

    },
    NameView: {
        marginTop: wp(2),
        height: hp(11),

    },
    EmailView: {
        marginTop: wp(2),
        height: hp(11),

    },
    SubjectView: {
        marginTop: wp(2),
        height: hp(11),

    },
    MessageView: {
        marginTop: wp(2),
        height: hp(18),

    },
    CharacterView: {
        height: hp(5),
        backgroundColor:colors.app_dark_white,
        alignItems: "flex-end",
        width:'90%',
        alignSelf:'center'

    },
    CharacterStyle: {
        color: colors.dark_grey,
        paddingRight:'4%',
    },
    buttonStyles:
    {
        borderRadius: wp(7),
        height: hp(8),
        width: '100%',
    },
});
export default Styles;
