import { useEffect, useState } from 'react';
import Image from 'next/image';
import getTheWinner from '../services/getTheWinner';
import Header from '../components/header';
import { createGame } from '../services/api';
import {roundIdObj,roundKey } from '../services/rounds';
import RankingGeral from '../components/rankingGeral';
import RankingGeralByDay from '../components/rankingGeralByDay';
import RankingGeralByWeek from '../components/rankingGeralByWeek';
import RankingGeralByMonth from '../components/rankingGeralByMonth';
import RPSImgDefault from '../imgs/pedrapapeltesoura.png';
import Chars from '../services/getChars';
import { revalidatePath } from 'next/cache'
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
  const [rankingsInvalidationKey, setRankingsInvalidationKey] = useState(0);
  const [imgChosen, setImgChosen] = useState(RPSImgDefault);
  const [imgChosenPC, setImgChosenPc] = useState(RPSImgDefault);
  
  const playAgain = () => {
    setRounds(0);
    setTotalPoints(0);
    setResultFinal([]);
    setActualRound(0);
    setResultRound('')
    setCincoChecked(true);
    setDezChecked(true);
    setQuinzeChecked(true);
    setDisabledChoiceRounds(true);
    setDisabledElementsChoice(false);
    setRankingsInvalidationKey(rankingsInvalidationKey + 1)
  }

  const getUserId = () => {
    const response = localStorage.getItem('user_id');
    const userId = JSON.parse(response);
    return Number(userId);
  }

  const sendTheResult = async () => {
    if ((resultFinal.length === rounds) && (rounds !== 0) && (totalPoints !== 0)) {
      let victory = 0;
      let draw = 0;
      let defeat = 0;
      const username_id = getUserId();
      const round_id = roundIdObj[rounds];

      resultFinal.forEach((ele) => {
        if (ele === "vitória") victory += 1
        if (ele === "empate") draw += 1
        if (ele === "derrota") defeat += 1
      })

      const gameObj = { username_id, round_id, victory, draw, defeat, matchs: 1, rounds, points: totalPoints }

      const response = await createGame(gameObj);
      console.log(response);
    }
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
      setDisabledElementsChoice(false);
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
    setImgChosen(RPSImgDefault);
  }

  const confirmRounds = () => {
    setDisabledChoiceRounds(false);
    setDisabledElementsChoice(true);
    setDisabledBtnConfirmar(true);
  }

  const gettinRoundsQuantity = ({ target }) => {
    const value = target.id.split('-')[1];
    setRounds(Number(roundKey[value]));
    setActualRound(1);
    setDisabledBtnConfirmar(false)
    if (value === 'cinco') {
      setCincoChecked(false);
      setDezChecked(true);
      setQuinzeChecked(true);
    }

    if (value === 'dez') {
      setCincoChecked(true);
      setDezChecked(false);
      setQuinzeChecked(true);
    }

    if (value === 'quinze') {
      setCincoChecked(true);
      setDezChecked(true);
      setQuinzeChecked(false);
    }
  }

  const gettinPlayerChoice = ({ target }) => {
    const value = target.alt.split(' ')[2];
    setPlayerChoice(value);
    if (value === 'tesoura') {
      setImgChosen(Chars.tesoura);
      setTesouraChecked(false);
      setPedraChecked(true);
      setPapelChecked(true)
    }

    if (value === 'pedra') {
      setImgChosen(Chars.pedra);
      setPedraChecked(false);
      setTesouraChecked(true);
      setPapelChecked(true)
    }

    if (value === 'papel') {
      setImgChosen(Chars.papel);
      setPapelChecked(false);
      setPedraChecked(true);
      setTesouraChecked(true)
    }
  }

  useEffect(() => {
    calculaPoints();
    sendTheResult();
  },[computerChoice, playerChoice, resultRound, actualRound, rounds, tesouraChecked, resultFinal, totalPoints])

  return (
    <>
      <Header />

      <main id="main-page">
          
        <article id="article-main">
          <section id="section-rounds">
            <h2 id="titulo-choice">Escolha quantas rodadas</h2>
              <div id="div-mae-rounds">
                <div id="rounds">
                  <label
                    htmlFor="check5"
                    className="check-rounds"
                    name="5"
                    onClick={ disabledChoiceRounds ? gettinRoundsQuantity : null }
                    id={ cincoChecked ? 'check-cinco' : 'check-cinco-checked'}
                  />
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
                  />
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
                  />
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

              <div id="tabela-points">
                <h3>Tabela de pontos:</h3>
                <p>Vitória = 3pts</p>
                <p>Empate = 1pt</p>
                <p>Derrota = 0pt</p>
              </div>
            </section>  

          <section id="section-game">
            <h3 id="titulo-rounds">{`Rodada ${actualRound} de ${rounds}`}</h3>

            <div id="results">
              <h3>Resultados da partida:</h3>
                {
                  resultFinal.map((result, ind) => {
                    return (
                      <span key={ind}>{`${result} - `}</span>
                    )
                  })
                } <p>{totalPoints ? `Você fez ${totalPoints} pontos.` : ''}</p>
            </div>

            <div id="div-btn-play-again">
              { totalPoints ? <button
                type="button"
                onClick={ playAgain }
                id = "btn-play-again"
              >
                Jogar de Novo
              </button> : null}
            </div>

            <div id="div-mae-choices">
              <div id="choices">
                <div id="box-choices">
                  <label
                    htmlFor="check-pedra"
                    className="check-choices"
                    onClick={ disabledElementsChoice ? gettinPlayerChoice : null }
                    id={ pedraChecked ? 'check-pedra' : 'check-pedra-checked'}
                  >
                    <Image
                      src={ Chars.pedra }
                      alt='personagem de pedra'
                      className='img-choices'
                    />
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
                    <Image 
                      src={ Chars.papel } 
                      alt='personagem de papel'
                      className='img-choices'
                    />
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
                    <Image 
                      src={ Chars.tesoura } 
                      alt='personagem de tesoura'
                      className='img-choices'
                    />
                  </label>
                  <input 
                    type="checkbox"
                    className="checkbox-choices"
                  />
                </div>

                <div id="box-fight">
                  <div
                    id="u-choice"
                    className="div-fight"
                  >
                    <Image
                      className="imgs-fight"
                      id="img-fight"
                      src={ imgChosen}
                      alt="img alternativa"
                    />
                  </div>
                  <div 
                    id="pc-choice"
                    className="div-fight"
                  >
                    <Image
                      className="imgs-fight"
                      src={ imgChosenPC}
                      alt="img alternativa"
                    />
                  </div>
                </div>
              </div>

              <p>{`Resultado da rodada: ${resultRound}`}</p>

              <button
                type="button"
                onClick={ makeComputerChoice }
                disabled={ playerChoice.length === 0 }
                id="btn-jogar"
              >
                Jogar
              </button>
            </div>
          </section>
        </article>

        <aside id="aside-rankings" key={rankingsInvalidationKey}>
            <RankingGeral />
            <RankingGeralByDay />
            <RankingGeralByWeek />
            <RankingGeralByMonth />
        </aside>
      </main>
    </>
  )
}

