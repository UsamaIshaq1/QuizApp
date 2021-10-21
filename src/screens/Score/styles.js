import {StyleSheet} from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  yourScore:{
    textAlign:'center',
    fontSize:width(15),
    color:AppColors.white
  },
  score:{
    fontSize:width(25),
    textAlign:'center',
    color:AppColors.white
  },
  questionBox:{
    backgroundColor:AppColors.primary,
    justifyContent:'center',
    borderColor:AppColors.white,
    borderTopRightRadius:width(5),
    borderBottomLeftRadius:width(5),
    width:width(85),
    height:height(30),
    margin:width(2.5),
    padding:width(.6)
  }
});
export default styles;
