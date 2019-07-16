const givenInfo = [
  ["Name","Health","Damage"],
  ["Tom Cruise",136,6],
  ["Sponge Bob",110,4],
  ["James Earl Jones",175,8],
  ["Bob Barker",112,2],
  ["Tonya Harding",108,7],
  ["Charles Barkley",220,12],
  ["Peter Piper",116,4],
  ["Harry Potter",96,16],
  ["Shamu",280,24],
  ["Bill Gates",124,6],
  ];

  const candidates = [
  ["Tom Cruise",136,6],
  ["Sponge Bob",110,4],
  ["James Earl Jones",175,8],
  ["Bob Barker",112,2],
  ["Tonya Harding",108,7],
  ["Charles Barkley",220,12],
  ["Peter Piper",116,4],
  ["Harry Potter",96,16],
  ["Shamu",280,24],
  ["Bill Gates",124,6],
  ];

  // Make an object for each canditate, in order to organize the
  // Data in a more readable way, as well as add a wins field to each canditate

  const makeCandidateInfo = (candidateInputArr) => {
    let candidatesInfo = [];

      candidateInputArr.map((person, i) => {
        candidatesInfo.push({
          name: person[0],
          health: person[1],
          damage: person[2],
          wins: 0,
        });
      });
     return candidatesInfo;
  };

  // A candidate will beat another canditate if they have a lower battle value
  // A battle value is calculated by dividing opposing canditates health by canditates damage
  // In other words, the number of rounds it takes to defeat the opposing canditate
  // Once the winner is decided, the appropriate win category will be incremented
  // Finally we will sort by this win category

  const calculateWins = (candidateInputArr) => {
    let newCandidates = makeCandidateInfo(candidateInputArr);
    for (let i = 0; i < newCandidates.length; i++) {
      for (let j = i + 1; j < newCandidates.length; j++) {
        // This battle value is the same as the number of rounds
        // It takes for one player to beat the other.
        // In order to handle the randomness of who goes first,
        // It only truly matters if the difference between these two
        // Values is less than one.  Or less than one round to determine a victor.
        let player1BattleValue = newCandidates[j].health / newCandidates[i].damage;
        let player2BattleValue = newCandidates[i].health / newCandidates[j].damage;
        // If the value is less than one, we will choose a random first hitter and this person
        // Will end up being victorious
        if (Math.abs(player1BattleValue - player2BattleValue) < 1) {
          let firstHitterChoices = [i, j];
          let randomFirstHitter = firstHitterChoices[Math.floor(Math.random() * firstHitterChoices.length)];
          newCandidates[randomFirstHitter].wins += 1;
        };
        // If the value is larger than one, it does not matter who goes first, and the lower battle value wins.
        // Lower number of rounds it takes to beat the opposing candidate
        player1BattleValue < player2BattleValue ? newCandidates[i].wins += 1 : newCandidates[j].wins += 1;
      };
    };
    newCandidates.sort((a, b) => (b.wins > a.wins) ? 1 : -1);
    return newCandidates;
  };

  console.log(calculateWins(candidates));