import './App.css';
import { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [info, setInfo] = useState('');

  const getInfo = async () => {
    try {
      setLoading(true);
      const cleanName=name.replace(/\s/g,"")
      const response = await fetch(`https://api.genderize.io/?name=${cleanName}`);
      const json = await response.json();
      setInfo(json);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    setName('');
    setInfo('');
  };

  return (
    <div className="App">
      <h1>Gender Finder</h1>
      <form className='form' onSubmit={submit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={getInfo} disabled={loading}>
          See your gender
        </button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="info">
            {info.name && <p>Name: {info.name}</p>}
            {info.gender && <p>Gender: {info.gender}</p>}
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
