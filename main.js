(function(){
    const MAP = "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFGGHHHHGGHHHHGGHHHHGGGHHHHFFFFFGGHHHHGGHHHHGGHHHHGFGHHHHFFFFFGGHHHHGGHHHHGGHHHHGGGHHHHFFWWWGGGRGGGGGRGGGGGRGGGGGGRGGFFWWWGGGRRRRRRRRRRRRRRRRRRRRRRRRWWWGGGGGGGGGRGGGGGGGGGGGGGGGFFWWWGGGGGGGGGRGGGGGGGGGGGGGGGFFWWWGGGGGGGGRRRGGGGGGGGGGGGGGFFWWWGGGGGGGGRFRGGGGGGGGGGGGGGFFFFFGGGGGGGGRRRGGGGGGGGGGGGGGFFFFFGGGGGGGGGGGGGGGGGGGGGGGGGFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";

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
        ],

        trees = [
            "graphic/tree/tree_1.png"
        ]
    ];

    let PrototypeObject = function(_x, _y, _texture){
        let self = {};

        let x = _x;
        let y = _y;

        let texture = _texture;

        self.getPosition = function() {
            return [x, y];
        }

        self.getTexture = function() {
            return texture;
        }

        self.setX = function(_x) {
            x = _x;
        }

        self.setY = function(_y) {
            y = _y;
        }

        return self; 

    }

    let Hero = function(_name, _x, _y){
        let self = PrototypeObject(_x, _y, textures[1][0]);

        let name = _name;

        self.getName = function() {
            return name;
        }

        return self;
    }

    let Field = function(_x, _y, _texture){
        let self = PrototypeObject(_x, _y, _texture);

        return self;
    }

    let Obstacle = function(_x, _y, _texture){
        let self = PrototypeObject(_x, _y, _texture);

        return self;
    }

    let Board = function(_cols) {
        const canvasBoard = boardGame.getContext("2d");
        let cols = _cols;
        let rows = Math.round(documentHeight*_cols / documentWidth);


        let objectSize = documentWidth/_cols;
        let allObjects = [];
        let allObstacles = [];
        
        let hero = new Hero("Janusz", 5, 8);

        return {
            initializeDefaultBoard : function(){
                let indexOfMap = 0;
            
                for(let i = 0; i<rows; i++){
                    for(let j = 0; j<cols; j++){
                        const fieldIsWater = MAP[indexOfMap] === "W";
                        const fieldIsGrass = MAP[indexOfMap] === "G";
                        const fieldIsWay = MAP[indexOfMap] === "R";
                        const fieldIsForest = MAP[indexOfMap] === "F";
                        const fieldIsHouse = MAP[indexOfMap] === "H";

                        if(fieldIsWater){
                            let water = new Obstacle(j, i, textures[3][0]);
                            allObjects.push(water);
                            allObstacles.push(water);                        
                        }else if(fieldIsGrass){
                            let field = new Field(j, i, textures[0][1]);
                            allObjects.push(field);
                        }else if(fieldIsWay){
                            let way = new Field(j, i, textures[0][0]);
                            allObjects.push(way);
                        }else if(fieldIsForest){
                            let field = new Field(j, i, textures[0][1]);
                            let tree = new Obstacle(j, i, textures[4][0]);
                            allObjects.push(field);     
                            allObjects.push(tree);
                            allObstacles.push(tree);
                        }else if(fieldIsHouse){
                            let house = new Obstacle(j, i, textures[0][2]);
                            allObjects.push(house);
                            allObstacles.push(house);
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
                    let heroPosition = hero.getPosition();
                    let x = heroPosition[0];
                    let y = heroPosition[1];
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
        setTimeout(function(){
            board.moveHero(e);
        }, 125);
    });
    



})();