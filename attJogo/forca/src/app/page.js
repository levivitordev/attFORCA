'use client';

import React, { useState, useEffect } from 'react';
import HangmanSVG from '../components/HangmanSVG';
import { pickRandomWord } from '../lib/works';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const MAX_ERRORS = 6;

export default function Page() {
  const [word, setWord] = useState('');
  const [guessed, setGuessed] = useState(new Set());
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setWord(pickRandomWord());
  }, []);

  const wrongCount = [...guessed].filter(l => !word.includes(l)).length;
  const display = word.split('').map(ch => guessed.has(ch) ? ch : '_').join(' ');
  const isWon = word && !display.includes('_');
  const isLost = wrongCount >= MAX_ERRORS;
  const isGameOver = isWon || isLost;

  function pickNew() {
    setWord(pickRandomWord());
    setGuessed(new Set());
    setHistory([]);
  }

  function tryLetter(letter) {
    letter = letter.toUpperCase();
    if (!/^[A-Z]$/.test(letter) || guessed.has(letter)) return;

    setGuessed(prev => new Set(prev).add(letter));
    setHistory(h => [...h, letter]);
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (isGameOver || e.repeat) return;
      if (e.key.match(/^[a-zA-Z]$/)) {
        tryLetter(e.key);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [guessed, isGameOver]);

  if (!word) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">ENTRANDO NO JOGO...</div>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 sm:p-6 text-center">
      <div className="w-full max-w-3xl flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-wider uppercase">Jogo da Forca</h1>

        <div className="w-full flex flex-col md:flex-row items-center justify-around gap-4 my-4">
          <div className="w-48 h-48 sm:w-64 sm:h-64">
            <HangmanSVG stage={wrongCount} />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-mono tracking-widest my-4 break-all">{display}</div>
            <p className="text-sm text-gray-400">Tentativas restantes: {MAX_ERRORS - wrongCount}</p>
          </div>
        </div>

        {isGameOver && (
          <div className="my-4 p-4 rounded-lg bg-gray-800 shadow-lg">
            <p className={`font-semibold text-xl ${isWon ? 'text-green-400' : 'text-red-400'}`}>
              {isWon ? '🏆 Uhuul, você venceu!' : '❌ Ja era, voce perdeu!'}
            </p>
            <p className="mt-2">A palavra era: <span className="font-bold tracking-widest">{word}</span></p>
          </div>
        )}

        <div className="w-full max-w-xl grid grid-cols-6 sm:grid-cols-7 md:grid-cols-9 gap-2 mt-4">
          {ALPHABET.map(letter => {
            const isDisabled = guessed.has(letter) || isGameOver;
            const wasGuessed = guessed.has(letter);
            const isCorrect = word.includes(letter);
            
            let buttonClass = 'bg-gray-700 hover:bg-gray-600';
            if (isDisabled && wasGuessed) {
              buttonClass = isCorrect ? 'bg-green-600' : 'bg-red-700 opacity-60';
            } else if (isDisabled) {
              buttonClass = 'bg-gray-800 opacity-40';
            }

            return (
              <button
                key={letter}
                onClick={() => tryLetter(letter)}
                disabled={isDisabled}
                className={`py-2 sm:py-3 rounded-md border border-gray-600 text-lg sm:text-xl font-bold transition-transform duration-150 ${isDisabled ? '' : 'hover:scale-110'} ${buttonClass}`}
              >
                {letter}
              </button>
            );
          })}
        </div>

        <button onClick={pickNew} className="mt-8 px-6 py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-500 transition-colors">
          Reiniciar Jogo
        </button>

        <div className="mt-6 p-2 w-full max-w-xl text-left">
          <h3 className="text-sm font-bold text-gray-400">Histórico:</h3>
          <div className="mt-2 flex flex-wrap gap-2 min-h-[30px]">
            {history.length === 0 && <span className="text-sm text-gray-500">Nenhuma letra tentada</span>}
            {history.map((l, i) => (
              <span key={i} className={`px-2 py-1 rounded-md text-sm font-bold ${word.includes(l) ? 'bg-green-800 text-green-200' : 'bg-red-800 text-red-200'}`}>
                {l}
              </span>
            ))}
          </div>
        </div>
        
      </div>
    </main>
  );
}