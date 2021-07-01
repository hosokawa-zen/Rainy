import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../Assets/Colors/colors";


const styles = StyleSheet.create({

    mainContainer:
        {
            flex: 1,
            // justifyContent: 'center',
            alignItems: 'center',
            paddingTop:hp(20),
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
            // backgroundColor:colors.black
        },

    container:
        {
            height: hp(20),
            width: wp(88),
            padding:'4%',
            backgroundColor: colors.white,
            borderRadius: wp(1.5),
            shadowOpacity: 0.3,
            shadowRadius: 2,
            shadowOffset: {
                height: 4,
                // width: 1
            },
            elevation: 8
        },
    topTitle:
        {
            height: '22%',
            width: '100%',
            // alignItems:'center',
            // justifyContent:'center',
            // backgroundColor:colors.dark_orange,
        },

    textRateApp:
        {
            fontSize: wp(4),
            color: colors.black,
            fontWeight: 'bold',
        },
    textDescription:
        {
            fontSize: wp(4.5),
            color: colors.black,
            // textAlign:'center',
            // fontWeight:'bold'
        },
    textContainer:
        {
            fontSize: wp(4.2),
            color: colors.black,
            // textAlign:'center'
        },

    bottomButtons:
        {
            height: '78%',
            width: '100%',
            // backgroundColor:colors.grey,
            justifyContent: 'space-around',

        },
    rateNowContainer:
        {
            // flex:1,
            // width: '50%',
            // justifyContent: 'center',
            // alignItems: 'center',
        },
    laterContainer:
        {
            // flex:1,
            // width: '20%',
            // justifyContent: 'center',
            // alignItems: 'center',
        },
    submitBurron:
        {
            fontSize: wp(3.8),
            color: colors.black,
            fontWeight: '500',
        },


});
export default styles;
