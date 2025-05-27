export default function Results({ participants, teamResults, countedResults, currentRound, roundsCount, onNextRound }) {
    return (
      <div className="results-tab">
        <h2>Результаты</h2>
        
        <div className="results-section">
          <h3>Личный зачет</h3>
          <table className="results-table">
            <thead>
              <tr>
                <th>Место</th>
                <th>ID</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Команда</th>
                <th>Очки</th>
                <th>Рейтинг</th>
              </tr>
            </thead>
            <tbody>
              {[...participants]
                .sort((a, b) => b.points - a.points || b.rating - a.rating)
                .map((participant, index) => (
                  <tr key={participant.id}>
                    <td>{index + 1}</td>
                    <td>{participant.id}</td>
                    <td>{participant.firstName}</td>
                    <td>{participant.lastName}</td>
                    <td>{participant.team}</td>
                    <td>{participant.points}</td>
                    <td>{participant.rating}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        
        <div className="results-section">
          <h3>Командный зачет</h3>
          <table className="results-table">
            <thead>
              <tr>
                <th>Место</th>
                <th>Команда</th>
                <th>Очки (лучшие {countedResults})</th>
                <th>Участники</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(teamResults)
                .sort(([, a], [, b]) => b.points - a.points)
                .map(([team, teamData], index) => (
                  <tr key={team}>
                    <td>{index + 1}</td>
                    <td>{team}</td>
                    <td>{teamData.points}</td>
                    <td>
                      <ul>
                        {teamData.members.map(member => (
                          <li key={member.id}>
                            {member.firstName} {member.lastName} - {member.points} очков
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        
        {currentRound < roundsCount && (
          <button 
            className="btn-primary"
            onClick={onNextRound}
          >
            Начать тур {currentRound + 1}
          </button>
        )}
      </div>
    );
  }