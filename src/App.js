import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

import Coin from './coin'



function App() {
  const [coins, setCoins] = useState([]);

  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get
    ('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=222&page=1&sparkline=false').then
    (res => {setCoins(res.data);

    }).catch(error => alert('there is an error'));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Crypto Currency Search</h1>
        <h5>Powered by Anthony Stenson</h5>
        <br></br>
        <form>
          <input type="text" placeholder='Search' className="coin-input" onChange={handleChange} />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin 
          key={coin.id} 
          name={coin.name} 
          image={coin.image}
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          volume={coin.total_volume}
          />
        );
      })}
    </div>
  );
}

export default App;
