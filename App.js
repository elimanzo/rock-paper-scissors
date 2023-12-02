import { Button, Text, View } from 'react-native'

import { useState } from 'react'

// const options = ['Rock', 'Paper', 'Scissors']
const MOVES = {
  Rock: { weak: 'Paper', strong: 'Scissors' },
  Paper: { weak: 'Scissors', strong: 'Rock' },
  Scissors: { weak: 'Rock', strong: 'Paper' }
}

function getRandomArrayElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function App() {
  const [player, setPlayer] = useState(null)
  const [bot, setBot] = useState(null)
  const [score, setScore] = useState({
    wins: 0,
    losses: 0,
    draws: 0
  })
  const makeMoves = (move) => {
    const botMove = getRandomArrayElement(Object.keys(MOVES))
    setBot(botMove)
    setPlayer(move)
    whoWon(move, botMove)
  }

  const whoWon = (playerMove, botMove) => {
    // if (playerMove === botMove) {
    //   setScore((prev) => ({ ...prev, draws: prev.draws + 1 }))
    //   return
    // }
    // if (
    //   (options.indexOf(playerMove) + 1) % options.length ===
    //   options.indexOf(botMove)
    // ) {
    //   setScore((prev) => ({ ...prev, losses: prev.losses + 1 }))
    // } else {
    //   setScore((prev) => ({ ...prev, wins: prev.wins + 1 }))
    // }

    if (MOVES[playerMove].strong === MOVES[botMove].weak) {
      setScore((prev) => ({ ...prev, wins: prev.wins + 1 }))
      return
    }
    if (MOVES[playerMove].weak === MOVES[botMove].strong) {
      setScore((prev) => ({ ...prev, losses: prev.losses + 1 }))
      return
    }
    setScore((prev) => ({ ...prev, draws: prev.draws + 1 }))
  }

  return (
    <View style={{ padding: 100 }}>
      <View>
        <Text>
          Wins: {score.wins} Losses: {score.losses} Draws: {score.draws}
        </Text>
      </View>
      {player == null ? (
        <View>
          <Text>Rock / Paper / Scissors</Text>
          <Button title="Rock" onPress={() => makeMoves('Rock')} />
          <Button title="Paper" onPress={() => makeMoves('Paper')} />
          <Button title="Scissors" onPress={() => makeMoves('Scissors')} />
        </View>
      ) : (
        <View>
          <Text>
            You picked {player}. Bot picked {bot}
          </Text>
          <Button
            title="Reset"
            onPress={() => {
              setPlayer(null)
              setBot(null)
            }}
          />
        </View>
      )}
    </View>
  )
}
