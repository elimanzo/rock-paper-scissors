import React from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'
import { useState } from 'react'

const MOVES = {
  Rock: {
    beats: new Set(['Scissors', 'Lizard'])
  },
  Paper: {
    beats: new Set(['Rock', 'Spock'])
  },
  Scissors: {
    beats: new Set(['Paper', 'Lizard'])
  },
  Lizard: {
    beats: new Set(['Paper', 'Spock'])
  },
  Spock: {
    beats: new Set(['Scissors', 'Rock'])
  }
}

const getRandomArrayElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function App() {
  const [player, setPlayer] = useState(null)
  const [bot, setBot] = useState(null)
  const [stateResult, setStateResult] = useState(null)
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
    if (MOVES[playerMove].beats.has(botMove)) {
      setScore((prev) => ({ ...prev, wins: prev.wins + 1 }))
      setStateResult('Player Wins!')
      return
    }
    if (MOVES[botMove].beats.has(playerMove)) {
      setScore((prev) => ({ ...prev, losses: prev.losses + 1 }))
      setStateResult('Bot Wins')
      return
    }
    setScore((prev) => ({ ...prev, draws: prev.draws + 1 }))
    setStateResult("It's a Tie!")
  }

  return (
    <View style={styles.container}>
      <View style={styles.scoreText}>
        <Text>
          Wins: {score.wins} Losses: {score.losses} Draws: {score.draws}
        </Text>
      </View>
      {player == null ? (
        <View style={styles.buttonContainer}>
          <Text>Rock / Paper / Scissors / Lizard / Spock</Text>
          <View style={styles.buttonRow}>
            <View style={styles.button}>
              <Button title="Rock" onPress={() => makeMoves('Rock')} />
            </View>
            <View style={styles.button}>
              <Button title="Paper" onPress={() => makeMoves('Paper')} />
            </View>
            <View style={styles.button}>
              <Button title="Scissors" onPress={() => makeMoves('Scissors')} />
            </View>
            <View style={styles.button}>
              <Button title="Lizard" onPress={() => makeMoves('Lizard')} />
            </View>
            <View style={styles.button}>
              <Button title="Spock" onPress={() => makeMoves('Spock')} />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Text style={styles.resultText}>
            You picked {player}. Bot picked {bot}
          </Text>
          <Text>{stateResult}</Text>
          <View style={styles.button}>
            <Button
              title="Reset"
              onPress={() => {
                setPlayer(null)
                setBot(null)
                setStateResult(null)
              }}
            />
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreText: {
    marginBottom: 20
  },
  buttonContainer: {
    alignItems: 'center'
  },
  buttonRow: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    marginTop: 10
  },
  button: {
    marginTop: 10
  },
  resultText: {
    marginTop: 10
  }
})
