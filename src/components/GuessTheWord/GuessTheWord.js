import React, { useState, useEffect } from 'react';
import './GuessTheWord.css'

const obscureWord = (word) => {
  const obscuredArray = word.split('').map((char, index) => 
    index % 2 === 0 ? '*' : char
  );
  return obscuredArray.join('');
};

const GuessTheWord = ({ words }) => {
  const [originalWord, setOriginalWord] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isGameWon, setIsGameWon] = useState(false);

  useEffect(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setOriginalWord(randomWord);
    setCurrentWord(obscureWord(randomWord));
  }, [words]);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleCheck = () => {
  const input = userInput;

  const newCurrentWord = currentWord.split('').map((char, index) => {
    if (char === '*' && index < input.length && originalWord[index] === input[index]) {
      return originalWord[index];
    } else {
      return char;
    }
  }).join('');
    
  setCurrentWord(newCurrentWord);

  if (newCurrentWord === originalWord) {
    setIsGameWon(true);
  }
  setUserInput(''); 
  };

  return (
    <div>
      <h1>Угадай слово</h1>
      <p>Текущее слово: {currentWord}</p>
      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        maxLength="10"
        disabled={isGameWon}
      />
      <button onClick={handleCheck} disabled={isGameWon} class="guess-submit">Проверить</button>
      {isGameWon && <p>Поздравляем! Вы победили!</p>}
    </div>
  );
};

export default GuessTheWord;
