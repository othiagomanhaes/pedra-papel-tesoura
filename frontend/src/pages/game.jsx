import { useEffect, useState } from 'react';
import getTheWinner from '../services/getTheWinner';
import Header from '../components/header';
import '../styles/game.css';

export default function Game() {
  const [rounds, setRounds] = useState(0);
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [resultRound, setResultRound] = useState('');
  const [resultFinal, setResultFinal] = useState([]);
  const [actualRound, setActualRound] = useState(0);
  const [tesouraChecked, setTesouraChecked] = useState(true);
  const [pedraChecked, setPedraChecked] = useState(true);
  const [papelChecked, setPapelChecked] = useState(true);
  const [cincoChecked, setCincoChecked] = useState(true);
  const [dezChecked, setDezChecked] = useState(true);
  const [quinzeChecked, setQuinzeChecked] = useState(true);
  const [disabledChoiceRounds, setDisabledChoiceRounds] = useState(true);
  const [disabledBtnConfirmar, setDisabledBtnConfirmar] = useState(true);
  const [disabledElementsChoice, setDisabledElementsChoice] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  
  const playAgain = () => {
    setTotalPoints(0);
    setResultFinal([]);
    setActualRound(0);
    setResultRound('')
    setCincoChecked(true);
    setDezChecked(true);
    setQuinzeChecked(true);
    setDisabledChoiceRounds(true)
  }

  const calculaPoints = () => {
    let points = 0;
    resultFinal.forEach((ele) => {
      if (ele === 'vitória') {
        points += 3;
      }
      if (ele === 'empate') {
        points += 1;
      }
    });

    if (resultFinal.length === rounds) {
      setTotalPoints(points);
    }
  }

  const finishingRound = () => {
    if (rounds > actualRound) {
      setActualRound(actualRound + 1);
    } else {
      setPlayerChoice('');
      setComputerChoice('');
    }   
  }

  const makeComputerChoice = () => {
    const jukenpo = ['pedra', 'papel', 'tesoura'];
    const pcChoice = jukenpo[Math.floor(Math.random() * jukenpo.length)];
    setComputerChoice(pcChoice);
    const answer = getTheWinner(playerChoice, pcChoice);
    setResultRound(answer);
    setResultFinal((prevState) => [...prevState, answer]);

    finishingRound();
    setTesouraChecked(true);
    setPedraChecked(true);
    setPapelChecked(true);
    setPlayerChoice('');
    setComputerChoice('');
  }

  const confirmRounds = () => {
    setDisabledChoiceRounds(false);
    setDisabledElementsChoice(true);
    setDisabledBtnConfirmar(true);
  }

  const gettinRoundsQuantity = ({ target }) => {
    const value = target.innerHTML;
    setRounds(Number(value));
    setActualRound(1);
    setDisabledBtnConfirmar(false)
    if (value === '5') {
      setCincoChecked(false);
      setDezChecked(true);
      setQuinzeChecked(true);
    }

    if (value === '10') {
      setCincoChecked(true);
      setDezChecked(false);
      setQuinzeChecked(true);
    }

    if (value === '15') {
      setCincoChecked(true);
      setDezChecked(true);
      setQuinzeChecked(false);
    }
  }

  const gettinPlayerChoice = ({ target }) => {
    const value = target.innerHTML;
    setPlayerChoice(value.toLowerCase());
    if (value === 'Tesoura') {
      setTesouraChecked(false);
      setPedraChecked(true);
      setPapelChecked(true)
    }

    if (value === 'Pedra') {
      setPedraChecked(false);
      setTesouraChecked(true);
      setPapelChecked(true)
    }

    if (value === 'Papel') {
      setPapelChecked(false);
      setPedraChecked(true);
      setTesouraChecked(true)
    }
  }

  useEffect(() => {
    calculaPoints();
  },[computerChoice, playerChoice, resultRound, actualRound, rounds, tesouraChecked, resultFinal])

  return (
    <>
      <Header />

      <h1>Eu sou o game</h1>

      <h2>Escolha quantas rodadas</h2>
      <div id="div-mae-rounds">
        <div id="rounds">
          <label
            htmlFor="check5"
            className="check-rounds"
            onClick={ disabledChoiceRounds ? gettinRoundsQuantity : null }
            id={ cincoChecked ? 'check-cinco' : 'check-cinco-checked'}
          >
            5
          </label>
          <input 
            type="checkbox"
            id="check5" 
            className="checkbox-rounds"
          />

          <label
            htmlFor="check10"
            className="check-rounds"
            onClick={ disabledChoiceRounds ? gettinRoundsQuantity : null }
            id={ dezChecked ? 'check-dez' : 'check-dez-checked'}
          >
            10
          </label>
          <input
            type="checkbox"
            id="check10"
            className="checkbox-rounds"
          />

          <label
            htmlFor="check15"
            className="check-rounds"
            onClick={ disabledChoiceRounds ? gettinRoundsQuantity : null }
            id={ quinzeChecked ? 'check-quinze' : 'check-quinze-checked'}
          >
            15
          </label>
          <input
            type="checkbox"
            id="check15"
            className="checkbox-rounds"
          />
        </div>

        <button
          id="btn-rounds"
          onClick={ confirmRounds }
          disabled={ disabledBtnConfirmar }
        >
          Confirmar
        </button>
      </div>

      <h3>{`Rodada ${actualRound} de ${rounds}`}</h3>
      <section id="section-game">

        <div id="results">
            {
              resultFinal.map((result, ind) => {
                return (
                  <p key={ind}>{result}</p>
                )
              })
            } <p>{totalPoints ? `Você fez ${totalPoints} pontos.` : ''}</p>
          </div>

        <div id="div-mae-choices">
          <div id="choices">
            <label
              htmlFor="check-pedra"
              className="check-choices"
              onClick={ disabledElementsChoice ? gettinPlayerChoice : null }
              id={ pedraChecked ? 'check-pedra' : 'check-pedra-checked'}
            >
              Pedra
            </label>
            <input
              type="checkbox"
              id="check-pedra"
              className="checkbox-choices"
            />

            <label
              htmlFor="check-papel"
              className="check-choices"
              onClick={ disabledElementsChoice ? gettinPlayerChoice : null }
              id={ papelChecked ? 'check-papel' : 'check-papel-checked'}
            >
              Papel
            </label>
            <input
              type="checkbox"
              id="check-papel"
              className="checkbox-choices"
            />

            <label
              htmlFor="check-tesoura"
              className="check-choices"
              onClick={ disabledElementsChoice ? gettinPlayerChoice : null }
              value="tesoura"
              id={ tesouraChecked ? 'check-tesoura' : 'check-tesoura-checked'}
            >
              Tesoura
            </label>
            <input 
              type="checkbox"
              className="checkbox-choices"
            />
          </div>

          <p>{`Resultado da rodada: ${resultRound}`}</p>

          <button
            type="button"
            onClick={ makeComputerChoice }
            disabled={ playerChoice.length === 0 }
          >
            Jogar
          </button>
        </div>
      </section>
      <div>
        { totalPoints ? <button
          type="button"
          onClick={ playAgain }
        >
          Jogar de Novo
        </button> : null}
      </div>
    </>
  )
}