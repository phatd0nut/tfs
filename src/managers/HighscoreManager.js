the_final_stand.managers.HighscoreManager = function () {
    this.highscores = JSON.parse(localStorage.getItem('highscores')) || [];
};

the_final_stand.managers.HighscoreManager.prototype.addHighscore = function (team, wave, zombiesKilled) {
    console.log(this.highscores);
    this.highscores.push({ team, wave, zombiesKilled });
    localStorage.setItem('highscores', JSON.stringify(this.highscores));
};

the_final_stand.managers.HighscoreManager.prototype.getHighscores = function () {
    // Sortera efter top 5 highscores
    this.highscores.sort(function(a, b) {
        if (a.wave === b.wave) {
            return b.zombiesKilled - a.zombiesKilled;
        }
        return b.wave - a.wave;
    });

    return this.highscores.slice(0, 8);
};

the_final_stand.managers.HighscoreManager.prototype.getLatestHighscore = function () {
    return this.highscores[this.highscores.length - 1];
};