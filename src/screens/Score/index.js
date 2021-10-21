import React, {useState} from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../Redux/Actions/Auth';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import BGImage from '../../assets/images/f.jpg';
export default function Score() {
  const scores = useSelector((state) => state.Score.scores);
  const [loading, setLoading]= useState(false);
  const dispatch = useDispatch();
  const loginMethod = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(logout());
    }, 1500);
  };
  return (
    <ScreenWrapper backgroundImage={BGImage} statusBarColor={AppColors.primary} transclucent barStyle='light-content'>
      <View style={styles.mainViewContainer}>
        <View style={styles.questionBox}>
        <Text style={styles.yourScore}>Your Score</Text>
        <Text style={styles.score}>{scores}/50</Text>
        </View>
        <Button title="Start Again" isLoading={loading} onPress={loginMethod} />
      </View>
    </ScreenWrapper>
  );
}
