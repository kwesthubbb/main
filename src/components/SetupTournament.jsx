export default function SetupTournament({ params, setParams, onInitialize }) {
    const handleChange = (e) => {
      const { name, value } = e.target;
      setParams({
        ...params,
        [name]: parseInt(value) || 0
      });
    };
  
    return (
      <div className="setup-tab">
        <h2>Параметры турнира</h2>
        <div className="form-group">
          <label>Количество участников:</label>
          <input 
            type="number" 
            name="participantsCount"
            value={params.participantsCount}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Количество туров:</label>
          <input 
            type="number" 
            name="roundsCount"
            value={params.roundsCount}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Количество участников в команде:</label>
          <input 
            type="number" 
            name="teamMembersCount"
            value={params.teamMembersCount}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Учитывать лучших N участников в команде:</label>
          <input 
            type="number" 
            name="countedResults"
            value={params.countedResults}
            onChange={handleChange}
            min="1"
          />
        </div>
        <button 
          className="btn-primary"
          onClick={onInitialize}
          disabled={!params.participantsCount || !params.roundsCount}
        >
          Начать турнир
        </button>
      </div>
    );
  }