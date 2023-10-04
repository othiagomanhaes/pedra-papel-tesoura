const getTheWinner = (player, computer) => {
  //Empates
  if (player === 'pedra' && computer === 'pedra') return 'empate';
  if (player === 'papel' && computer === 'papel') return 'empate';
  if (player === 'tesoura' && computer === 'tesoura') return 'empate';
  
  //vitórias do player
  if (player === 'pedra' && computer === 'tesoura') return 'vitória';
  if (player === 'papel' && computer === 'pedra') return 'vitória';
  if (player === 'tesoura' && computer === 'papel') return 'vitória';
  
  //derrotas do player
  if (player === 'tesoura' && computer === 'pedra') return 'derrota';
  if (player === 'pedra' && computer === 'papel') return 'derrota';
  if (player === 'papel' && computer === 'tesoura') return 'derrota';
}

export default getTheWinner;
