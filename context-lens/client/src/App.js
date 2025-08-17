import React, { useState, useEffect } from 'react';

function App() {
  const [text, setText] = useState('');
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/interactions')
      .then(res => res.json())
      .then(setInteractions);
  }, []);

  const addInteraction = () => {
    fetch('http://localhost:4000/interactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
    .then(res => res.json())
    .then(data => {
      setInteractions([...interactions, { text: data.text, classification: data.classification }]);
      setText('');
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Context Lens</h1>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Type something..." />
      <button onClick={addInteraction}>Add</button>
      <ul>
        {interactions.map((item, idx) => (
          <li key={idx}>{item.text} — <b>{item.classification}</b></li>
        ))}
      </ul>
    </div>
  );
}

export default App;
