import { useState, useEffect } from 'react';
import '/src/styles/App.scss'
import Machine from './components/Machine'

function App() {
  const [ usersCoins, setUsersCoins ]         = useState<number>(23);
  const [ currentPayout, setCurrentPayout ]   = useState<number>(0);

  useEffect(() => {
    const savedCoins: number = parseInt(localStorage.getItem("coins") ?? "0");
    if(localStorage.getItem("coins")) {
      setUsersCoins(savedCoins);
    }
  }, []);

  useEffect(() => {
    if(currentPayout > 0) {
      setTimeout(() => {
        setCurrentPayout((curr) => curr - 1);
        adjustUserCoins(1);
      }, 500);
    }
  }, [currentPayout]);

  function adjustUserCoins(adjustment: number) {
    localStorage.setItem("coins", `${usersCoins + adjustment}`);
    setUsersCoins((currentCoins) => currentCoins + adjustment);
  }

  return (
    <div id="Main">
      {/* <h1>Player: Adam</h1> */}
      <div id="Status">
        <div id="PayoutDisplay">
          <div className="payout-title">Payout</div>
          <div className="payout-number">{currentPayout}</div>
        </div>
        <div id="CoinsDisplay">
          <div className="coins-title"><span>Coins</span></div>
          <div className="coins-number"><span>{ usersCoins }</span></div>
        </div>
      </div>
      <Machine 
        usersCoins={usersCoins} 
        adjustUserCoins={adjustUserCoins}
        setCurrentPayout={setCurrentPayout} /> 
    </div>    
  )
}

export default App
