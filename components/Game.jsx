import { StyleSheet, Text, View, Button } from "react-native";
import React, {useEffect, useState, useRef} from "react";
import Number from "./Number";

export default Game = ({randomNumbersCount, initialSeconds}) => {
    
    const [randomNumbers, setRandomNumbers]=useState([]);
    const [target, setTarget] = useState();
    const [selectedNumbers, setSelectedNumbers]=useState([]);
    const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
    const [gameStatus, setGameStatus] = useState('PLAYING');
    const [reinicio, setReinicio] = useState([]);
    const [activarbutton, setActivarbutton] = useState(true);
    
    let intervalId = useRef();
    useEffect(()=>console.log(selectedNumbers), [selectedNumbers]);

    //const target = 10 + Math.floor(40 * Math.random());
    //const numbers = Array.from({length: randomNumbers}).map(()=>1+Math.floor(10*Math.random()));
    //const target = numbers.slice(0, randomNumbers -2).reduce((acc, cur)=>acc+cur,0);
        
    // No array -> Exc all the time
    // Empty array -> Exc once the first time
    // Full array -> Exc on change
    // Return -> Exc on dismount
    function desordenar(array){
        array = array.sort(
            function() {
                return Math.random() - 0.5
            });
        return array;
      }
    
    useEffect(() => {
        const numbers = Array.from({length: randomNumbersCount}).map(()=>1+Math.floor(10*Math.random()));
        const target = numbers.slice(0, randomNumbersCount -2).reduce((acc, cur)=>acc+cur,0);
        setRandomNumbers(desordenar(numbers));
        setTarget(target);
        setRemainingSeconds(initialSeconds);
        intervalId.current = setInterval(() => setRemainingSeconds(seconds=>seconds-1), 1000);
        return () => clearInterval(intervalId.current);
        
    }, [reinicio]);
    
    


    useEffect(() => {
        setGameStatus(() => getGameStatus());
        if (remainingSeconds === 0 || gameStatus !== 'PLAYING') {
            setActivarbutton(false);
         } else {
            setActivarbutton(true);
         }
    }, [remainingSeconds, selectedNumbers, gameStatus]);
    
    const isNumberSelected=numberIndex=>selectedNumbers.some(number=>number===numberIndex);
    const selectNumber = number =>{
        setSelectedNumbers([...selectedNumbers, number])
    };

    const getGameStatus = () => {
        const sumSelected = selectedNumbers.reduce((acc, cur) => acc + randomNumbers[cur], 0);
        if (remainingSeconds === 0 || sumSelected > target) {
            clearInterval(intervalId.current);
            return 'LOST';
        } else if (sumSelected === target) {
            clearInterval(intervalId.current);
            return 'WON';
        } else {
            return 'PLAYING';
        }
    };
    
    
    // const status = gameStatus();
    return (
            
        <View>
            <Text style={styles.target}>{target}</Text>
            <Text style={[styles.target, styles[gameStatus]]}>{gameStatus}</Text>
            <Text style={[styles.target, styles[gameStatus]]}>{remainingSeconds}</Text>
          
            <View style={styles.randomContainer}>
                {randomNumbers.map((number, index)=>(
                        <Number key={index} 
                        id={index} 
                        number={number} 
                        isSelected={isNumberSelected(index) || gameStatus !== 'PLAYING'} 
                        onSelected={selectNumber}/>
                    ))
                }
                 
            </View>
            
            <View style={styles.button}>
                <Button  
                    title="Play Again"
                    disabled={activarbutton}
                    onPress={() => (
                        setSelectedNumbers([]),
                        setReinicio([])
                    )}
                />
            </View>
            
                
        </View>
    );
};

const styles = StyleSheet.create({
    target: {
        fontSize: 40,
        backgroundColor: '#aaa',
        textAlign: 'center',
    },
    randomContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    PLAYING: {
        backgroundColor: '#bbb'
    },
    LOST: {
        backgroundColor: 'red'
    },
    WON: {
        backgroundColor: 'green'
    },
    button: {
        backgroundColor: 'grey',
        fontSize: 40,
        textAlign: 'center',
        shadowOpacity: 1
    },
    remainingSeconds: {
        backgroundColor: 'grey',
        fontSize: 40,
        textAlign: 'center',
    },
});