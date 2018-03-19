(function(){
    const boardGame = document.getElementById("board");
    
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

   /*
    const textures = {
        grounds: {
            0 : "graphic/ground/dry_grass.png",
            1 : "graphic/ground/grass_gray.png",
            2 : "graphic/ground/grass_light.jpg",
            3 : "graphic/groundground_1.jpg"
        },

        outfits: {
            0 : "graphic/characters/person.png"
        },

        obstacles: {
            0 : "graphic/obstacles/stones.png"
        }
    }
   */


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
               //if(x>8 || (x==8 && _x > x))
                    x = _x;
            },

            setY : function(_y){
                //if(y>7 || (y==7 && _y > y))
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


    let Board = function(_cols, _rows) {
        const canvasBoard = boardGame.getContext("2d");
        let cols = _cols;
        let rows = _rows;
        
        let colsToSee = 20;
        let rowsToSee = 14;

        let objectSize = 50;
        let allObjects = [];
        let displayedObjects = [];
        
        let hero = new Character("Janusz", 10, 9);

        return {
            initializeDefaultBoard : function(){
                let textNr = 0;
                for(let i =0;i<rows;i++){
                    for(let j=0;j<cols;j++){
                            textNr = Math.round(Math.random()*6);
                            allObjects.push(new Field(j, i, textures[0][textNr]));
                       
                    }
                }
            },

            checkHeroCanMove : function(x, y) {
                const heroIsNearEndX = x < 8 || x > _cols-8;
                const herOIsNearEndY = y < 8 || y > _rows-8
                
                return heroIsNearEndX || herOIsNearEndY ? false : true;


            },

            checkFieldIsSeen : function(field){
                const fieldPosition = field.getPosition();
                const heroPosition = hero.getPosition();
                
                const isInRangeX = fieldPosition[0] <= heroPosition[0] + colsToSee / 2 + 1  && fieldPosition[0] >= heroPosition[0]- colsToSee / 2;
                const isInRangeY = fieldPosition[1] <= heroPosition[1] + rowsToSee / 2   && fieldPosition[1] >= heroPosition[1] - rowsToSee / 2;
                
                return isInRangeX && isInRangeY ? true : false;
                
            },

            calculateSeenFields : function(){
                displayedObjects = [];
                allObjects.forEach(el =>{
                    if(this.checkFieldIsSeen(el)){
                        displayedObjects.push(el);
                    }
                })

            },

            drawBoard : function(){
                canvasBoard.clearRect(0, 0, 1000, 700);
                canvasBoard.beginPath();
                canvasBoard.font = '17px serif';

                let col = 0;
                let row = 0;
                displayedObjects.sort(function(a, b){
                    const positionA = a.getPosition();
                    const positionB = b.getPosition();
                    
                    if(positionA[1] < positionB[1]){
                        return -1;
                    }else if(positionA[1] > positionB[1]){
                        return 1;
                    }else{
                        
                        if(positionA[0] < positionB[0]){
                            return -1;
                        }else if(positionA[0] > positionB[0]){
                            return 1;
                        }else{
                            return 0;
                        }
                    }

                    return 0;
                });
                displayedObjects.forEach(el =>{
                    let field = new Image();
                    const positions = el.getPosition();
                    
                    field.addEventListener("load", function(){
                       // canvasBoard.drawImage(field, positions[0]*objectSize, positions[1]*objectSize, objectSize, objectSize);
                        canvasBoard.drawImage(field,col*objectSize, row*objectSize, objectSize, objectSize);
                        
                      //  canvasBoard.fillText(positions, positions[0]*objectSize, positions[1]*objectSize);
                      //  canvasBoard.fillText(positions, col*objectSize, row*objectSize);
                      
                        if(col<=20)col++;
                        else{
                            row++;
                            col=0;
                        };
                    })
                    field.src = el.getTexture();                    
                })
                let champ = new Image();
                const positionHero = [10, 9];
                champ.addEventListener("load", function(){
                    canvasBoard.drawImage(champ, 0, 0, 250, 250, positionHero[0]*objectSize, positionHero[1]*objectSize, objectSize, objectSize);
                })
                champ.src = "graphic/characters/person.png";
            },

            drawGame : function(){

                this.calculateSeenFields();
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
                        }else{
                            console.log("Dalej nie moge");
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

    const board = new Board(40, 22);
    board.initializeDefaultBoard();
    board.calculateSeenFields();
    board.drawBoard();

    document.addEventListener("keydown",function(e){
        board.moveHero(e);
    });
    



})();