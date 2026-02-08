import Header from '../components/header';
import RankingGeral from '../components/rankingGeral';
import RankingGeralByDay from '../components/rankingGeralByDay';
import RankingGeralByWeek from '../components/rankingGeralByWeek';
import RankingGeralByMonth from '../components/rankingGeralByMonth';
import '../styles/ranking.css';

export default function Ranking() {
  return (
    <div id="ranking-page">
      <Header />
      <main id="ranking-main">
        <h1 id="ranking-page-title">Rankings</h1>
        <p id="ranking-page-subtitle">Confira os melhores jogadores em diferentes períodos</p>
        <section id="ranking-grid">
          <RankingGeral />
          <RankingGeralByDay />
          <RankingGeralByWeek />
          <RankingGeralByMonth />
        </section>
      </main>
    </div>
  );
}
