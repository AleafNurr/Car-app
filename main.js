
const canvas = document.getElementById('canvas');
canvas.width = 200;

const ctx = canvas.getContext('2d'); // get 2d context

const road = new Road(canvas.width/2, canvas.width, 3);

const N = 1000;
const cars = generateCars(N);
let bestCar = cars[0]; // best will change, therefore we us let

if(localStorage.getItem('bestBrain')){
    for(let i = 0; i < cars.length; i++){
        cars[i].brain = JSON.parse(localStorage.getItem('bestBrain')); // use parse since localStorage only stores strings
        if(i != 0){ // mutate all but the first car
            NeuralNetwork.mutate(cars[i].brain, 0.2);
        }
    }
}

const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY"),
    new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY"),
    new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY"),
    new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY"),
    new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY"),
    new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY"),
    new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY"),
]; 

function generateCars(N){
    const cars = [];
    for(let i = 1; i < N; i++){
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI", 4));
    }
    return cars;
}

function save(){
    localStorage.setItem('bestBrain', JSON.stringify(bestCar.brain));
    // reload the page
    location.reload();
}

function discard(){
    localStorage.removeItem('bestBrain');
    location.reload();
}

animate();

function animate(){
    for(let i = 0; i < traffic.length; i++){
        traffic[i].update(road.borders, []);
    }
    for(let i = 0; i < cars.length; i++){
        cars[i].update(road.borders, traffic);
    }
    // find the car with the lowest (best) y value
    bestCar = cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)) // use spread since .min() only takes numbers
    )

    canvas.height = window.innerHeight; // reset the canvas height for every frame

    ctx.save();
    ctx.translate(0, -bestCar.y+canvas.height*0.7);
    
    road.draw(ctx);
    
    for(let i = 0; i < traffic.length; i++){
        traffic[i].draw(ctx, 'red');
    }
    ctx.globalAlpha = 0.2; 
    for(let i = 0; i < cars.length; i++){
        cars[i].draw(ctx, 'blue');
    }
    ctx.globalAlpha = 1;
    bestCar.draw(ctx, 'green', true);

    ctx.restore();
    requestAnimationFrame(animate); // calls animate() as fast as possible (60fps)
}