import { Enemy } from './Enemy.js';
import { enemiesSpeed, htmlClasses, missileDamage, shipsLivesCount, timeVariables } from './utilities.js';

export class Destroyer extends Enemy {
    constructor(x, y) {
        super(x, y, shipsLivesCount.destroyer, htmlClasses.destroyer, enemiesSpeed.destroyer)
        this.shootingUnit = true;
        this.missiles = [];
        this.intervalShooting = null;
        this.shootingLoop();
    }   

    shootSingleMissile() {
        this.createMissile(
            '--missile-size',
            htmlClasses.missileRed,
            true,
            missileDamage.missile,
        );
    }

    shootingLoop() {
        this.intervalShooting = setInterval(() => {
            setTimeout(() => {
                this.shootSingleMissile();    
            }, Math.random() * 1200);
            
        }, timeVariables.destroyerShooting);
    }

    remove() {
        clearInterval(this.intervalShooting);
        super.remove();
    }

    explode() {
        clearInterval(this.intervalShooting);
        super.explode();
        // here setted timeouted cleaning missiles to prevent infinite intervals of uncontrolled exploded destroyers missiles  
        setTimeout(() => {
            this.missiles.forEach(missile => {
                missile.remove();                
            });
        }, 5000);
    }
}