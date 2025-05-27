import { useState } from 'react';
import { useTournament } from './hooks/useTournament';
import SetupTournament from './components/SetupTournament';
import Participants from './components/Participants';
import Round from './components/Round';
import Results from './components/Results';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('setup');
  const [newParticipant, setNewParticipant] = useState({
    firstName: '',
    lastName: '',
    rating: 0,
    team: ''
  });

  const {
    tournamentParams,
    setTournamentParams,
    participants,
    teams,
    currentRound,
    roundPairs,
    results,
    initializeTournament,
    addParticipant,
    generateRoundPairs,
    handleResultChange,
    finishRound,
    calculateTeamResults
  } = useTournament();

  const handleAddParticipant = () => {
    addParticipant(newParticipant);
    setNewParticipant({
      firstName: '',
      lastName: '',
      rating: 0,
      team: ''
    });
  };

  const handleGenerateRound = () => {
    generateRoundPairs();
    setActiveTab('round');
  };

  const handleFinishRound = () => {
    finishRound();
    setActiveTab('results');
  };

  return (
    <div className="app">
      <h1>Турнирная система (Швейцарская система)</h1>
      
      <div className="tabs">
        <button 
          className={activeTab === 'setup' ? 'active' : ''} 
          onClick={() => setActiveTab('setup')}
        >
          Настройки турнира
        </button>
        <button 
          className={activeTab === 'participants' ? 'active' : ''} 
          onClick={() => setActiveTab('participants')}
          disabled={!tournamentParams.participantsCount}
        >
          Участники
        </button>
        <button 
          className={activeTab === 'round' ? 'active' : ''} 
          onClick={() => setActiveTab('round')}
          disabled={participants.length < 2 || currentRound >= tournamentParams.roundsCount}
        >
          Тур {currentRound > 0 ? currentRound : ''}
        </button>
        <button 
          className={activeTab === 'results' ? 'active' : ''} 
          onClick={() => setActiveTab('results')}
          disabled={results.length === 0}
        >
          Результаты
        </button>
      </div>
      
      <div className="content">
        {activeTab === 'setup' && (
          <SetupTournament 
            params={tournamentParams}
            setParams={setTournamentParams}
            onInitialize={initializeTournament}
          />
        )}
        
        {activeTab === 'participants' && (
          <Participants 
            newParticipant={newParticipant}
            setNewParticipant={setNewParticipant}
            participants={participants}
            teams={teams}
            participantsCount={tournamentParams.participantsCount}
            onAddParticipant={handleAddParticipant}
            onGenerateRound={handleGenerateRound}
            currentRound={currentRound}
            roundsCount={tournamentParams.roundsCount}
          />
        )}
        
        {activeTab === 'round' && (
          <Round 
            roundPairs={roundPairs}
            currentRound={currentRound}
            onResultChange={handleResultChange}
            onFinishRound={handleFinishRound}
          />
        )}
        
        {activeTab === 'results' && (
          <Results 
            participants={participants}
            teamResults={calculateTeamResults()}
            countedResults={tournamentParams.countedResults}
            currentRound={currentRound}
            roundsCount={tournamentParams.roundsCount}
            onNextRound={() => {
              generateRoundPairs();
              setActiveTab('round');
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;