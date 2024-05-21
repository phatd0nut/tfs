the_final_stand.managers.HighscoreManager = function () {
    this.highscores = JSON.parse(localStorage.getItem('highscores')) || [];
};

the_final_stand.managers.HighscoreManager.prototype.addHighscore = function (players, wave, zombiesKilled) {
    console.log(this.highscores);
    this.highscores.push({ players, wave, zombiesKilled });
    localStorage.setItem('highscores', JSON.stringify(this.highscores));
};

the_final_stand.managers.HighscoreManager.prototype.getHighscores = function () {
    return this.highscores;
};