// All on-screen text, English and French. The French column is taken verbatim
// from LetsSpeakUp_Game-Text_EN-FR.docx (final translation).
// Placeholders in curly braces ({name}, {count}, …) are filled in at render time.

export type Lang = "en" | "fr";

const en = {
  // Branding & browser tab
  "app.title": "Let's Speak Up",
  "app.metaDesc": "Demo Version for Facilitators",
  "home.subtitle": "A Demo Version for Facilitators!",

  // Start page — name & buttons
  "home.yourName": "Your Name",
  "home.yourNameDesc": "Enter your name to start playing",
  "home.namePlaceholder": "Enter your name...",
  "home.create": "Create New Game",
  "home.createDesc": "Start a new game room; 3–6 players",
  "home.createBtn": "Create Room",
  "home.creating": "Creating...",
  "home.join": "Join Existing Game",
  "home.joinDesc": "Enter a room code to join a game",
  "home.roomCode": "Room Code",
  "home.roomCodePlaceholder": "e.g., CD0T51",
  "home.joinBtn": "Join Room",
  "home.joining": "Joining...",

  // Start page — "How to Play"
  "home.howTo": "How to Play",
  "home.rule1": "Each player starts with 6 cards: 1 Role Card, 1 Context Card and 4 Statement Cards.",
  "home.rule2": "On your turn (Active Player), select one card from each deck to create a set and secretly rate it as “Promotes” if you think it promotes psychological safety or “Hinders” if you think it hinders psychological safety.",
  "home.rule3": "The other players will secretly rate the Active Player's card set.",
  "home.rule4": "After all ratings are submitted, see who matched the Active Player's rating!",
  "home.noteLabel": "NOTE:",
  "home.note": "This online version is a simplified adaptation of the Let's Speak Up card game. It is intended solely for training purposes and must be used exclusively during a facilitated training session.",

  // Waiting room (lobby)
  "lobby.title": "Waiting Room",
  "lobby.waitingMore": "Waiting for more players to join...",
  "lobby.ready": "{count}/{max} players ready",
  "lobby.start": "Start Game",
  "lobby.need": "Need 3–6 players to start",
  "lobby.waitingHost": "Waiting for the host to start the game...",
  "lobby.players": "Players ({count}/{max})",
  "lobby.readyTitle": "Ready to Play?",
  "lobby.info": "Each player will receive 6 cards: 1 Role Card, 1 Context Card and 4 Statement Cards.",

  // Game — header & players
  "game.title": "Card Match",
  "game.facilitator": "(Facilitator)",
  "game.round": "Round {n}",
  "game.players": "Players",
  "game.yourTurn": "Your Turn",
  "game.turnOf": "{name}'s Turn",
  "game.connecting": "Connecting to game...",

  // Game — selecting cards
  "sel.title": "Select Your Cards",
  "sel.sub": "Choose one card from each deck to create your set",
  "sel.role": "Role Card",
  "sel.context": "Context Card",
  "sel.statements": "Statement Cards",
  "sel.selected": "Selected",
  "sel.rate": "Rate your card set",
  "sel.waitingFor": "Waiting for {name}...",
  "sel.waitingSub": "{name} is selecting their card set",

  // Game — rating phase
  "rate.yourSet": "Your Card Set",
  "rate.setOf": "{name}'s Card Set",
  "rate.waitingOthers": "Waiting for others to rate your set...",
  "rate.prompt": "Rate this card set - does it promote or hinder psychological safety?",
  "rate.role": "Role",
  "rate.context": "Context",
  "rate.statement": "Statement",
  "rate.na": "N/A",
  "rate.submit": "Submit your rating",
  "rate.promotes": "Promotes",
  "rate.hinders": "Hinders",
  "rate.youRated": "You rated this as:",
  "rate.waitingPlayers": "Waiting for other players... ({count}/{total})",

  // Game — round results
  "res.title": "Round Results",
  "res.rating": "{name}'s rating:",
  "res.earnedPrefix": "{name} earned",
  "res.earnedSuffix": "this round.",
  "res.selectedSet": "{name}'s selected card set:",
  "res.ratings": "Player Ratings:",
  "res.you": "(You)",
  "res.noRating": "No rating",
  "res.match": "Match!",
  "res.noMatch": "No match",
  "res.next": "Next Round",
  "res.waitingNext": "Waiting for {name} to start the next round...",

  // Player list (badges)
  "pl.you": "(You)",
  "pl.active": "Active",
  "pl.online": "Online",
  "pl.offline": "Offline",
  "pl.point": "point",
  "pl.points": "points",

  // Facilitator view
  "fac.title": "Facilitator View",
  "fac.room": "Room:",
  "fac.round": "Round:",
  "fac.phase": "Phase:",
  "fac.players": "Players",
  "fac.selected": "Selected Cards",
  "fac.ratings": "Ratings submitted: {count} / {total}",
  "fac.connecting": "Connecting to game...",

  // Notifications (pop-up messages)
  "toast.nameReqTitle": "Name required",
  "toast.nameReqCreate": "Please enter your name to create a game room.",
  "toast.nameReqJoin": "Please enter your name to join a game.",
  "toast.codeReqTitle": "Room code required",
  "toast.codeReq": "Please enter a room code to join.",
  "toast.joinFailTitle": "Failed to join room",
  "toast.joinFail": "Unable to join the game room. Please try again.",
  "toast.joinedTitle": "Player joined",
  "toast.joined": "{name} has joined the game.",
  "toast.leftTitle": "Player left",
  "toast.left": "{name} has left the game.",
  "toast.copiedTitle": "Room code copied!",
  "toast.copied": "Share this code with your players/facilitator.",
  "toast.incompleteTitle": "Incomplete selection",
  "toast.incomplete": "Please select one card from each deck.",
  "toast.observerTitle": "Observer mode",
  "toast.observer": "Facilitators don’t advance rounds.",
  "toast.error": "Error",

  // Fallback page
  "nf.title": "404 Page Not Found",

  // Language switch
  "lang.label": "Language",
};

