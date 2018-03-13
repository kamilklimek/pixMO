(function(){
    //consts
    const SIZE_OF_FIELD = 25;
    const HEIGHT_OF_DOCUMENT = document.body.scrollHeight;

    //initialize board
   // const board = document.createElement("div");
    //board.classList.add("board");
    //document.body.appendChild(board);

    function Field(positionX, positionY, imgBg){
        this.x = positionX;
        this.y = positionY;

        this.div = document.createElement("div");
        this.div.classList.add("field");
        this.div.style.backgroundImage = "url("+imgBg+")";
        this.div.style.width = 100 / SIZE_OF_FIELD + "%";
        this.div.style.height = HEIGHT_OF_DOCUMENT / SIZE_OF_FIELD + "px";
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

    const board = new Board(SIZE_OF_FIELD);

    for(let i =0;i<board.countOfElements; i++){
        for(let j=0;j<board.countOfElements;j++){
            board.addElementToBoard(new Field(j, i, "grass.jpg"));
        }
    }

    board.displayElements();
    

    



}())