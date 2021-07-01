import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import colors from "../../Assets/Colors/colors";


const styles = StyleSheet.create({

    mainContainer:
        {
            flex:1,
            // backgroundColor:colors.app_background
        },

    headerView:
        {
            flex:0.1,

        },
    container:
        {
            flex:0.91,
        },
        textButton:{
            flexDirection:'row',
            alignItems:'center',
            alignSelf:'center',
            marginTop:hp(1.5),
            paddingLeft:'3%',
            height:hp(3.5),
            width:'80%',
            backgroundColor:colors.dark_red,
            borderRadius:5,
        },
      icon:{
          height:15,
          width:15,
          resizeMode:'contain',
          tintColor:colors.white,
      },
    text:{
        paddingLeft:'2%',
        fontSize:13,
        color:colors.white
    }

});
export default styles;
