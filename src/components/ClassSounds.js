class Sounds {
    constructor() {
        this.shot = [new Audio('../../sounds/413057__matrixxx__retro-laser-shot-01.wav'), new Audio('../../sounds/415058__matrixxx__retro-laser-shot-06.wav')];
        this.destruction = [new Audio('../../sounds/442958__qubodup__explosion.wav'), new Audio('../../sounds/528493__diicorp95__cannon-explosion.wav')];
        this.enemiesScream = new Audio('../../sounds/506514__matrixxx__monster-aah.wav');
        this.stageBossScream = new Audio('../../sounds/219943__qubodup__dragon-scream.flac');
        this.stageBossDies = new Audio('../../sounds/212764__qubodup__lion-roar.flac');
        this.stageBossPain = new Audio('../../sounds/492496__soundflakes__demon-death-03.wav');
        this.playerPain = new Audio('../../sounds/338145__artordie__scream-ugh.wav');
        this.lowHealth = new Audio('../../sounds/485076__inspectorj__heartbeat-regular-single-01-01-loop.wav');
        this.newLevel = new Audio('../../sounds/27568__suonho__memorymoon-space-blaster-plays.wav');
        this.musicGameOn = new Audio('../../sounds/Eric Skiff - A Night Of Dizzy Spells.mp3');
        this.musicBossOn = new Audio('../../sounds/Joshua McLean - Mountain Trials.mp3');
    }
}