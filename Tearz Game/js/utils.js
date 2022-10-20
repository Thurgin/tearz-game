
function colisaoo({ret1, ret2}){
    return(
    ret1.attackBox.position.x + ret1.attackBox.width >= ret2.position.x  &&
    ret1.attackBox.position.x <= ret2.position.x + ret2.width &&
    ret1.attackBox.position.y + ret1.attackBox.height >= ret2.position.y
    && ret1.attackBox.position.y <= ret2.position.y + ret2.height         
    )
}

function determineWinner({player, enemy, timerId}){
    clearTimeout(timerId)
    document.querySelector('#menu').style.display = 'inherit' 
    document.querySelector('#title').style.fontSize = '18pt'
    document.querySelector('#reiniBtn').style.display = 'inherit'
    document.querySelector('#startBtn').style.display = 'none'   
    if(player.health === enemy.health){
        document.querySelector('#title').innerHTML = "Draw"
        
    }else if (player.health>enemy.health){
        document.querySelector('#title').innerHTML = 'Player 1 Win'
        start = false;
        }else{
            document.querySelector('#title').innerHTML = 'Player 2 Win'
            start = false;

        }
}

let timer = 60
let timerId;

function decreaseTime(){

    if(timer>0){
        timerId = setTimeout(decreaseTime,1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }
    if(timer ===0){
    determineWinner({player, enemy, timerId});
    
}
}
