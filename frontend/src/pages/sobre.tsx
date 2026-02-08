import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/header';
import { SocialLinks, SupportSection, Section } from '../components/developer';
import '../styles/sobre.css';

export default function Sobre() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Sobre o desenvolvedor | Pedra, Papel e Tesoura</title>
        <meta
          name="description"
          content="Conheça o Thiago Manhães, desenvolvedor do jogo Pedra, Papel e Tesoura. Projeto pessoal gratuito e acessível."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="sobre-page" role="main">
        <article className="sobre-container">
          <header className="sobre-header">
            <h1 className="sobre-title">Thiago Manhães</h1>
            <p className="sobre-subtitle">Desenvolvedor do projeto</p>
            <SocialLinks className="sobre-social-links" />
          </header>

          <Section
            id="introducao"
            title="Introdução"
            className="sobre-section"
          >
            <p>
              Oi! Eu sou o Thiago 👋
            </p>
            <p>
              Desenvolvi este jogo como um projeto pessoal, unindo aprendizado, criatividade e diversão.
              A ideia sempre foi criar algo simples, acessível e gratuito para qualquer pessoa jogar.
            </p>
          </Section>

          <Section
            id="sobre-projeto"
            title="Sobre o projeto"
            className="sobre-section"
          >
            <p>
              Este jogo faz parte da minha jornada como desenvolvedor.
              Cada funcionalidade, tela e detalhe foi pensado como um exercício prático de desenvolvimento
              e também como uma forma de compartilhar algo divertido com quem acessa.
            </p>
          </Section>

          <Section
            id="sobre-apoiar"
            title="Sobre apoiar"
            className="sobre-section"
          >
            <p>
              Se você curtiu o jogo e quiser apoiar o desenvolvimento, essa opção existe — mas é totalmente opcional.
              Qualquer apoio ajuda a manter o projeto online e me incentiva a continuar criando jogos e aplicações gratuitas.
            </p>
          </Section>

          <div className="sobre-support-wrapper">
            <SupportSection />
          </div>

          <footer className="sobre-footer">
            <p>
              Independente de qualquer apoio, obrigado por jogar e fazer parte desse projeto 😊
            </p>
          </footer>

          <a
            href="/"
            className="sobre-back-link"
            onClick={(e) => {
              e.preventDefault();
              router.push('/');
            }}
          >
            ← Voltar ao início
          </a>
        </article>
      </main>
    </>
  );
}
