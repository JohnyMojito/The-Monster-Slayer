new Vue ({
  el: "#app",
  data: {
    gameOn: false,
    enterName: true,
    myHealth: 100,
    monsterHealth: 100,
    turns: [],
    playerName: '',
  },
  computed: {
    playerColor() {
      if (this.myHealth <= 100 && this.myHealth > 50) {
        return 'green';
      } else if (this.myHealth <= 50 && this.myHealth > 25) {
        return 'orange';
      } else if (this.myHealth <= 25) {
        return 'red';
      }
    },
    monsterColor() {
      if (this.monsterHealth <= 100 && this.monsterHealth > 50) {
        return 'green';
      } else if (this.monsterHealth <= 50 && this.monsterHealth > 25) {
        return 'orange';
      } else if (this.monsterHealth <= 25) {
        return 'red';
      }
    }
  },
  methods: {
    startGame() {
      this.gameActions(true, false)
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
        text: this.playerName + ' healed and regained ' + healing + ' life points!'
      })
      if (this.myHealth > 100) {
        this.myHealth = 100;
      }  
      this.monsterAttack();
    },
    restart() {
      if (confirm('Do you want to start over?')){
        this.startGame();
      }
    },
    giveUp() {
      if(confirm('The game will be abandoned!\nDo you wish to return to the name selection screen?')) {
        this.gameActions(false, true)
        this.playerName = '';
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
        text: this.playerName + " " + action + ' and dealt ' + dmg + ' points of damage!'
      })

      if(this.checkWin()){
        return;
      }

      this.monsterAttack()
    },
    gameActions(boolOne, boolTwo) {
      if (this.playerName == '') {
       alert('You forgot to enter your name!') 
      } else {
        this.gameOn = boolOne;
        this.enterName = boolTwo;
        this.myHealth = 100;
        this.monsterHealth = 100;
        this.turns = [];
        this.playerBgColor = 'green';
        this.monsterBgColor = 'green';
      }
    }
  }
})