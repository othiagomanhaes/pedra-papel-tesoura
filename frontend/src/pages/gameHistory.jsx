import Header from '../components/header';
import '../styles/gameHistory.css';

export default function GameHistory() {
  return (
    <div id="game-history-page">
      <Header />
      <main id="game-history-main">
        <h1>História do Jogo</h1>
        <article id="game-history-content">
          <p className="intro">
            O jogo Pedra, Papel e Tesoura, conhecido no Brasil como Joquempô (ou Jankenpon), tem raízes antigas, 
            surgindo possivelmente na China por volta de 1600 a.C.. Popularizado no Japão a partir do século XVII, 
            o formato moderno com gestos manuais consolidou-se no final do século XIX, antes de se difundir 
            globalmente no século XX. Baseia-se no conceito de impasses triplos onde pedra vence tesoura, 
            tesoura vence papel e papel vence pedra.
          </p>

          <section>
            <h2>Origens Antigas</h2>
            <p>
              As primeiras referências datam da dinastia Han (206 a.C. a 220 d.C.), citadas em obras chinesas 
              como o Wuzazu.
            </p>
          </section>

          <section>
            <h2>Influência Japonesa</h2>
            <p>
              O jogo chegou ao Japão, onde evoluiu a partir dos &quot;jogos de punho&quot; (ken), como o mushi-ken 
              (sapo, lesma e cobra).
            </p>
          </section>

          <section>
            <h2>Forma Moderna (Jankenpon)</h2>
            <p>
              A versão com os gestos atuais (pedra fechada, papel aberto, tesoura com dois dedos) desenvolveu-se 
              entre os períodos Edo e Meiji no Japão.
            </p>
          </section>

          <section>
            <h2>Expansão Mundial</h2>
            <p>
              Após a abertura do Japão no início do século XX, o jogo se tornou popular internacionalmente.
            </p>
          </section>

          <section>
            <h2>Curiosidades</h2>
            <ul>
              <li>Existe a Associação Internacional de Pedra, Papel e Tesoura.</li>
              <li>Em 2012, cientistas da Universidade de Tóquio criaram uma mão robótica com câmera de alta velocidade que nunca perde no Jankenpon.</li>
              <li>No Japão, o jogo é frequentemente usado para resolver pequenas disputas entre crianças e adultos.</li>
            </ul>
          </section>
        </article>
      </main>
    </div>
  );
}
