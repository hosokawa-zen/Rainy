//================================ React Native Imported Files ======================================//
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StyleSheet } from "react-native";
//================================ Local Imported Files ======================================//
import colors from "../../Assets/Colors/colors";
const Styles = StyleSheet.create({
    mainCotainer:
        {
            flex: 1,
        },
    headerCotainer: {
        flex: 0.1,
    },
    editProfileCotainer: {
        flex: 0.9,
    },
    profilePicCotainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: "center",
    },
    ProfileCotainer: {
        flex: 0.45,
        paddingHorizontal: wp(4)
    },
    buttonCotainer: {
        flex: 0.3,
        paddingHorizontal: wp(4),
        justifyContent: 'center',
        alignItems: "center",
    },
    selectButton: {
        position: 'absolute',
        top: hp(14.0),
        left: wp(58.5)
    },
    buttonStyles:
        {
            borderRadius: wp(7),
            height: hp(5),
            width: '100%'
        },
    commanCotainer: {
        height: hp(8),
        width: '90%',
        backgroundColor: '#e3e3e3',
        flexDirection: 'row',
        marginTop: wp(2),
        alignSelf:'center',
        borderRadius: wp(2)
    },
    inputTextCotainer: {
        height: '100%',
        width: '85%',
        justifyContent: "center",
    },
    worldImageCotainer: {
        height: '100%',
        width: '7%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#e3e3e3',

    },
    downImageCotainer: {
        height: '100%',
        width: '8%',
        justifyContent: "center",
        backgroundColor: '#e3e3e3',

    },
    ImageStyles: {
        height: wp(30),
        width: wp(30),
        resizeMode: 'cover',
        borderRadius: wp(15),
        overflow: 'hidden'
    },
    worldImageStyles: {
        height: hp(3.5),
        width: wp(3.5),
        resizeMode: 'contain'
    },
    downImageStyles: {
        height: hp(3.5),
        width: wp(3.5),
        resizeMode: 'contain',
        tintColor: colors.black
    },
    lcokImageStyles: {
        height: hp(3),
        width: wp(3),
        resizeMode: 'contain'
    },
});
export default Styles;
