class BaseClass
{
    constructor(x, y, width, height, defaultColor)
    {
      var options = 
      {
          restitution:0.8,
          friction:1.0,
          density:1.0
      }

      this.initialX = x;
      this.initialY = y;

      this.body = Bodies.rectangle(x, y, width, height, options);
      this.width = width;
      this.height = height;
      this.image = null;
      this.color = defaultColor;
      World.add(world, this.body);
    }
    
    display()
    {
      if (this.image)
      {
        var angle = this.body.angle;
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);
        pop();
      }
      else
      {
        var angle = this.body.angle;
        push();
        translate(this.body.position.x, this.body.position.y);
        fill(this.color);
        rotate(angle);
        rectMode(CENTER);
        rect(0, 0, this.width, this.height);
        pop();
      }
    }
    
    reset()
    {
      Matter.Body.setVelocity(this.body, {x: 0, y: 0});
      Matter.Body.setPosition(this.body, {x: this.initialX, y: this.initialY});
      Matter.Body.setAngle(this.body, 0);
      Matter.Body.setAngularVelocity(this.body, 0);
    }
}