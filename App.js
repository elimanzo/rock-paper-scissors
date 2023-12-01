import { Button, Text, View } from 'react-native';

import { useState } from 'react';

const MOVES = ['Rock', 'Paper', 'Scissors'];
function getRandomArrayElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function App() {
  const [player, setPlayer] = useState(null);
  const [bot, setBot] = useState(null);
  const [winLossDraws, setwinLossDraws] = useState({ wins: 0, losses: 0, draws: 0});
  const makeMoves = (move) => {
    setBot(getRandomArrayElement(MOVES));
    setPlayer(move);
  };

  const winner = () => {
    
  }
  return (
    <View style={{padding: 100}}>
      {player == null ? (
        <View>
          <Text>Rock / Paper / Scissors</Text>
          <Button title="Rock" onPress={() => makeMoves("Rock")} />
          <Button title="Paper" onPress={() => makeMoves("Paper")} />
          <Button title="Scissors" onPress={() => makeMoves("Scissors")} />
        </View>
      ) : (
        <View>
          <Text>You picked {player}. Bot picked {bot}</Text>
          <Button title="Reset" onPress={() => setPlayer(null)} />
        </View>
      )}
    </View>
    
  );
}