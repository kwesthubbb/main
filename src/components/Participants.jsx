export default function Participants({
    newParticipant,
    setNewParticipant,
    participants,
    teams,
    participantsCount,
    onAddParticipant,
    onGenerateRound,
    currentRound,
    roundsCount
  }) {
    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewParticipant({
        ...newParticipant,
        [name]: name === 'rating' ? parseInt(value) || 0 : value
      });
    };
  
    return (
      <div className="participants-tab">
        <h2>Добавление участников ({participants.length}/{participantsCount})</h2>
        
        <div className="add-participant-form">
          <div className="form-group">
            <label>Имя:</label>
            <input 
              type="text" 
              name="firstName"
              value={newParticipant.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Фамилия:</label>
            <input 
              type="text" 
              name="lastName"
              value={newParticipant.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Рейтинг:</label>
            <input 
              type="number" 
              name="rating"
              value={newParticipant.rating}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Команда:</label>
            <input 
              type="text" 
              name="team"
              value={newParticipant.team}
              onChange={handleChange}
              list="teams-list"
            />
            <datalist id="teams-list">
              {teams.map(team => (
                <option key={team} value={team} />
              ))}
            </datalist>
          </div>
          <button 
            className="btn-primary"
            onClick={onAddParticipant}
            disabled={
              !newParticipant.firstName || 
              !newParticipant.lastName || 
              !newParticipant.team ||
              participants.length >= participantsCount
            }
          >
            Добавить участника
          </button>
        </div>
        
        <h3>Список участников</h3>
        {participants.length > 0 ? (
          <table className="participants-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Рейтинг</th>
                <th>Команда</th>
              </tr>
            </thead>
            <tbody>
              {participants.map(participant => (
                <tr key={participant.id}>
                  <td>{participant.id}</td>
                  <td>{participant.firstName}</td>
                  <td>{participant.lastName}</td>
                  <td>{participant.rating}</td>
                  <td>{participant.team}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Нет добавленных участников</p>
        )}
        
        {participants.length >= 2 && (
          <button 
            className="btn-primary generate-round-btn"
            onClick={onGenerateRound}
            disabled={participants.length < 2 || currentRound >= roundsCount}
          >
            Начать тур {currentRound + 1}
          </button>
        )}
      </div>
    );
  }