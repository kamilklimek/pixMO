(function(){
    //consts
    const COUNT_OF_ROWS = 20;
    const COUNT_OF_COLS = 20;

    const HEIGHT_OF_DOCUMENT = document.body.scrollHeight;
    let width = document.body.clientWidth;
    const proportion = width/ HEIGHT_OF_DOCUMENT;
    const DELAY_MOVEMENT = 250;
    
    function Textures(){
        this.grasses = [
            "graphic/ground/dry_grass.png",
            "graphic/ground/grass_gray.png",
            "graphic/ground/grass_light.jpg",
            "graphic/ground/grass_gray.png",
            "graphic/ground/grass_light.jpg",
            "graphic/ground/grass_gray.png",
            "graphic/ground/grass_light.jpg",
            "graphic/ground/grass_gray.png",
            "graphic/ground/grass_light.jpg",
            "graphic/ground/grass_gray.png",
            "graphic/ground/grass_light.jpg",
            "graphic/ground/dry_grass.png",
            "graphic/ground/dry_grass.png",
            "graphic/ground/dry_grass.png",
            "graphic/ground/grass_gray.png",
            "graphic/ground/grass_light.jpg"
        ];

        this.objs = [
            "graphic/obstacles/stones.png"
        ];

        this.countGrasses = this.grasses.length;

        this.grounds = [
            "graphic/ground/ground_1.jpg"
        ]

        this.characters = [
            "graphic/characters/person.png"
        ]
    }

    function Field(positionX, positionY, imgBg){
        this.x = positionX;
        this.y = positionY;

        this.div = document.createElement("div");
        this.div.classList.add("field");
        this.div.style.backgroundImage = "url("+imgBg+")";
        this.div.style.width = (1/25) * width + "px";
        this.div.style.height = (1/25)* width  + "px";
    }

    function Obstacle(positionX, positionY, imgBg){
        Field.call(positionX, positionY, imgBg);
    }

    function Character(name, size){
        this.name = name;
        this.x = 0;
        this.y = 0;

        this.div = document.createElement("div");
        this.div.classList.add("character");
        this.div.style.backgroundImage = "url("+textures.characters[0]+")";
        this.div.style.width =size + "px";
        this.div.style.height = size + "px";    
        
    }


    function Board(rows, cols, sizeField){
        this.countOfRows = rows;
        this.countOfCols = cols;
        const fields = [];
        const objects = [];
        const fieldSize = sizeField;
        this.char = new Character("Alfons", fieldSize);

        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("board");
        document.body.appendChild(this.wrapper);
        this.wrapper.appendChild(this.char.div);

        this.translateObject = function(obj, x, y){
            obj.div.style.transform = "translate(" + x*fieldSize  + "px, " + y*fieldSize + "px)";
        }

        this.moveCharacter = function(direction){
            if(direction == "right"){

                const ifIsNotEndOfMap = this.char.x < this.countOfCols;
                if(ifIsNotEndOfMap){
                    this.char.x++;
                    this.translateObject(this.char, this.char.x, this.char.y);
                }

            }else if(direction == "left"){

                const ifIsNotEndOfMap = this.char.x > 0;
                if(ifIsNotEndOfMap){
                    this.char.x--;
                    this.translateObject(this.char, this.char.x, this.char.y);
                }   

            }else if(direction == "down"){

                const ifIsNotEndOfMap = this.char.y < this.countOfRows;
                if(ifIsNotEndOfMap){
                    this.char.y++;
                    this.translateObject(this.char, this.char.x, this.char.y);
                }   

            }else if(direction == "up"){

                const ifIsNotEndOfMap = this.char.y > 0;
                if(ifIsNotEndOfMap){
                    this.char.y--;
                    this.translateObject(this.char, this.char.x, this.char.y);
                }   

            }
            
            
        }
    
        this.addElementToBoard = function(el){
            fields.push(el);
        }

        this.addObjectToBoard = function(el){
            objects.push(el);
        }
        
        this.displayElements = function(){
            fields.forEach(field =>{
                this.wrapper.appendChild(field.div);
            })
        }


    }
  

    const textures = new Textures();
    const board = new Board(COUNT_OF_ROWS, COUNT_OF_COLS, 1/25 * width);

    
    let t =1;
    for(let i =0;i<board.countOfRows; i++){
        for(let j=0;j<board.countOfCols;j++){
            board.addElementToBoard(new Field(j, i, textures.grasses[t] ));
            t+=Math.round(Math.cos(t*i)-Math.tan(t)+2);
            if(t >= textures.countGrasses) t = 1;
        }
    }

    //generate obstacles
    for(let i=0;i<5;i++){
        for(let j=0;j<8;j++){
            board.addObjectToBoard(new Obstacle(j, i, textures.objs[0]));
        }
    }


    const moveCharacter = function(e){

        switch(e.keyCode){

            case 37: //left arrow
                setTimeout(function(){
                    board.moveCharacter("left");
                }, DELAY_MOVEMENT);            
            break;

            case 38: //up arrow;
                setTimeout(function(){
                    board.moveCharacter("up");
                }, DELAY_MOVEMENT); 
            break;

            case 39: //right arrow;
                setTimeout(function(){
                    board.moveCharacter("right");
                }, DELAY_MOVEMENT);   
            break;

            case 40: //down arrow;
                setTimeout(function(){
                    board.moveCharacter("down");
                }, DELAY_MOVEMENT); 
            break;
            

        }

    }

    document.addEventListener("keydown", moveCharacter, false);

    board.displayElements();
    
    

  
    



}())