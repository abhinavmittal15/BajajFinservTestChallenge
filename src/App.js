import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedFields, setSelectedFields] = useState([]);

  useEffect(() => {
    document.title = 'ABCD123'; // Replace with your roll number
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const parsedInput = JSON.parse(input);
      const res = await axios.post('/api/bfhl', parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON or API error');
    }
  };

  const renderResponse = () => {
    if (!response) return null;
    return (
      <div>
        {selectedFields.includes('numbers') && (
          <p>Numbers: {JSON.stringify(response.numbers)}</p>
        )}
        {selectedFields.includes('alphabets') && (
          <p>Alphabets: {JSON.stringify(response.alphabets)}</p>
        )}
        {selectedFields.includes('highest_alphabet') && (
          <p>Highest Alphabet: {JSON.stringify(response.highest_alphabet)}</p>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON here'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <div>
          <select
            multiple
            value={selectedFields}
            onChange={(e) => setSelectedFields(Array.from(e.target.selectedOptions, option => option.value))}
          >
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;