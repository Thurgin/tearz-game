const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024;
canvas.height = 526;

c.fillRect(0,0, canvas.width, canvas.height)

const gravity = 0.6


const background = new Sprite({
    position:{
    x:0,
    y:0
    },
    imageSrc: './img/background2.png',
    scaleW: 1.12,
    scaleH: 0.66
    

})

const player = new Fighter ({
    position: {
        x:250,
        y:0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc : "./img/samuraiMack/Idle.png",
    framesMax: 8,
    scaleW : 2.5,
    scaleH : 2.5,
    offset : {
        x: 215,
        y: 157
    },
    sprites:  {
        idle: {
            imageSrc : "./img/samuraiMack/Idle.png",
            framesMax: 8, 
        },
        run: {
            imageSrc : "./img/samuraiMack/Run.png",
            framesMax: 8, 
        },
        jump: {
            imageSrc : "./img/samuraiMack/Jump.png",
            framesMax: 2, 
        },
        fall:{
            imageSrc : "./img/samuraiMack/Fall.png",
            framesMax: 2, 
        },
        attack1 :{
            imageSrc : "./img/samuraiMack/Attack1.png",
            framesMax: 6, 
            
        },
        takeHit :{
            imageSrc : "./img/samuraiMack/Take Hit - white silhouette.png",
            framesMax: 4, 
        },
        death : {
            imageSrc : "./img/samuraiMack/Death.png",
            framesMax: 6, 
        }
    },
    attackBox: {
        offset:{
            x:100,
            y:50    
        },
        width: 155,
        height: 50
    }
})

const enemy = new Fighter ({
    position: {
        x:794,
        y:100
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc : "./img/kenji/Idle.png",
    framesMax: 4,
    scaleW : 2.5,
    scaleH : 2.5,
    offset : {
        x: 215,
        y: 167
    },
    sprites:  {
        idle: {
            imageSrc : "./img/kenji/Idle.png",
            framesMax: 4, 
        },
        run: {
            imageSrc : "./img/kenji/Run.png",
            framesMax: 8, 
        },
        jump: {
            imageSrc : "./img/kenji/Jump.png",
            framesMax: 2, 
        },
        fall:{
            imageSrc : "./img/kenji/Fall.png",
            framesMax: 2, 
        },
        attack1 :{
            imageSrc : "./img/kenji/Attack1.png",
            framesMax: 4, 
            
        },
        takeHit: {
            imageSrc : "./img/kenji/Take Hit.png",
            framesMax : 3
        },
        death : {
            imageSrc : "./img/kenji/Death.png",
            framesMax: 7, 
        }

    },
    attackBox: {
        offset:{
            x:-165,
            y:50
        },
        width: 165,
        height: 50
    }
    
})

const keys = {
    a:{
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed:false
    },
    ArrowLeft: {
        pressed:false
    },
    ArrowUp: {
        pressed:false
    },
}




var start = false
function startGame(){
    start = true
    decreaseTime();
    document.querySelector('#menu').style.display = 'none'

    
}
function reiniciar(){
    document.location.href=""

}
function inst(){
    document.querySelector('#inst').style.display = 'block'
    document.querySelector('#menu').style.display = 'none'
}
function backMenu(){
document.querySelector('#inst').style.display = 'none'
document.querySelector('#menu').style.display = 'inherit'

}
function anima(){
    window.requestAnimationFrame(anima)
    background.update()
    c.fillStyle = 'rgba(255,255,255,0.09)'
    c.fillRect(0,0,canvas.width, canvas.height)
    if(start){
        player.update()
        enemy.update()
    }
    
    // player movement
    player.velocity.x = 0
    enemy.velocity.x = 0
    if(keys.a.pressed && player.lastKey ==='a'){
        player.velocity.x = -5
    player.switchSprite('run')
    }
        else if(keys.d.pressed && player.lastKey ==='d') {
            player.velocity.x = 5
            player.switchSprite('run')
}else{
    player.switchSprite('idle')
}
        //jumping
        if(player.velocity.y < 0){
           player.switchSprite('jump')
        }else if(player.velocity.y>0){
            player.switchSprite('fall')
        } 
        // enemy movement
        if(keys.ArrowLeft.pressed && enemy.lastKey ==='ArrowLeft'){
        enemy.velocity.x = -5
        enemy.switchSprite('run')

    }
        else if(keys.ArrowRight.pressed && enemy.lastKey ==='ArrowRight') {
            enemy.velocity.x = 5
            enemy.switchSprite('run')
        }else{
            enemy.switchSprite('idle')
        }
         //jumping
         if(enemy.velocity.y < 0){
            enemy.switchSprite('jump')
         }else if(enemy.velocity.y>0){
             enemy.switchSprite('fall')
         } 
        //detect for colission
        if(
            colisaoo({ret1: player, ret2: enemy})
             &&
            player.isAttacking &&
            player.framesCurrent ===4
        ){
            enemy.takeHit()
            player.isAttacking = false
            gsap.to('#enemyHealth', {
            width: enemy.health + '%'
            })
        }
        //if player misses
        if(player.isAttacking && player.framesCurrent ===4){
            player.isAttacking = false
        }
        if(
            colisaoo({ret1: enemy, ret2: player})
             &&
            enemy.isAttacking &&
            enemy.framesCurrent ===2
        ){
            player.takeHit()
            enemy.isAttacking = false
            gsap.to('#playerHealth', {
                width: player.health + '%'
                })
        }
        //if enemy misses
        if(enemy.isAttacking && enemy.framesCurrent ===2){
            enemy.isAttacking = false
        }
        // end game based on health
        if(player.health <=0 || enemy.health <=0){
            determineWinner({player, enemy, timerId})
        }
    
        
    if(player.attackBox.position.x + player.attackBox.width >= enemy.position.x){
        console.log('hitou')
    }
    console.log(player.velocity.y)

}

anima()

function jump (fighter){
    if(fighter.pulo<1){
    fighter.velocity.y = -20
    fighter.pulo++
 
}
}

window.addEventListener('keydown', (event) =>{
    if(!player.dead){        
    switch(event.key){
            case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
            case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
            case 'w':
           jump(player)
           break
           case 's':
            player.attack()
            break
    }
}
        //enemy move
        if(!enemy.dead){
        switch(event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
            case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
            case 'ArrowUp':
           jump(enemy)
           break
           case 'ArrowDown':
           enemy.attack()
           break
            
    }
}
})
window.addEventListener('keyup', (event) =>{
    switch(event.key){
        case 'd':
            keys.d.pressed = false
            break
            case 'a':
            keys.a.pressed = false
            break
            // enemy move
            case 'ArrowRight':
                keys.ArrowRight.pressed = false
                break
                case 'ArrowLeft':
                keys.ArrowLeft.pressed = false
                break
            
          
    }
 
})




