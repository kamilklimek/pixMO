(function(){
    const MAP = 
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYYXXXXXYYYYY";



    const boardGame = document.getElementById("board");

    const documentWidth = document.body.clientWidth;
    const documentHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    
    boardGame.width = documentWidth;
    boardGame.height = documentHeight;

    const textures = [
        grounds = [
            "graphic/ground/dry_grass.png",
            "graphic/ground/grass_gray.png",
            "graphic/ground/grass_light.jpg",
            "graphic/ground/ground_1.jpg",
            "graphic/ground/grass_light.jpg",
            "graphic/ground/grass_gray.png",
            "graphic/ground/dry_grass.png"
        ],
        
        outfits = [
            "graphic/characters/person.png"
        ],

        obstacles = [
            "graphic/obstacles/stones.png"
        ],

        water = [
            "graphic/water/sea.jpg"
        ] 
    ]

    let Character = function(_name, _x, _y){
        let x = _x;
        let y = _y;
        let texture = textures[1][0];

        const name = _name;
        return {

            getPosition : function(){
                return [x,y];
            },

            setX : function(_x){
                x = _x;
            },

            setY : function(_y){
                y = _y;
            },

            getX : function(){
                return x;
            },

            getY : function(){
                return y;
            },

            getTexture : function() {
                return texture;
            }
        }
    }

    let Field = function(_x, _y, _texture){
        let x = _x;
        let y = _y;
        let texture = _texture;
        
        return {
            getPosition : function(){
                return [x,y];
            },

           
            setPosition : function(_x, _y){
                x = _x;
                y = _y;
            },

            getTexture : function() {
                return texture;
            }
        }
    }

    let Obstacle = function(_x, _y, _texture){
        let x = _x;
        let y = _y;
        let texture = _texture;
        
        return {
            getPosition : function(){
                return [x,y];
            },

           
            setPosition : function(_x, _y){
                x = _x;
                y = _y;
            },

            getTexture : function() {
                return texture;
            }
        }
    }


    let Board = function(_cols) {
        const canvasBoard = boardGame.getContext("2d");
        let cols = _cols;
        let rows = Math.round(documentHeight*_cols / documentWidth);


        let objectSize = documentWidth/_cols;
        let allObjects = [];
        let allObstacles = [];
        
        let hero = new Character("Janusz", 0, 4);

        return {
            initializeDefaultBoard : function(){
                let textNr = 0;
                /* for(let i =0;i<rows;i++){
                    for(let j=0;j<cols;j++){
                            textNr = Math.round(Math.random()*6);
                            allObjects.push(new Field(j, i, textures[0][textNr]));
                            if(i%7 == 0  && j%5 == 0 && i != 0){
                                let stone = new Obstacle(j, i, textures[2][0]);
                                allObjects.push(stone);
                                allObstacles.push(stone);
                            }
                    }
                } */

                let indexOfMap = 0;
                for(let i = 0; i<rows; i++){
                    for(let j = 0; j<cols; j++){
                        const fieldIsWater = MAP[indexOfMap] === "W";
                        const fieldIsGrass = MAP[indexOfMap] === "X";
                        const fieldIsSand = MAP[indexOfMap] === "Y";
                        if(fieldIsGrass){
                            allObjects.push(new Field(j, i, textures[0][3]));
                        }else if(fieldIsWater){
                            let water = new Obstacle(j, i, textures[3][0]);
                            allObjects.push(water);
                            allObstacles.push(water);
                        }else if(fieldIsSand){
                            allObjects.push(new Field(j, i, textures[0][0]));
                        }
                        indexOfMap++;
                    }
                }

            },

            checkHeroCanMove : function(x, y) {
                const heroIsNearEndX = x < 0 || x >= cols;
                const herOIsNearEndY = y < 0 || y >= rows;
                const collisionExists = !this.checkCollision(x, y);
                console.log(collisionExists);
                return !(heroIsNearEndX || herOIsNearEndY ) ^ collisionExists ? false : true;


            },

            checkCollision : function(x, y){
                let collision = 0;
                allObstacles.forEach(el => {
                    const obstaclePosition = el.getPosition();
                    const collisionExists = x === obstaclePosition[0] && y === obstaclePosition[1];
                    if(collisionExists){
                        collision++;
                    }
                })
                return collision > 0 ? true : false;
            },


            drawBoard : function(){
                allObjects.forEach(el =>{
                    let field = new Image();
                    const positions = el.getPosition();
                    
                    field.addEventListener("load", function(){
                        canvasBoard.drawImage(field, positions[0]*objectSize, positions[1]*objectSize, objectSize, objectSize);
                       // canvasBoard.drawImage(field,col*objectSize, row*objectSize, objectSize, objectSize);
                        
                      //  canvasBoard.fillText(positions, positions[0]*objectSize, positions[1]*objectSize);
                      //  canvasBoard.fillText(positions, col*objectSize, row*objectSize);
                      
                        
                    })
                    field.src = el.getTexture();                    
                })
                let champ = new Image();
                const positionHero = hero.getPosition();
                champ.addEventListener("load", function(){
                    canvasBoard.drawImage(champ, 0, 0, 250, 250, positionHero[0]*objectSize, positionHero[1]*objectSize, objectSize, objectSize);
                })
                champ.src = hero.getTexture();
            },

            drawGame : function(){

                this.drawBoard();
            },

            moveHero : function(e){
                    let x = hero.getX();
                    let y = hero.getY();
                    console.log(x,y);
                    switch(e.keyCode){
                        
                        case 37: //left
                        let movementLeft = x - 1;
                        if(this.checkHeroCanMove(movementLeft, y)){
                            hero.setX(movementLeft);
                        }
                        break;

                        case 38: //up
                        let movementUp = y - 1;
                        if(this.checkHeroCanMove(x, movementUp)){ 
                            hero.setY(movementUp);
                        }
                        break;

                        case 39: //right
                        let movementRight = x + 1;
                        if(this.checkHeroCanMove(movementRight, y)){
                            hero.setX(movementRight);
                        }
                        break;

                        case 40: //down
                        let movementDown = y + 1;
                        if(this.checkHeroCanMove(x, movementDown)){      
                            hero.setY(movementDown);
                        }
                        break;
                    }
                    this.drawGame();
            }


        }
    }

    const board = new Board(30);
    board.initializeDefaultBoard();
    board.drawBoard();

    document.addEventListener("keydown",function(e){
        board.moveHero(e);
    });
    



})();