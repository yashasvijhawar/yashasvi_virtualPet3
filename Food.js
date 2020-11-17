class Food {

   // preload() {
      //  milk = loadImage("Milk.png");
   // }

    constructor() {
        this.foodStock = 0;
        this.lastFed ;
        this.image = loadImage("milk.png");
    }    

    updateFoodStock(foodStock){
        this.foodStock=foodStock;
       }
    
       getFedTime(lastFed){
         this.lastFed=lastFed;
       }
    
       deductFood(){
         if(this.foodStock>0){
          this.foodStock=this.foodStock-1;
         }
        }
    
        getFoodStock(){
            
          return this.foodStock;
        }
    
        display(){
          textSize(20);
          fill("black");
          stroke(5);
          var Text = text("Food remaining: " + foodS, 165, 130);
        
          fill(255, 255, 254);
          textSize(15);
          if(lastFed>=12) {
            var Text1 = text("Last Fed: " + lastFed%12 + " PM", 350, 30);
          } else if(lastFed==0) {
            var Text2 = text("Last Feed : 12 AM", 350, 30);
          } else {
            var Text3 = text("Last Feed : " + lastFed + " AM", 350, 30);
          }
          var x=80,y=100;
          
          imageMode(CENTER);
          image(this.image,720,220,70,70);
          
          if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
              if(i%10==0){
                x=80;
                y=y+50;
              }
              image(this.image,x,y,50,50);
              x=x+30;
            }
          }
       
        }
        bedroom(){
          background(bedroomImg,550,550)
        }
  
        garden(){
          background(gardenImg,550,550)
        }

        washroom(){
          background(washroomImg,550,550)
        }
    }
     