class Road{
    constructor(x, width, laneCount=3){
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = this.x - this.width/2;
        this.right = this.x + this.width/2;

        const inf = 1000000;
        this.top = -inf;
        this.bottom = inf;

        const topLeft = {x: this.left, y: this.top};
        const topRight = {x: this.right, y: this.top};
        const bottomLeft = {x: this.left, y: this.bottom};
        const bottomRight = {x: this.right, y: this.bottom};

        // segment borders
        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ]
    }

    /**
     * Returns the center of the lane at the given index 
     */
    getLaneCenter(laneIndex){
        const laneWidth = this.width/this.laneCount;
        return this.left + laneWidth/2 + laneIndex*laneWidth;
    }

    draw(ctx){
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'white'; 

        for(let i=1; i<=this.laneCount-1; i++){
            const x = lerp(this.left, this.right, i/(this.laneCount));
            ctx.lineWidth = 3;
            ctx.setLineDash([20, 20]); // TODO: 10px line, 10px space
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }

        ctx.setLineDash([]); 
        this.borders.forEach(border => {
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y); // first point
            ctx.lineTo(border[1].x, border[1].y); // second point
            ctx.stroke();
        });
    }
        
}
