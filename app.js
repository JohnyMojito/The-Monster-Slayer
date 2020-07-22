new Vue ({
  el: "#app",
  data: {
    gameOn: false,
    myHealth: 100,
    monsterHealth: 100,
    turns: []
  },
  methods: {
    startGame() {
     this.gameOn = true;
     this.myHealth = 100;
     this.monsterHealth = 100;
     this.turns = [];
    },
    attack() {
      this.playerActions(1, 10, 'attacked')
    },
    specialAttack(){
      this.playerActions(10, 20, 'used a special attack')
    },
    heal() {
      var healing = this.calculateDmg(5,15);
      this.myHealth += healing;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player healed and regained ' + healing + ' life points!'
      })
      if (this.myHealth > 100) {
        this.myHealth = 100;
      }  
      this.monsterAttack();
    },
    giveUp() {
      if(confirm('The game will be restarted!\nDo you wish to start a new game?')) {
        this.startGame();
      } else {
        this.gameOn = false;
      }
    },
    calculateDmg(min, max) {
      return Math.max(Math.floor(Math.random()*max + 1), min)
    },
    monsterAttack() {
      var dmg = this.calculateDmg(5, 12);
      this.myHealth -= dmg;
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster attacked and dealt ' + dmg + ' points of damage!'
      })
      this.checkWin();
    },
    checkWin() {
      if (this.monsterHealth <= 0){
        if (confirm('You won! Play again?')){
          this.startGame()
        } else {
          this.gameOn = false;
        }
        return true; 
      } else if (this.myHealth <= 0) {
        if (confirm('You lost! Try again?')) {
          this.startGame()
        } else {
          this.gameOn = false;
        }
        return true;
      }
      return false; 
    },
    playerActions(min, max, action) {
      var dmg = this.calculateDmg(min, max)
      this.monsterHealth -= dmg;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player ' + action + ' and dealt ' + dmg + ' points of damage!'
      })

      if(this.checkWin()){
        return;
      }

      this.monsterAttack()
    }
  }
})