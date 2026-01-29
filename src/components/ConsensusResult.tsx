import type { Consensus } from '../types/fortune';

interface Props {
  consensus: Consensus;
}

export function ConsensusResult({ consensus }: Props) {
  const {
    has_consensus,
    consensus_level,
    agreed_points,
    disagreed_points,
    final_verdict,
    advice,
    most_relevant_master,
  } = consensus;

  const levelPercent = Math.round(consensus_level * 100);
  
  return (
    <div className="consensus-result">
      <h2>🤝 大師共識</h2>

      <div className="consensus-level">
        <div className="level-bar">
          <div 
            className="level-fill"
            style={{ 
              width: `${levelPercent}%`,
              backgroundColor: has_consensus ? '#4CAF50' : '#FF9800'
            }}
          />
        </div>
        <p>
          {has_consensus 
            ? `✅ 達成共識 (${levelPercent}%)` 
            : `⚠️ 意見分歧 (${levelPercent}%)`
          }
        </p>
      </div>

      {agreed_points.length > 0 && (
        <div className="points agreed">
          <h4>✅ 大師們同意</h4>
          <ul>
            {agreed_points.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {disagreed_points.length > 0 && (
        <div className="points disagreed">
          <h4>❌ 仍有分歧</h4>
          <ul>
            {disagreed_points.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="final-verdict">
        <h4>📜 綜合結論</h4>
        <p>{final_verdict}</p>
      </div>

      <div className="advice">
        <h4>💡 給你的建議</h4>
        <p>{advice}</p>
      </div>

      {most_relevant_master && (
        <div className="relevant-master">
          <p>
            {most_relevant_master.avatar_emoji} 本次諮詢中，
            <strong>{most_relevant_master.name}</strong> 的觀點可能最值得參考
          </p>
        </div>
      )}

      <div className="disclaimer">
        <p>
          ⚠️ 此解讀僅供娛樂參考。命理是一種文化傳統，
          不應取代專業諮詢或個人判斷。相信自己，人生的選擇權在你手中。
        </p>
      </div>
    </div>
  );
}
