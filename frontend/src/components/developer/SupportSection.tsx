interface SupportSectionProps {
  className?: string;
}

const PIX_LINK = 'https://nubank.com.br/cobrar/1acbc8/69880ea0-38df-41c3-917a-64c3d5851c2f';
const QR_CODE_URL = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(PIX_LINK)}`;

const supportSuggestions = [
  { emoji: '☕', label: 'Um café' },
  { emoji: '🎮', label: 'Um incentivo ao projeto' },
  { emoji: '🚀', label: 'Um apoio para novos jogos' },
];

export default function SupportSection({ className = '' }: SupportSectionProps) {
  return (
    <aside
      className={className}
      role="region"
      aria-labelledby="support-heading"
    >
      <h2 id="support-heading" className="support-heading">
        Sugestão de apoio
      </h2>
      <p className="support-intro">
        Se quiser, você pode apoiar com um valor simbólico, como:
      </p>
      <ul className="support-suggestions">
        {supportSuggestions.map(({ emoji, label }) => (
          <li key={label} className="support-item">
            <span className="support-emoji" aria-hidden>
              {emoji}
            </span>
            <span>{label}</span>
          </li>
        ))}
      </ul>
      <div className="support-actions">
        <div className="support-pix-wrapper">
          <div className="support-qr-container">
            <img
              src={QR_CODE_URL}
              alt="QR Code para pagamento PIX - escaneie para apoiar"
              width={180}
              height={180}
              className="support-qr-code"
            />
            <p className="support-qr-label">Escaneie o QR Code ou use o link</p>
          </div>
          <a
            href={PIX_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="support-pix-link"
          >
            Apoiar via PIX (Nubank)
          </a>
        </div>
      </div>
    </aside>
  );
}
