new Vue ({
  el: "#app",
  data: {
    showButtons: false,
    myHealth: 100,
    monsterHealth: 100,
    myAttack: [],
    monsterAttack: []
  },
  computed: {
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
    attack() {
      dmg = Math.floor(Math.random()*10) + 1;
      this.myHealth -= dmg;
      this.myAttack.push(dmg);
      if (this.myHealth <= 0) {
        this.myHealth = 0;
        alert('You died!\nPlease try again.')
        location.reload()
      } 
      monsterDmg = Math.floor(Math.random()*10) +1; 
      this.monsterHealth -= monsterDmg;
      this.monsterAttack.push(monsterDmg);
      if (this.monsterHealth < 0) {
        this.monsterHealth = 0;
        alert('Congratulations!\nYou won! Play again!')
        location.reload()
      } 
      console.log(this.myHealth)
      console.log("Damage is: " + dmg)
      console.log(this.myAttack)
      console.log(this.monsterHealth)
      console.log("Monster damage is: " + monsterDmg)
    },
    heal() {
      healing = Math.floor(Math.random()*10) + 1;
      this.myHealth += healing;
      if (this.myHealth > 100) {
        this.myHealth = 100;
      }  

      console.log('Heal is:' + healing)
      console.log(this.myHealth)
      
      dmg = Math.floor(Math.random()*10) + 1;
      this.myHealth -= dmg;
      if (this.myHealth <= 0) {
        this.myHealth = 0;
        console.log('You died! Please try again')
      } 
      console.log(this.myHealth)
      console.log("Damage is: " + dmg)
    },
    giveUp() {
      alert('The game will be restarted');
      location.reload();
    }
  }
})