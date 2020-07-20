new Vue ({
  el: "#app",
  data: {
    showButtons: false,
    showLog: false,
    attackClicked: false,
    healClicked: false,
    myHealth: 100,
    monsterHealth: 100,
    myAttack: [],
    monsterAttack: [],
    myHeal: []
  },
  computed: {
    actions() {
      const attack = []
      for (let i =0, len = Math.max(this.myAttack.length, this.monsterAttack.length, this.myHeal.length); i < len; i++) {
        attack.push({
          playerMsg: this.myAttack[i],
          monsterMsg: this.monsterAttack[i],
          healMsg: this.myHeal[i]
        })
      }
      return attack
    },
    playerHealth() {
      if (this.myHealth > 100) {
        return {
          width: "100%"
        }
      } else if (this.myHealth < 0) {
        return {
          width: "0%"
        }
      } else {
        return {
          width: this.myHealth + "%"
        }
      }
     },
     enemyHealth() {
       return {
         width: this.monsterHealth + "%"
       }
     }
  },
  methods: {
    startGame() {
      this.showButtons = !this.showButtons;
      if (!this.showButtons == true) {
        location.reload()
      }
    },
    attack() {
      this.attackClicked = true;
      this.showLog = true;
      dmg = Math.floor(Math.random()*10) + 1;
      this.myHealth -= dmg;
      this.myAttack.push(dmg)
      if (this.myHealth <= 0) {
        this.myHealth = 0;
        let alert = confirm('You died!\nTry again?')
        if (alert == true) {
          location.reload()
        }
      } 
      monsterDmg = Math.floor(Math.random()*10) +1; 
      this.monsterHealth -= monsterDmg;
      this.monsterAttack.push(monsterDmg);
      if (this.monsterHealth < 0) {
        this.monsterHealth = 0;
        let alert = confirm('Congratulations!\nYou won! Play again!')
        if (alert == true) {
          location.reload()
        }
      } 
      console.log(this.myHealth)
      console.log("Damage is: " + dmg)
      console.log(this.monsterHealth)
      console.log("Monster damage is: " + monsterDmg)
      
    },
    heal() {
      this.healClicked = true;
      healing = Math.floor(Math.random()*10) + 1;
      this.myHealth += healing;
      this.myHeal.push(healing)
      if (this.myHealth > 100) {
        this.myHealth = 100;
      }  

      console.log('Heal is:' + healing)
      console.log(this.myHealth)
      
      dmg = Math.floor(Math.random()*10) + 1;
      this.myHealth -= dmg;
      this.myAttack.push(dmg)
      if (this.myHealth <= 0) {
        this.myHealth = 0;
        console.log('You died! Please try again')
      } 
      console.log(this.myHealth)
      console.log("Damage is: " + dmg)
      console.log(this.myHeal)
    },
    giveUp() {
      let alert = confirm('The game will be restarted!\nDo you wish to start a new game?');
      if (alert == true) {
        location.reload();
      }
    }
  }
})