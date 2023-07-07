import React, { useState } from 'react';
import './App.css';
import Display from './components/Display';
import Keypad from './components/Keypad';

function App() {
  const [result, setResult] = useState('');
  const [operatorsClicked, setOperatorsClicked] = useState([]);

  const handleClick = (button) => {
    if (button === '=') {
      calculate();
    } else if (button === 'C') {
      reset();
    } else {
      if (
        (button === '.' || button === '+' || button === '-' || button === '*' || button === '/') &&
        (operatorsClicked.includes(button) || result === '')
      ) {
        return; // No permitir hacer clic nuevamente en los operadores o si no hay número de por medio
      }

      if (
        operatorsClicked.length > 0 &&
        (button !== '.' && button !== '+' && button !== '-' && button !== '*' && button !== '/')
      ) {
        setOperatorsClicked([]); // Reiniciar la lista de operadores clicados si se pulsa otro botón diferente
      }

      if (button === '.' || button === '+' || button === '-' || button === '*' || button === '/') {
        setOperatorsClicked([...operatorsClicked, button]); // Agregar operador a la lista de operadores clicados
      }

      setResult(result + button);
    }
  };

  const calculate = () => {
    try {
      setResult(eval(result) || '');
    } catch (error) {
      setResult('Error');
    }
  };

  const reset = () => {
    setResult('');
    setOperatorsClicked([]); // Restablecer la lista de operadores clicados
  };

  return (
    <div className="app">
      <div className="calculator-container">
        <Display result={result} />
        <Keypad handleClick={handleClick} />
      </div>
    </div>
  );
}

export default App;
