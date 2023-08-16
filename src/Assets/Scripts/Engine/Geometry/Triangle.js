export default class Triangle {
    constructor(center, radius, outline = true, color = "red",drawangle = 0) {
        this.center = center;
        this.radius = radius;
        this.outline = outline;
        this.color = color;
        this.drawangle = drawangle;
        // Compute vertices
        const angle = (2 * Math.PI) / 3;
        this.vertex1 = {
            x: this.center.x + this.radius * Math.cos(0),
            y: this.center.y + this.radius * Math.sin(0),
        };
        this.vertex2 = {
            x: this.center.x + this.radius * Math.cos(angle),
            y: this.center.y + this.radius * Math.sin(angle),
        };
        this.vertex3 = {
            x: this.center.x + this.radius * Math.cos(angle * 2),
            y: this.center.y + this.radius * Math.sin(angle * 2),
        };
    }
    draw(ctx) {
        ctx.save(); // Save the current state of the context
        ctx.translate(this.center.x, this.center.y); // Move the context to the center of the triangle
        ctx.rotate(this.drawangle); // Rotate the context by the specified angle (in radians)
        ctx.translate(-this.center.x, -this.center.y); // Move the context back to the original position

        ctx.beginPath();
        ctx.moveTo(this.vertex1.x, this.vertex1.y);
        ctx.lineTo(this.vertex2.x, this.vertex2.y);
        ctx.lineTo(this.vertex3.x, this.vertex3.y);
        ctx.closePath();

        if (this.outline) {
            ctx.strokeStyle = this.color;
            ctx.stroke();
        } else {
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        ctx.restore(); // Restore the saved state of the context
    }
}