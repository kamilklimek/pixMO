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
                if(x>8 || (x==8 && _x > x))
                    x = _x;
            },

            setY : function(_y){
                if(y>=10)
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
        let objectSize = 50;
        let allObjects = [];
        let displayedObjects = [];
        let hero = new Character("Janusz", 10, 7);

        return {
            initializeDefaultBoard : function(){
                let textNr = 0;
                for(let i =0;i<cols;i++){
                    for(let j=0;j<rows;j++){
                        textNr = Math.round(Math.random()*5);
                        allObjects.push(new Field(j, i, textures[0][textNr]));
                    }
                }
            },

            checkFieldIsSeen : function(field){
                const fieldPosition = field.getPosition();
                const heroPosition = hero.getPosition();
                
                const isInRangeX = fieldPosition[0] <= 2*heroPosition[0] && fieldPosition[0] >= 0;
                const isInRangeY = fieldPosition[1] <= 2*heroPosition[1] && fieldPosition[1] >= 0;
                
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

                let col = 0;
                let row = 0;
                displayedObjects.forEach(el =>{
                    let field = new Image();
                    const positions = el.getPosition();
                    field.addEventListener("load", function(){
                        //canvasBoard.drawImage(field, 0, 0, 250, 250, positions[0]*objectSize, positions[1]*objectSize, objectSize, objectSize);
                        canvasBoard.drawImage(field, 0, 0, 250, 250, col*objectSize, row*objectSize, objectSize, objectSize);
                        if(col<=15   ) col++;
                        else{
                            row++;
                            col = 0;
                        }
                    })
                    field.src = el.getTexture();                    
                })
                let champ = new Image();
                const positionHero = [10, 5];
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
                        hero.setX(movementLeft);
                        break;

                        case 38: //up
                        let movementUp = y - 1;
                        hero.setY(movementUp);
                        break;

                        case 39: //right
                        let movementRight = x + 1;
                        hero.setX(movementRight);
                        break;

                        case 40: //down
                        let movementDown = y + 1;
                        hero.setY(movementDown);
                        break;
                    }
                    this.drawGame();
            }


        }
    }

    const board = new Board(300, 380);
    board.initializeDefaultBoard();
    board.calculateSeenFields();
    board.drawBoard();

    document.addEventListener("keydown",function(e){
        board.moveHero(e);
    });
    



})();