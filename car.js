class Car{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height= height;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;

        this.angle = 0;

        this.controls = new Controls();
    }

    update(){
        this.#move();
    }

    #move(){
        if(this.controls.foward){
            this.speed += this.acceleration;
        }
        if(this.controls.reversed){
            this.speed -= this.acceleration;
        }
        if(this.speed > this.maxSpeed){
            this.speed = this.maxSpeed;
        }
        if(this.speed < -this.maxSpeed/2){
            this.speed = -this.maxSpeed/2;
        }

        if(this.speed != 0){
            const flip = this.speed > 0 ? 1 : -1;
            if(this.controls.left){
                this.angle += 0.03*flip;
            }
            if(this.controls.right){
                this.angle -= 0.03*flip;
            }
        }

        if(this.speed > 0){
            this.speed -= this.friction;
        }
        if(this.speed < 0){
            this.speed += this.friction;
        }
        if(Math.abs(this.speed) < this.friction){
            this.speed = 0;
        }
        // move the car in the x/y direction using the angle and speed
        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed; 
    }

    draw(ctx){
        ctx.save(); // save the current state of the canvas
        ctx.translate(this.x, this.y); // move the canvas origin to the center of the car
        ctx.rotate(-this.angle); // rotate the canvas
        ctx.beginPath(); // start drawing
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        )
        ctx.fill();

        ctx.restore(); // restore the canvas to the previous state
    }
}