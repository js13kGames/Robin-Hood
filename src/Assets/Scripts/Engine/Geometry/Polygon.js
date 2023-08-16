export default class Polygon{
    constructor(center, radius, numVertices, outline = true, color = "red",drawangle = 0) {
        this.center = center;
        this.radius = radius;
        this.numVertices = numVertices;
        this.outline = outline;
        this.color = color;
        this.drawangle = drawangle;
        // Compute vertices
        const angleStep = (2 * Math.PI) / this.numVertices;
        this.vertices = [];
        for (let i = 0; i < this.numVertices; i++) {
            const angle = i * angleStep;
            const x = this.center.x + this.radius * Math.cos(angle);
            const y = this.center.y + this.radius * Math.sin(angle);
            this.vertices.push({ x, y });
        }
    }

    draw(ctx) {
        ctx.save(); // Save the current state of the context
        ctx.translate(this.center.x, this.center.y); // Move the context to the center of the triangle
        ctx.rotate(this.drawangle); // Rotate the context by the specified angle (in radians)
        ctx.translate(-this.center.x, -this.center.y); // Move the context back to the original position


        ctx.beginPath();
        ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
        for (let i = 1; i < this.numVertices; i++) {
            ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
        }
        ctx.closePath();

        if (this.outline) {
            ctx.strokeStyle = this.color;
            ctx.stroke();
        } else {
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        ctx.restore();
    }
}