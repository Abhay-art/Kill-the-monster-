const
Engine = Matter.Engine,
World = Matter.World,
Bodies = Matter.Bodies
Constraint = Matter.Constraint;

var engine, world;

var ground;

var superman, supermanConst, supermanImg;

var monster, monsterImg;

var boxes = [];

function preload()
{
  supermanImg = loadImage('superhero.png');
  monsterImg = loadImage('monster1.png');
}

function setup()
{
  createCanvas(1000, 750);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(350, 400, 1000, 10, 'gray');

  superman = new BaseClass(200, 150, 250, 125, 'white');
  superman.image = supermanImg;
  supermanConst = new BodyConstraint(superman.body, 100, 0.2, {x:0, y:0}, {x:200, y:50});

  monster = new BaseClass(750, 320, 150, 150, 'red');
  monster.image = monsterImg;

  for (var boxX = 420; boxX <= 580; boxX += 50)
  {
    for (var boxY = 375; boxY >= 15; boxY -= 50)
    {
      boxes.push(new BaseClass(boxX, boxY, 45, 45, [230, 100, 80]));
    }
  }

  Engine.run(engine);
}

function draw()
{
  background("skyblue");

  Matter.Body.setAngle(superman.body, superman.body.angle%(PI*2));

  Matter.Body.setAngularVelocity(superman.body, lerp(superman.body.angularVelocity, 0 - superman.body.angle, 0.002));
  superman.display();
  monster.display();

  ground.display();

  for (var box in boxes)
  {
    boxes[box].display();
  }

  fill('white');
  textSize(30);
  textAlign(CENTER);
  text('Press r to reset.', width/2, height*(4/5));
}

function mouseDragged()
{
  Matter.Body.setVelocity(superman.body, 
    {
      x:lerp(superman.body.velocity.x, mouseX - superman.body.position.x, 0.1),
      y:lerp(superman.body.velocity.y, mouseY - superman.body.position.y, 0.1)
    });
}

mousePressed = mouseDragged;

function keyPressed()
{
  if (keyCode == 82)
  {
    superman.reset();
    monster.reset();
    for (var box in boxes)
    {
      boxes[box].reset();
    }
  }
}