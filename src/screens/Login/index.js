import React, {useState} from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/Actions/Auth';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import BGImage from '../../assets/images/f.jpg'
export default function Dashboard(props) {
  const [loading, setLoading]= useState(false);
  const dispatch = useDispatch();
  const loginMethod = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(login({ userName: 'John Doe' }));

    }, 1500);
  };
  return (
    <ScreenWrapper statusBarColor={AppColors.primary} backgroundImage={BGImage} 
    backgroundColor={AppColors.white} transclucent 
    barStyle="light-content">

      <View style={styles.mainViewContainer}>
        <Button title="Start Quiz" isLoading={loading} onPress={loginMethod} />
      </View>
    </ScreenWrapper>
  );
}
