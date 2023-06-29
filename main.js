
const canvas = document.getElementById('canvas');
canvas.width = 200;

const ctx = canvas.getContext('2d'); // get 2d context

const road = new Road(canvas.width/2, canvas.width*0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50);
car.draw(ctx);

animate();

function animate(){
    car.update(road.borders);
    canvas.height = window.innerHeight; // reset the canvas height for every frame

    ctx.save();
    ctx.translate(0, -car.y+canvas.height*0.7);
    
    road.draw(ctx); 
    car.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate); // calls animate() as fast as possible (60fps)
}