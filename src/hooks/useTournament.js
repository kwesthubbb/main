import { useState } from 'react';

export const useTournament = () => {
  const [tournamentParams, setTournamentParams] = useState({
    participantsCount: 0,
    roundsCount: 0,
    teamMembersCount: 0,
    countedResults: 1,
  });
  
  const [participants, setParticipants] = useState([]);
  const [teams, setTeams] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [roundPairs, setRoundPairs] = useState([]);
  const [results, setResults] = useState([]);

  const initializeTournament = () => {
    setParticipants([]);
    setResults([]);
    setCurrentRound(0);
    setRoundPairs([]);
  };

  const addParticipant = (newParticipant) => {
    if (newParticipant.firstName && newParticipant.lastName && newParticipant.team) {
      const participant = {
        id: participants.length + 1,
        ...newParticipant,
        points: 0,
        opponents: []
      };
      
      setParticipants([...participants, participant]);
      
      if (!teams.includes(newParticipant.team)) {
        setTeams([...teams, newParticipant.team]);
      }
    }
  };

  const generateRoundPairs = () => {
    if (participants.length < 2) return;
    
    const sortedParticipants = [...participants]
      .sort((a, b) => b.points - a.points || b.rating - a.rating);
    
    const newPairs = [];
    const usedParticipants = new Set();
    
    for (let i = 0; i < sortedParticipants.length; i++) {
      if (usedParticipants.has(sortedParticipants[i].id)) continue;
      
      for (let j = i + 1; j < sortedParticipants.length; j++) {
        if (!usedParticipants.has(sortedParticipants[j].id) && 
            sortedParticipants[i].team !== sortedParticipants[j].team &&
            !sortedParticipants[i].opponents.includes(sortedParticipants[j].id)) {
          
          newPairs.push({
            participant1: sortedParticipants[i],
            participant2: sortedParticipants[j],
            result: null
          });
          
          usedParticipants.add(sortedParticipants[i].id);
          usedParticipants.add(sortedParticipants[j].id);
          break;
        }
      }
    }
    
    if (sortedParticipants.length % 2 !== 0 && !usedParticipants.has(sortedParticipants[sortedParticipants.length - 1].id)) {
      newPairs.push({
        participant1: sortedParticipants[sortedParticipants.length - 1],
        participant2: null,
        result: 'win1'
      });
    }
    
    setRoundPairs(newPairs);
    setCurrentRound(currentRound + 1);
  };

  const handleResultChange = (pairIndex, result) => {
    const updatedPairs = [...roundPairs];
    updatedPairs[pairIndex].result = result;
    setRoundPairs(updatedPairs);
  };

  const finishRound = () => {
    const updatedParticipants = [...participants];
    const roundResults = [];
    
    roundPairs.forEach(pair => {
      if (pair.result === 'win1') {
        updatedParticipants.find(p => p.id === pair.participant1.id).points += 1;
        roundResults.push({
          participant1: pair.participant1.id,
          participant2: pair.participant2?.id || null,
          result: 'win1'
        });
      } else if (pair.result === 'win2' && pair.participant2) {
        updatedParticipants.find(p => p.id === pair.participant2.id).points += 1;
        roundResults.push({
          participant1: pair.participant1.id,
          participant2: pair.participant2.id,
          result: 'win2'
        });
      } else if (pair.result === 'draw' && pair.participant2) {
        updatedParticipants.find(p => p.id === pair.participant1.id).points += 0.5;
        updatedParticipants.find(p => p.id === pair.participant2.id).points += 0.5;
        roundResults.push({
          participant1: pair.participant1.id,
          participant2: pair.participant2.id,
          result: 'draw'
        });
      }
      
      if (pair.participant2) {
        updatedParticipants.find(p => p.id === pair.participant1.id).opponents.push(pair.participant2.id);
        updatedParticipants.find(p => p.id === pair.participant2.id).opponents.push(pair.participant1.id);
      }
    });
    
    setParticipants(updatedParticipants);
    setResults([...results, roundResults]);
  };

  const calculateTeamResults = () => {
    const teamResults = {};
    
    teams.forEach(team => {
      const teamMembers = participants
        .filter(p => p.team === team)
        .sort((a, b) => b.points - a.points);
      
      const countedMembers = teamMembers.slice(0, tournamentParams.countedResults);
      const totalPoints = countedMembers.reduce((sum, member) => sum + member.points, 0);
      
      teamResults[team] = {
        points: totalPoints,
        members: countedMembers
      };
    });
    
    return teamResults;
  };

  return {
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
  };
};