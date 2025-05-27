export default function Round({ roundPairs, currentRound, onResultChange, onFinishRound }) {
    return (
      <div className="round-tab">
        <h2>Тур {currentRound}</h2>
        
        {roundPairs.length > 0 ? (
          <div className="round-pairs">
            {roundPairs.map((pair, index) => (
              <div key={index} className="pair">
                <div className="participant">
                  {pair.participant1.firstName} {pair.participant1.lastName} 
                  ({pair.participant1.team}, {pair.participant1.points} очков)
                </div>
                
                <div className="pair-controls">
                  <select 
                    value={pair.result || ''}
                    onChange={(e) => onResultChange(index, e.target.value)}
                  >
                    <option value="">Выберите результат</option>
                    <option value="win1">Победа 1-го</option>
                    {pair.participant2 && <option value="win2">Победа 2-го</option>}
                    {pair.participant2 && <option value="draw">Ничья</option>}
                  </select>
                </div>
                
                {pair.participant2 ? (
                  <div className="participant">
                    {pair.participant2.firstName} {pair.participant2.lastName} 
                    ({pair.participant2.team}, {pair.participant2.points} очков)
                  </div>
                ) : (
                  <div className="participant">Свободная победа</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Нет пар для текущего тура</p>
        )}
        
        <button 
          className="btn-primary"
          onClick={onFinishRound}
          disabled={roundPairs.length === 0 || roundPairs.some(pair => !pair.result)}
        >
          Завершить тур
        </button>
      </div>
    );
  }