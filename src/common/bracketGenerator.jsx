const bracketGenerator = (generatedTeams, timestamp) => {

  let teams = [];
  for (let i = 0; i < generatedTeams.length; i++) {
    teams.push(generatedTeams[i]);
  }

  let games = [];
  let homeTeamId = ``;
  let homeTeamName = ``;
  let visitorTeamId = ``;
  let visitorTeamName = ``;
  for (let i = 0; i < teams.length; i += 2) {
    if (i >= teams.length - 1) {
      homeTeamId = 'team' + teams[i].players[0].displayName;
      homeTeamName = 'Team ' + teams[i].players[0].displayName;
      visitorTeamId = 'bye';
      visitorTeamName = 'Bye';
    } else {
      homeTeamId = 'team' + teams[i].players[0].displayName;
      homeTeamName = 'Team ' + teams[i].players[0].displayName;
      visitorTeamId = 'team' + teams[i + 1].players[0].displayName;
      visitorTeamName = 'Team ' + teams[i + 1].players[0].displayName;
    }
    games.push({
      id: games.length + 1,
      name: 'Match: ' + (games.length + 1),
      bracketLabel: null,
      scheduled: timestamp * 1000,
      court: null,
      sides: {
        home: {
          score: {
            score: 0,
          },
          team: {
            id: homeTeamId,
            name: homeTeamName,
          },
        },
        visitor: {
          score: {
            score: 0,
          },
          team: {
            id: visitorTeamId,
            name: visitorTeamName,
          },
        },
      },
    });
  }

  switch (games.length) {
    case 0:
      return {
        id: 'noMatch',
        name: 'No match',
        bracketLabel: null,
        scheduled: 0,
        court: null,
        sides: {
          home: {
            score: {
              score: null,
            },
            team: null,
          },
          visitor: {
            score: {
              score: null,
            },
            team: null,
          },
        },
      };
    case 1:
      return games[0];
    case 2:
      return {
        id: games.length + 1,
        name: 'Match: ' + (games.length + 1),
        bracketLabel: null,
        scheduled: timestamp * 1000,
        court: null,
        sides: {
          home: {
            score: {
              score: 0,
            },
            seed: {
              displayName: 'Winner of match 1',
              rank: 1,
              sourceGame: games[0],
              sourcePool: null,
            },
            team: null,
          },
          visitor: {
            score: {
              score: 0,
            },
            seed: {
              displayName: 'Winner of match 2',
              rank: 1,
              sourceGame: games[1],
              sourcePool: null,
            },
            team: null,
          },
        },
      };
    default:
      return 'Bracket is currently too complex...';
  }
};

export default bracketGenerator;
