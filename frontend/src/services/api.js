import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3006/'
})

export const googleLogin = async (credential) => {
  try {
    const { data } = await api.post('http://localhost:3006/auth/google', { credential });
    return data;
  } catch (error) {
    return error.response?.data || error;
  }
}

export const googleRegister = async (credential, username) => {
  try {
    const { data } = await api.post('http://localhost:3006/auth/google/register', {
      credential,
      username,
    });
    return data;
  } catch (error) {
    return error.response?.data || error;
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

export const getStatisticById = async (id) => {
  try {
    const { data: { statiscPlayer }} = await api.get(`http://localhost:3006/player/statistic/${id}`);
    return statiscPlayer;
  } catch (error) {
    return error;
  }
}

export const updatePlayerBio = async (id, bio) => {
  try {
    const { data } = await api.post('http://localhost:3006/player/editBio', { id, bio });
    return data;
  } catch (error) {
    return error.response?.data || error;
  }
}

export const updatePlayerImage = async (id, image) => {
  try {
    const { data } = await api.post('http://localhost:3006/player/editImage', { id, image });
    return data;
  } catch (error) {
    return error.response?.data || error;
  }
}

