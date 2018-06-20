let data = [{
	captain: true,
	displayName: 'Florisch',
	skillRating: 4500,
}, {
	captain: true,
	displayName: 'Rival',
	skillRating: 4500,
}]
let counter = 0;
while (data.length < 20) {
	let filler = {
		captain: false,
		displayName: 'Filler' + counter,
		skillRating: Math.floor(Math.random() * Math.floor(10000)),
	}
	data.push(filler);
	counter++;
}

// Set all global vars
let finishedTeams = [];
let teams = [];
let possibleCaptains = [];
let players = [];
for (let i = 0; i < data.length; i++) {
	data[i].skillRating = parseInt(data[i].skillRating);
	players.push(data[i]);
}

// Trim players to multiple of 5
let numberOfTeams = Math.floor(players.length / 5);
players = players.splice(0, numberOfTeams * 5);

// Log generated players in console
for (let i = 0; i < players.length; i++) {
	let captain = '';
	if (players[i].captain) {
		captain = ' (captain)';
	}
	console.log('Player: ' + players[i].displayName + captain + ', skillRating: ' + players[i].skillRating);
}

// Separate captains from players
for (let i = 0; i < players.length; i++) {
	if (players[i].captain) {
		possibleCaptains.push(players[i]);
		players.splice(i, 1);
		i--;
	}
}

// Allocate random captains to teams
while (possibleCaptains.length > 0) {
	if (teams.length < numberOfTeams) {
		let randomCaptain = Math.floor(Math.random() * Math.floor(possibleCaptains.length));
		teams.push({
			averageSkillRating: possibleCaptains[randomCaptain].skillRating,
			players: [possibleCaptains[randomCaptain]],
		});
		possibleCaptains.splice(randomCaptain, 1);
	} else {
		for (let i = 0; i < possibleCaptains.length; i++) {
			players.push(possibleCaptains[i]);
			possibleCaptains.splice(i, 1);
			i--;
		}
	}
}

// Elect new random captains from players if not enough captains are present
while (teams.length < numberOfTeams) {
	let randomPlayer = Math.floor(Math.random() * Math.floor(players.length));
	teams.push({
		averageSkillRating: players[randomPlayer].skillRating,
		players: [players[randomPlayer]],
	});
	players.splice(randomPlayer, 1);
}
teams.sort((a, b) => {
	return a.averageSkillRating - b.averageSkillRating
});

// Allocate all players to teams based on current team average skill rating
players.sort((a, b) => {
	return a.skillRating - b.skillRating
});
while (players.length > 0) {
	for (let i = 0; i < teams.length; i++) {
		teams[i].players.push(players.pop());
		let newAverage = 0;
		for (let j = 0; j < teams[i].players.length; j++) {
			newAverage += teams[i].players[j].skillRating;
		}
		teams[i].averageSkillRating = Math.round(newAverage / teams[i].players.length);
	}
	teams.sort((a, b) => {
		return a.averageSkillRating - b.averageSkillRating
	});
	for (let i = 0; i < teams.length; i++) {
		if (teams[i].players.length >= 5) {
			finishedTeams.push(teams[i]);
			teams.splice(i, 1);
			i--;
		}
	}
}

// Log generated teams in console
for (let i = 0; i < finishedTeams.length; i++) {
	let playerList = '';
	for (let player of finishedTeams[i].players) {
		playerList += player.displayName + '(' + player.skillRating + ')' +', ';
		finishedTeams[i].playerList = playerList;
	}
	console.log('Team ' + (i + 1) + ', average skillRating: ' + finishedTeams[i].averageSkillRating + ', playerList: ' + finishedTeams[i].playerList);
}
