import React, { useState } from 'react';
import './App.css';

function App() {
  // Kezdő adatok a pilota.txt alapján
  const [pilotak, setPilotak] = useState([
    { id: 1, nev: "Lewis Hamilton", nemzetseg: "brit" },
    { id: 2, nev: "Nick Heidfeld", nemzetseg: "német" },
    { id: 3, nev: "Nico Rosberg", nemzetseg: "német" }
  ]);

  const [ujNev, setUjNev] = useState('');
  const [ujNemzetseg, setUjNemzetseg] = useState('');

  const hozzaadas = () => {
    if (ujNev && ujNemzetseg) {
      setPilotak([...pilotak, { id: Date.now(), nev: ujNev, nemzetseg: ujNemzetseg }]);
      setUjNev('');
      setUjNemzetseg('');
    }
  };

  const torles = (id) => {
    setPilotak(pilotak.filter(p => p.id !== id));
  };

  const szerkesztes = (id) => {
    const ujNevInput = prompt("Új név:");
    if (ujNevInput) {
      setPilotak(pilotak.map(p => p.id === id ? { ...p, nev: ujNevInput } : p));
    }
  };

  return (
    <div className="App">
      <header className="f1-header">
        <h1>Web programozás-1 Előadás Házi feladat</h1>
        <h2>React CRUD - Pilóta nyilvántartás</h2>
      </header>
      
      <div className="container">
        <div className="form-box">
          <input value={ujNev} onChange={(e) => setUjNev(e.target.value)} placeholder="Név" />
          <input value={ujNemzetseg} onChange={(e) => setUjNemzetseg(e.target.value)} placeholder="Nemzetiség" />
          <button onClick={hozzaadas} className="add-btn">Hozzáadás</button>
        </div>

        <table>
          <thead>
            <tr><th>Név</th><th>Nemzetiség</th><th>Műveletek</th></tr>
          </thead>
          <tbody>
            {pilotak.map(p => (
              <tr key={p.id}>
                <td>{p.nev}</td>
                <td>{p.nemzetseg}</td>
                <td>
                  <button onClick={() => szerkesztes(p.id)} className="edit-btn">Szerkeszt</button>
                  <button onClick={() => torles(p.id)} className="del-btn">Töröl</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;