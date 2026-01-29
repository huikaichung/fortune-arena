import type { MasterReading as MasterReadingType } from '../types/fortune';

interface Props {
  reading: MasterReadingType;
}

export function MasterReading({ reading }: Props) {
  const { master, analysis, prediction, confidence, key_points } = reading;
  
  const confidencePercent = Math.round(confidence * 100);
  const confidenceColor = confidence > 0.7 ? '#4CAF50' : confidence > 0.4 ? '#FF9800' : '#F44336';

  return (
    <div className="master-reading">
      <div className="master-header">
        <span className="master-emoji">{master.avatar_emoji}</span>
        <div className="master-info">
          <h3>{master.name}</h3>
          <p className="master-title">{master.title}</p>
        </div>
        <div className="confidence" style={{ borderColor: confidenceColor }}>
          <span style={{ color: confidenceColor }}>{confidencePercent}%</span>
          <small>信心度</small>
        </div>
      </div>

      <div className="reading-content">
        <div className="analysis">
          <h4>📖 解讀</h4>
          <p>{analysis}</p>
        </div>

        <div className="prediction">
          <h4>🔮 預測與建議</h4>
          <p>{prediction}</p>
        </div>

        {key_points.length > 0 && (
          <div className="key-points">
            <h4>💡 關鍵觀點</h4>
            <ul>
              {key_points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
