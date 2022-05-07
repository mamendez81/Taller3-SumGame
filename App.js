import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import Game from './components/Game';

export default function App() {
  return (
    <View style={styles.container}>
      
      <Game randomNumbersCount={6} initialSeconds={30}/>
      <StatusBar style="auto" />
      
    </View>
    
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal: 50,
  },
  visible: {
    backgroundColor: '#bbb',
    
  },
  buttoni: {
    backgroundColor: '#fff',
  }
});
