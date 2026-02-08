import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../components/header';
import Historic from '../../components/historic';
import { getPlayerById } from '../../services/api';
import Loading from '../../components/loading';
import '../../styles/playerProfile.css';

export default function PlayerProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      if (!id) return;
      try {
        const data = await getPlayerById(id);
        if (data && data[0]) {
          setPlayer(data[0]);
        } else {
          setPlayer(null);
        }
      } catch (error) {
        setPlayer(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [id]);

  if (loading) {
    return (
      <div id="player-profile-page">
        <Header />
        <main id="player-profile-main">
          <Loading />
        </main>
      </div>
    );
  }

  if (!player) {
    return (
      <div id="player-profile-page">
        <Header />
        <main id="player-profile-main">
          <p>Jogador não encontrado.</p>
        </main>
      </div>
    );
  }

  const imgDefault = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120"%3E%3Ccircle cx="60" cy="60" r="60" fill="%23ddd"/%3E%3C/svg%3E';

  return (
    <div id="player-profile-page">
      <Header />
      <main id="player-profile-main">
        <section id="player-profile-card">
          <h1>Perfil do Jogador</h1>
          <div id="player-profile-content">
            <img
              src={player.image || imgDefault}
              alt={`Avatar de ${player.username}`}
              id="player-profile-avatar"
            />
            <p id="player-profile-username">{player.username}</p>
            <p id="player-profile-bio">{player.bio || 'Este jogador ainda não adicionou uma bio.'}</p>
          </div>
        </section>
        <section id="player-historic-section">
          <Historic playerId={id} />
        </section>
      </main>
    </div>
  );
}
