import { useState, useEffect } from 'react';
import '/src/styles/App.scss'
import Machine from './components/Machine'

function App() {
  const [ usersCoins, setUsersCoins ] = useState<number>(23);

  useEffect(() => {
    const savedCoins: number = parseInt(localStorage.getItem("coins") ?? "0");
    if(localStorage.getItem("coins")) {
      setUsersCoins(savedCoins);
    }
  })

  function adjustUserCoins(adjustment: number) {
    setUsersCoins((currentCoins) => currentCoins + adjustment);
  }

  return (
    <div id="Main">
      <h1>Player: Adam</h1>
      <h2>Coins: {usersCoins}</h2>
      <Machine adjustUserCoins={adjustUserCoins} /> 
    </div>    
  )
}

export default App
