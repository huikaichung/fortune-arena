import type { DebateRound } from '../types/fortune';

interface Props {
  debate: DebateRound[];
}

const emotionStyles: Record<string, { bg: string; border: string; label: string }> = {
  neutral: { bg: '#f5f5f5', border: '#ccc', label: '' },
  agree: { bg: '#e8f5e9', border: '#4CAF50', label: '👍' },
  disagree: { bg: '#ffebee', border: '#F44336', label: '👎' },
  angry: { bg: '#fff3e0', border: '#FF5722', label: '😤' },
  sarcastic: { bg: '#f3e5f5', border: '#9C27B0', label: '😏' },
};

export function DebateSection({ debate }: Props) {
  // 按回合分組
  const rounds = debate.reduce((acc, round) => {
    const num = round.round_number;
    if (!acc[num]) acc[num] = [];
    acc[num].push(round);
    return acc;
  }, {} as Record<number, DebateRound[]>);

  return (
    <div className="debate-section">
      <h2>⚔️ 大師辯論</h2>
      <p className="debate-intro">
        看看大師們如何針對你的問題展開激烈討論...
      </p>

      {Object.entries(rounds).map(([roundNum, statements]) => (
        <div key={roundNum} className="debate-round">
          <h3>第 {roundNum} 輪</h3>
          <div className="statements">
            {statements.map((stmt, idx) => {
              const style = emotionStyles[stmt.emotion] || emotionStyles.neutral;
              return (
                <div
                  key={idx}
                  className="statement"
                  style={{ 
                    backgroundColor: style.bg,
                    borderLeftColor: style.border 
                  }}
                >
                  <div className="speaker">
                    <span className="emoji">{stmt.speaker.avatar_emoji}</span>
                    <span className="name">{stmt.speaker.name}</span>
                    {style.label && <span className="emotion-label">{style.label}</span>}
                    {stmt.target_name && (
                      <span className="target">→ 對 {stmt.target_name}</span>
                    )}
                  </div>
                  <p className="content">{stmt.statement}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
