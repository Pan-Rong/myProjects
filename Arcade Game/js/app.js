var init={
    enemy:{
        position:{
            row2: 83 * 0 + 58,
            row3: 83 * 1 + 58,
            row4: 83 * 2 + 58,
            col1: -100
        },
        speed:{
            slow: 150,
            slower: 120,
            slowest: 80,
            fast: 200,
            faster: 300,
            fastest:400
        }
    },
    player:{
        position:{
            x: 202,
            y: 390
        },
        movementAreaLimit:{
            left: 0,
            right: 404,
            top: 58,
            bottom: 390,
            rightFrm: 505 //用于判断enemy是否超出边界
       },
        moveStep:{
            top2Bottom:83,
            left2Right:101
       }
    }
};
// 这是我们的玩家要躲避的敌人 
var Enemy = function(x, y, speed, run) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.run = run;//用于第一次显示enemy时使用
    this.loop = true;//判断是否应该循环
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};
// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    if(!this.run) {
        var randomTime = 2000 + 12000 * Math.random();
        var that = this;
        setTimeout(function() {
            that.run = true;
        }, randomTime);
    }else{
        this.x += dt * this.speed;
        if((this.x >= init.player.movementAreaLimit.rightFrm) && this.loop) {
            var randomTime = 2000 + 4000 * Math.random();
            var that = this;
            this.loop = false;
            setTimeout(function() {
                that.x = init.enemy.position.col1;
                that.loop = true;
            }, randomTime);
        }
    }  
};
// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//此为游戏的碰撞函数，用来检测碰撞,若发生碰撞则返回初始位置
Enemy.prototype.checkCollision = function (player) {
    if((this.y == player.y)&&(this.x >= player.x -60 )&&(this.x <= player.x + 60)){
        player.x = init.player.position.x;
        player.y = init.player.position.y;
        player.score -= 20;
    }
}
/*//实现gems的显示
var Gems = function(){
    this.x , this.y ,this.sprite;
};
Gems.prototype.render = function(sprite, col , row) {
    this.x = col;
    this.y = row;
    this.sprite = sprite;
    ctx.drawImage(Resources.get(this.sprite),col , row);
}
var gems = new Gems();
*/
// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.score = 100;
};
Player.prototype.update = function() {

};
Player.prototype.handleInput = function(movement) {
    if(movement == "left") {
        if(this.x > init.player.movementAreaLimit.left) {
            this.x -= init.player.moveStep.left2Right;   
        }
    }else if (movement == "right") {
        if(this.x < init.player.movementAreaLimit.right) {
            this.x += init.player.moveStep.left2Right;
        }
    }else if (movement == "up") {
        if(this.y > init.player.movementAreaLimit.top) {
            this.y -= init.player.moveStep.top2Bottom;
        }else{
            this.x = init.player.position.x;
            this.y = init.player.position.y;
            alert(`You Win!Your score is ${this.score}  `);
            this.score = 100;
        }
    }else if (movement == "down") {
        if(this.y < init.player.movementAreaLimit.bottom) {
            this.y += init.player.moveStep.top2Bottom;
        }
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var allEnemies = [ 
    new Enemy(init.enemy.position.col1, init.enemy.position.row2, init.enemy.speed.slow, true),
    new Enemy(init.enemy.position.col1, init.enemy.position.row2, init.enemy.speed.slower, false),
    new Enemy(init.enemy.position.col1, init.enemy.position.row2, init.enemy.speed.faster, false),
    new Enemy(init.enemy.position.col1, init.enemy.position.row3, init.enemy.speed.slower, true),
    new Enemy(init.enemy.position.col1, init.enemy.position.row3, init.enemy.speed.fastest, false), 
    new Enemy(init.enemy.position.col1, init.enemy.position.row3, init.enemy.speed.slow, false),
    new Enemy(init.enemy.position.col1, init.enemy.position.row4, init.enemy.speed.slowest, true), 
    new Enemy(init.enemy.position.col1, init.enemy.position.row4, init.enemy.speed.faster, false), 
    new Enemy(init.enemy.position.col1, init.enemy.position.row4, init.enemy.speed.fast, false), 
];
// 用于选择玩家
function selectedPlayer(){
    var tempPlayer = prompt(`请选择玩家：\n 
                            1. char-boy;\n 
                            2. char-pink-girl;\n
                            3. char-cat-girl;\n
                            4. char-horn-girl;
                            `,`1`);
    if((tempPlayer != null) &&(tempPlayer != "")){
        switch(tempPlayer){
            case '1': return 'images/char-boy.png';break;
            case '2': return 'images/char-pink-girl.png';break;
            case '3': return 'images/char-cat-girl.png';break;
            case '4': return 'images/char-horn-girl.png';break;
       }
    }
}

// 把玩家对象放进一个叫 player 的变量里面
var player = new Player(init.player.position.x, init.player.position.y,selectedPlayer());

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});