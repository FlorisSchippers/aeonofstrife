const scoreCrawler = (matches, matchId = null, winnerId = null) => {
  if (matchId !== null && winnerId !== null) {
    let brackets = matches[0];
    if (brackets.id === matchId) {
      if (brackets.sides.home.team.id === winnerId) {
        brackets.sides.home.score.score = 1;
        brackets.sides.visitor.score.score = 0;
      } else {
        brackets.sides.home.score.score = 0;
        brackets.sides.visitor.score.score = 1;
      }
    } else if (brackets.sides.home.seed.sourceGame.id === matchId) {
      if (brackets.sides.home.seed.sourceGame.sides.home.team.id === winnerId) {
        brackets.sides.home.seed.sourceGame.sides.home.score.score = 1;
        brackets.sides.home.seed.sourceGame.sides.visitor.score.score = 0;
        brackets.sides.home.team = brackets.sides.home.seed.sourceGame.sides.home.team;
      } else {
        brackets.sides.home.seed.sourceGame.sides.home.score.score = 0;
        brackets.sides.home.seed.sourceGame.sides.visitor.score.score = 1;
        brackets.sides.home.team = brackets.sides.home.seed.sourceGame.sides.visitor.team;
      }
    } else if (brackets.sides.visitor.seed.sourceGame.id === matchId) {
      if (brackets.sides.visitor.seed.sourceGame.sides.home.team.id === winnerId) {
        brackets.sides.visitor.seed.sourceGame.sides.home.score.score = 1;
        brackets.sides.visitor.seed.sourceGame.sides.visitor.score.score = 0;
        brackets.sides.visitor.team = brackets.sides.visitor.seed.sourceGame.sides.home.team;
      } else {
        brackets.sides.visitor.seed.sourceGame.sides.home.score.score = 0;
        brackets.sides.visitor.seed.sourceGame.sides.visitor.score.score = 1;
        brackets.sides.visitor.team = brackets.sides.visitor.seed.sourceGame.sides.visitor.team;
      }
    }
    return brackets;
  } else {
    let matchList = [];
    switch (matches[0].id) {
      case 1:
        matchList.push(matches[0]);
        break;
      case 3:
        matchList.push(matches[0].sides.home.seed.sourceGame);
        matchList.push(matches[0].sides.visitor.seed.sourceGame);
        if (matches[0].sides.home.team !== null && matches[0].sides.visitor.team !== null) {
          matchList.push(matches[0]);
        }
        break;
      case 5:
        return 'Bracket is currently too complex...';
    }
    return matchList;
  }
};

export default scoreCrawler;
