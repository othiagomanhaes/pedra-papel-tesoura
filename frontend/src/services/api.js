import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3006/'
})

export const getLogin = async (username, email) => {
  try {
    const data = await api.post('http://localhost:3006/login', {username, email});
    return data;
  } catch (error) {
    return error.response.data;
  }
}

export const getRegister = async (username, email) => {
  try {
    const data = await api.post('http://localhost:3006/register', {username, email});
    return data;
  } catch (error) {
    return error.response.data;
  }
}

export const createGame = async ({ username_id, round_id, victory, points, draw, defeat, rounds, matchs }) => {
  try {
    const data = await api.post('http://localhost:3006/game', { username_id, round_id, victory, points, draw, defeat, rounds, matchs });
    return data;
  } catch (error) {
    return error;
  }
}

export const getRankingGeralApi = async () => {
  try {
    const { data: { allPlayersRanking }} = await api.get('http://localhost:3006/player/playerRanking');
    return allPlayersRanking;
  } catch (error) {
    return error;
  }
}

export const getRankingGeralByDayApi = async () => {
  try {
    const { data: { allPlayersRankingByDay }} = await api.get('http://localhost:3006/player/playerRankingByDay');
    return allPlayersRankingByDay;
  } catch (error) {
    return error;
  }
}

export const getRankingGeralByWeekApi = async () => {
  try {
    const { data: { allPlayersRankingByWeek }} = await api.get('http://localhost:3006/player/playerRankingByWeek');
    return allPlayersRankingByWeek;
  } catch (error) {
    return error;
  }
}

export const getRankingGeralByMonthApi = async () => {
  try {
    const { data: { allPlayersRankingByMonth }} = await api.get('http://localhost:3006/player/playerRankingByMonth');
    return allPlayersRankingByMonth;
  } catch (error) {
    return error;
  }
}

export const getPlayerById = async (id) => {
  try {
    const { data: { player }} = await api.get(`http://localhost:3006/player/${id}`);
    return player;
  } catch (error) {
    return error;
  }
}

