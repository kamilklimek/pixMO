(function(){
    //consts
    const COUNT_OF_ELEMENTS = 18;
    const HEIGHT_OF_DOCUMENT = document.body.scrollHeight;
    let width = document.body.clientWidth;
    const proportion = width/ HEIGHT_OF_DOCUMENT;
    
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

    function Board(countEl){
        this.countOfElements = countEl;
        const fields = [];

        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("board");
        document.body.appendChild(this.wrapper);
    
        this.addElementToBoard = function(el){
            fields.push(el);
        }
        
        this.displayElements = function(){
            fields.forEach(field =>{
                this.wrapper.appendChild(field.div);
            })
        }
    }

    function Character(name){
        this.name = name;
        this.x = 0;
        this.y = 0;

        this.div = document.createElement("div");
        this.div.classList.add("character");
        this.div.style.backgroundImage = "url("+textures.characters[0]+")";
        this.div.style.width = 1/25 * width + "px";
        this.div.style.height = 1/25 * width  + "px";

        this.moveX = function(){
            this.div.style.transform = "translate(25px)";
            this.x = this.div.style.transform.value;
            console.log(this.x);
            this.y +=1;
            console.log(this.y);

        }
    }


    const textures = new Textures();
    const board = new Board(COUNT_OF_ELEMENTS);

    
    let t =1;
    for(let i =0;i<board.countOfElements; i++){
        for(let j=0;j<board.countOfElements;j++){
            board.addElementToBoard(new Field(j, i, textures.grasses[t] ));
            t+=Math.round(Math.cos(t*i)-Math.tan(t)+2);
            if(t >= textures.countGrasses) t = 1;
        }
    }

    board.displayElements();
    const char = new Character("hi");
    board.wrapper.appendChild(char.div);
    
    char.moveX();
    char.moveX();
    char.moveX();
    char.moveX();
    char.moveX();
    char.moveX();
    char.moveX();
    



}())