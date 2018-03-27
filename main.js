(function(){
    const MAP = "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFGGHHHHGGHHHHGGHHHHGGGHHHHFFFFFGGHHHHGGHHHHGGHHHHGFGHHHHFFFFFGGHHHHGGHHHHGGHHHHGGGHHHHFFWWWGGGRGGGGGRGGGGGRGGGGGGRGGFFWWWGGGRRRRRRRRRRRRRRRRRRRRRRRRWWWGGGGGGGGGRGGGGGGGGGGGGGGGFFWWWGGGGGGGGGRGGGGGGGGGGGGGGGFFWWWGGGGGGGGRRRGGGGGGGGGGGGGGFFWWWGGGGGGGGRFRGGGGGGGGGGGGGGFFFFFGGGGGGGGRRRGGGGGGGGGGGGGGFFFFFGGGGGGGGGGGGGGGGGGGGGGGGGFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";

    const boardGame = document.getElementById("board");
    const infoHero = document.getElementById("heroInfo");

    const documentWidth = document.body.clientWidth;
    const documentHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    
    boardGame.width = 0.85 * documentWidth;
    boardGame.height = documentHeight;

    infoHero.width = 0.15 * documentWidth;
    infoHero.height = documentHeight;

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
        ],

        swords = [
            "graphic/equipments/swords/mercenary.svg"
        ],

        boots = [
            "graphic/equipments/boots/golden.svg"
        ],

        shields = [
            "graphic/equipments/shields/wooden.svg"
        ],

        helmets = [
            "graphic/equipments/helmets/viking.svg"
        ],

        legs = [
            "graphic/equipments/legs/leather.svg"
        ],

        armors = [
            "graphic/equipments/armors/chain.svg"
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
        let hp = 100;
        let level = 1;
        
        let helmet, legs, shield, sword, boots, armor;

        self.setHelmet = function(_helmet) {
            helmet = _helmet;
        }

        self.setArmor = function(_armor){
            armor = _armor;
        }

        self.setLegs = function(_legs){
            legs = _legs;
        }

        self.setShield = function(_shield){
            shield = _shield;
        }

        self.setSword = function(_sword){
            sword = _sword;
        }

        self.setBoots = function(_boots){
            boots = _boots;
        }

        self.getArmor = function() {
            return armor;
        }

        self.getHelmet = function(){
            return helmet;
        }

        self.getBoots = function(){
            return boots;
        }
        
        self.getLegs = function(){
            return legs;
        }

        self.getShield = function(){
            return shield;
        }

        self.getSword = function(){
            return sword;
        }

        self.getName = function() {
            return name;
        }

        self.getHp = function() {
            return hp;
        }

        self.getLevel = function() {
            return level;
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

    let Item = function(_x, _y, _texture, _itemName){
        let self = PrototypeObject(_x, _y, _texture);

        let itemName = _itemName;
        let isOnGround = false;


        self.getItemName = function() {
            return itemName;
        }

        self.getIsOnGround = function() {
            return isOnGround;
        }

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

            getHero : function() {
                return hero;
            },

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


                const positionHero = hero.getPosition();
                let champ = new Image();
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

    let InfoHero = function() {
        const canvas = infoHero.getContext("2d");

        return {

            drawInfoHero : function(hero){
                const heroName = hero.getName();
                const heroHP = hero.getHp();
                const heroLevel = hero.getLevel();
                const heroHpPercent = heroHP * (infoHero.width-50) / 100;


                let row = 1;
                
                canvas.font = 'bold 20pt Arial';
                canvas.fillStyle = 'white';
                
                canvas.fillText(heroName, 25, row++ * 40);
                
                canvas.fillText("Level: " + heroLevel, 25, row++ * 40);

                canvas.fillStyle = 'green';
                canvas.fillRect(25, row++ * 35, heroHpPercent, 15);

                let helmet = new Image();
                helmet.addEventListener("load", function(){
                    canvas.drawImage(helmet, infoHero.width/2 - 35, 125, 75, 75);
                               
                })
                helmet.src = hero.getHelmet().getTexture();

                let sword = new Image();
                sword.addEventListener("load", function(){
                    canvas.drawImage(sword, infoHero.width-85, 200, 75, 75);
                               
                })
                sword.src = hero.getSword().getTexture();

                let legs = new Image();
                legs.addEventListener("load", function(){
                    canvas.drawImage(legs, infoHero.width/2 - 35, 275, 75, 75);
                               
                })
                legs.src = hero.getLegs().getTexture();

                let shield = new Image();
                shield.addEventListener("load", function(){
                    canvas.drawImage(shield, 20, 200, 75, 75);
                               
                })
                shield.src = hero.getShield().getTexture();

                let boots = new Image();
                boots.addEventListener("load", function(){
                    canvas.drawImage(boots, infoHero.width/2 - 30, 350, 75, 75);
                               
                })
                boots.src = hero.getBoots().getTexture();
            
                let armor = new Image();
                armor.addEventListener("load", function(){
                    canvas.drawImage(armor, infoHero.width/2 - 35, 195, 75, 75);
                               
                })
                armor.src = hero.getArmor().getTexture();
            
            

            }

        }


    }

    const board = new Board(30);
    board.initializeDefaultBoard();
    board.drawBoard();

    hero = board.getHero();
    hero.setHelmet(new Item(-1, -1, textures[8][0], "Viking Helmet"));
    hero.setSword(new Item(-1, -1, textures[5][0], "Mercenary Sword"));
    hero.setBoots(new Item(-1, -1, textures[6][0], "Golden boots"));
    hero.setLegs(new Item(-1, -1, textures[9][0], "Leather legs"));
    hero.setShield(new Item(-1, -1, textures[7][0], "Wooden shield"));
    hero.setArmor(new Item(-1, -1, textures[10][0], "Chain armor"));

    const info = new InfoHero();
    info.drawInfoHero(board.getHero());


    document.addEventListener("keydown",function(e){
        setTimeout(function(){
            board.moveHero(e);
        }, 125);
    });

    



})();