(function(){

    const rows = 125;
    const cols = 25;
    const canvastemp = document.getElementById("game");
		

    const grassColors = [
        '#3B5323',
        '#7CFC00',
        '#66CD00',
        '#4A7023',
        '#526F35'
    ];

    const waterColors = [
        '#2389da',
        '#0f5e9c',
        '#74ccf4'
    ]

    const movements = [
        'RIGHT',
        'LEFT',
        'TOP',
        'BOTTOM'
    ]

    const canMoveThrough = {
        'true' : 'true',
        'false' : 'false',
        'slowly' : 'slowly',
        'faster' : 'faster'
    }

    window.onload = function(){
        const canvas = document.getElementById("game");
		const board = new Board(canvas, 100, 100);
		board.start();
		
		const game = new Game(board);
        document.addEventListener("keydown", game.onKeyDown);
           
    }


    // OBJECTS
    function Primitive(_x, _y){
        this.x = _x;
        this.y = _y;
        this.size = 50;
    }
	
	function Field(_x, _y, _color){
        Primitive.call(this, _x, _y);
        this.color = _color;

        this.update = function(direction){
            switch(direction){

                case "RIGHT":
                    this.x++;
                    break;
                

                case "LEFT":
                    this.x--;
                    break;
                
                case "TOP":
                    this.y++;
                    break;
                
                case "BOTTOM":
                    this.y--;
                    break;
                

            }

        }

        this.draw = function(ctx){
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }


    }

    function Obstacle(_x, _y, _color, _moveThrough){
        Field.call(this, _x, _y, _color);

        this.canMoveThrough = _moveThrough;


    }

    function Player(_x, _y, _texture){
        Primitive.call(this, _x, _y);
        this.texture = _texture;

        const positionCenterX = 13;
        const positionCenterY = 6;
        const size = this.size;

        this.update = function(direction){

            switch(direction){

                case "RIGHT":
                    this.x++;
                    break;
                

                case "LEFT":
                    this.x--;
                    break;
                
                case "TOP":
                    this.y++;
                    break;
                
                case "BOTTOM":
                    this.y--;
                    break;
                

            }

        }

        this.draw = function(ctx){
            ctx.save();
            ctx.rotate(100);
            const positionToDraw = {
                x: positionCenterX * this.size,
                y: positionCenterY * this.size
            
            };
            let img = new Image();
            img.addEventListener("load", function(){
                ctx.drawImage(img, 0, 0, 250, 250, positionToDraw.x, positionToDraw.y, size, size);
        
            })
            img.src = this.texture;
            ctx.restore();

           
        }


    }

    function Board(_canvas, _cols, _rows){
		this.cols = _cols;
		this.rows = _rows;
		this.canvas = _canvas;
		this.ctx = _canvas.getContext("2d");
		
		const fieldSize = 50;
		this.fields = [];
		const player = new Player(2, 2, "person.png");
		
		this.initFields = function() {
			for(let i=0;i<this.cols;i++){
				for(let j = 0;j<this.rows;j++){
                    const left = j < 13;
                    const right = j > this.rows - 16;
                    const top = i < 6;
                    const bottom = i > this.cols - 7;
                    if(left || right || top || bottom){
                        const color = randomColor(waterColors );
					    const water = new Obstacle(j, i, color, canMoveThrough['false']);
					    this.fields.push(water);
                    }else{
                        const color = randomColor(grassColors);
					    const field = new Field(j, i, color);
					    this.fields.push(field);
                    }
				}
			}
		}  
		
		this.clear = function(){
			this.ctx.clearStyle = "black";
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
		
		this.initCanvas = function(){
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;

			this.ctx.fillStyle = "black";
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}
		
		this.start = function(){
			this.initFields();
			this.initCanvas();
			this.updateBoard();
		}
		
		this.updateBoard = function(){
            this.clear();
            this.fields.forEach(element =>{
				element.draw(this.ctx);
            
            
            });
			player.draw(this.ctx);
        }

        const checkCollision = function(_x, _y){
            this.fields.forEach(el =>{
                if(el.x == _x && el == _y && el instanceof Obstacle){
                   return el.canMoveThrough == canMoveThrough['false'] ? false : true;
                }
            })


        }

		
		
	}
	
	function Game(_board){
		const board = _board;
	
		this.onKeyDown = function(e){
			const key = e.keyCode;
			switch(key){

                case 37:
					board.fields.forEach(element =>{
						element.update(movements[0]);
                    })       
					break;

				case 38:
                    board.fields.forEach(element =>{
                    element.update(movements[2]);
					})        
					break;

				case 39:
                    board.fields.forEach(element =>{
                    element.update(movements[1]);
					})        
					break;

				case 40:
                    board.fields.forEach(element =>{
                    element.update(movements[3]);
					})        
				break;

            }
            board.updateBoard();
		}
    
	}
	
	
    

  

    const randomIntFromRange = function(min, max){
        return Math.floor(Math.random() * (max-min+1)+min);
    }

    const randomColor = function(colors){
        const indexColor = randomIntFromRange(0, colors.length-1);
        return colors[indexColor];
    }


    

   

   



}());