export type StringKey = keyof typeof en;

const fr: Record<StringKey, string> = {
  "app.title": "Parlons-en !",
  "app.metaDesc": "Version démo pour les animateurs/trices",
  "home.subtitle": "Une version démo pour les animateurs/trices !",

  "home.yourName": "Votre nom",
  "home.yourNameDesc": "Saisissez votre nom pour commencer à jouer",
  "home.namePlaceholder": "Saisissez votre nom…",
  "home.create": "Créer une nouvelle partie",
  "home.createDesc": "Créez une nouvelle salle de jeu ; 3 à 6 personnes",
  "home.createBtn": "Créer une salle",
  "home.creating": "Création…",
  "home.join": "Rejoindre une partie",
  "home.joinDesc": "Saisissez un code de salle pour rejoindre une partie",
  "home.roomCode": "Code de la salle",
  "home.roomCodePlaceholder": "ex. : CD0T51",
  "home.joinBtn": "Rejoindre la salle",
  "home.joining": "Connexion…",

  "home.howTo": "Comment jouer",
  "home.rule1": "Chaque personne commence avec 6 cartes : 1 carte Rôle, 1 carte Contexte et 4 cartes Déclaration.",
  "home.rule2": "À votre tour (personne qui a la main), sélectionnez une carte de chaque pile pour composer un ensemble, puis évaluez-le en secret : « Favorise » si vous pensez qu’il favorise la sécurité psychologique, ou « Entrave » si vous pensez qu’il l’entrave.",
  "home.rule3": "Les autres joueurs évaluent en secret l’ensemble de cartes de la personne qui a la main.",
  "home.rule4": "Une fois toutes les évaluations soumises, découvrez qui a deviné l’intention de la personne qui a la main !",
  "home.noteLabel": "REMARQUE :",
  "home.note": "Cette version en ligne est une adaptation simplifiée du jeu de cartes Parlons-en ! Elle est destinée uniquement à des fins de formation et doit être utilisée exclusivement lors d’une session de formation.",

  "lobby.title": "Salle d’attente",
  "lobby.waitingMore": "En attente d’autres personnes…",
  "lobby.ready": "{count}/{max} personnes prêtes",
  "lobby.start": "Démarrer la partie",
  "lobby.need": "Il faut 3 à 6 personnes pour commencer",
  "lobby.waitingHost": "En attente du démarrage de la partie par l’hôte…",
  "lobby.players": "Personnes ({count}/{max})",
  "lobby.readyTitle": "Prêt·e à jouer ?",
  "lobby.info": "Chaque personne recevra 6 cartes : 1 carte Rôle, 1 carte Contexte et 4 cartes Déclaration.",

  "game.title": "Association de cartes",
  "game.facilitator": "(animateur/trice)",
  "game.round": "Manche {n}",
  "game.players": "Personnes",
  "game.yourTurn": "À vous de jouer",
  "game.turnOf": "Au tour de {name}",
  "game.connecting": "Connexion à la partie…",

  "sel.title": "Sélectionnez vos cartes",
  "sel.sub": "Choisissez une carte dans chaque pile pour composer votre ensemble",
  "sel.role": "Carte Rôle",
  "sel.context": "Carte Contexte",
  "sel.statements": "Cartes Déclaration",
  "sel.selected": "Sélectionnée",
  "sel.rate": "Évaluez votre ensemble de cartes",
  "sel.waitingFor": "En attente de {name}…",
  "sel.waitingSub": "{name} sélectionne son ensemble de cartes",

  "rate.yourSet": "Votre ensemble de cartes",
  "rate.setOf": "Ensemble de cartes de {name}",
  "rate.waitingOthers": "En attente des autres réponses…",
  "rate.prompt": "Évaluez cet ensemble de cartes : favorise-t-il ou entrave-t-il la sécurité psychologique ?",
  "rate.role": "Rôle",
  "rate.context": "Contexte",
  "rate.statement": "Déclaration",
  "rate.na": "N/D",
  "rate.submit": "Soumettez votre évaluation",
  "rate.promotes": "Favorise",
  "rate.hinders": "Entrave",
  "rate.youRated": "Vous avez évalué :",
  "rate.waitingPlayers": "En attente des autres personnes… ({count}/{total})",

  "res.title": "Résultats de la manche",
  "res.rating": "Évaluation de {name} :",
  "res.earnedPrefix": "{name} a gagné",
  "res.earnedSuffix": "cette manche.",
  "res.selectedSet": "Ensemble de cartes choisi par {name} :",
  "res.ratings": "Classement :",
  "res.you": "(vous)",
  "res.noRating": "Aucune évaluation",
  "res.match": "Correspond !",
  "res.noMatch": "Ne correspond pas",
  "res.next": "Manche suivante",
  "res.waitingNext": "En attente du lancement de la manche suivante par {name}…",

  "pl.you": "(vous)",
  "pl.active": "Actif",
  "pl.online": "En ligne",
  "pl.offline": "Hors ligne",
  "pl.point": "point",
  "pl.points": "points",

  "fac.title": "Vue animateur/trice",
  "fac.room": "Salle :",
  "fac.round": "Manche :",
  "fac.phase": "Phase :",
  "fac.players": "Personnes",
  "fac.selected": "Cartes sélectionnées",
  "fac.ratings": "Réponses soumises : {count} / {total}",
  "fac.connecting": "Connexion à la partie…",

  "toast.nameReqTitle": "Nom requis",
  "toast.nameReqCreate": "Veuillez saisir votre nom pour créer une salle de jeu.",
  "toast.nameReqJoin": "Veuillez saisir votre nom pour rejoindre une partie.",
  "toast.codeReqTitle": "Code de salle requis",
  "toast.codeReq": "Veuillez saisir un code de salle pour rejoindre.",
  "toast.joinFailTitle": "Échec de la connexion à la salle",
  "toast.joinFail": "Impossible de rejoindre la salle de jeu. Veuillez réessayer.",
  "toast.joinedTitle": "Nouvelle personne",
  "toast.joined": "{name} a rejoint la partie.",
  "toast.leftTitle": "Départ d’une personne",
  "toast.left": "{name} a quitté la partie.",
  "toast.copiedTitle": "Code de la salle copié !",
  "toast.copied": "Partagez ce code avec le reste du groupe.",
  "toast.incompleteTitle": "Sélection incomplète",
  "toast.incomplete": "Veuillez sélectionner une carte dans chaque pile.",
  "toast.observerTitle": "Mode observation",
  "toast.observer": "Les animateurs/trices ne font pas passer les manches.",
  "toast.error": "Erreur",

  "nf.title": "404 — Page introuvable",

  "lang.label": "Langue",
};

export const STRINGS: Record<Lang, Record<StringKey, string>> = { en, fr };

// Messages the server sends as plain English text (errors / join failures).
// Matched after normalising curly apostrophes, so both ’ and ' work.
const serverFr: Record<string, string> = {
  "Failed to create room": "Échec de la création de la salle",
  "Room not found": "Salle introuvable",
  "Unable to join room. Room is full.": "Impossible de rejoindre la salle. La salle est complète.",
  "Unable to join. Game already started.": "Impossible de rejoindre. La partie a déjà commencé.",
  "Name already in use. Choose a different name.": "Ce nom est déjà utilisé. Choisissez un autre nom.",
  "Unable to join room.": "Impossible de rejoindre la salle.",
  "An error occurred while joining the room": "Une erreur s’est produite lors de la connexion à la salle.",
  "You are not in a game": "Vous n’êtes pas dans une partie",
  "Failed to start game. Make sure there are enough players and the game hasn't already started.":
    "Échec du démarrage de la partie. Assurez-vous qu’il y a assez de joueurs/joueuses et que la partie n’a pas déjà commencé.",
  "An error occurred while starting the game": "Une erreur s’est produite lors du démarrage de la partie",
  "Failed to select cards. Make sure it's your turn.": "Échec de la sélection des cartes. Assurez-vous que c’est votre tour.",
  "An error occurred while selecting cards": "Une erreur s’est produite lors de la sélection des cartes",
  "Failed to submit rating": "Échec de la soumission de l’évaluation",
  "An error occurred while submitting rating": "Une erreur s’est produite lors de la soumission de l’évaluation",
  "Failed to start next round": "Échec du lancement de la manche suivante",
  "An error occurred while starting next round": "Une erreur s’est produite lors du lancement de la manche suivante",
};

const straight = (s: string) => s.replace(/’/g, "'");
export const SERVER_FR: Record<string, string> = Object.fromEntries(
  Object.entries(serverFr).map(([k, v]) => [straight(k), v])
);
