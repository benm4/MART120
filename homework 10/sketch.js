var headX = 250;
var headY = 100;
var headDirection = 1;

var bodyX = 200;
var bodyY = 185;
var bodyDirection = 3;

var size = 22;
var count = 0;
var sizeDirection = 2;
function setup()
{
    createCanvas(500, 600);
}

function draw()
{
    background(12,45,78);
    textSize(22)
    text("hiiiiiiiiiii", 17,89);

    // head
    fill(227,218,201);
    circle(headX,headY,175);
    headX+=headDirection;
    if(headX >= 418 || headX <= 90)
    {
        headDirection *= -1;
    }

    // eyes
    strokeWeight(10);
    fill(0);
    point(200,75);
    point(285,75);

    // nose
    point(245,90);
    
    // mouth
    ellipse(245, 135, 30, 45)

    
    // body
    fill(10, 24, 120);
    rect(200,bodyY,100,150);
    bodyY += bodyDirection;
    if(bodyY <= 23 || bodyY >= 450 )
    {
        bodyDirection *= -1;
    }
    // decoration
    fill(255);
    triangle(220,320,250,220,280,320)
    // right arm
    fill(10, 24, 120);
    rect(300,195,50,10);
    // left arm
    rect(150,195,50,10);
    // left leg
    rect(200,335,10,50);
    // right leg
    rect(290,335,10,50);
    
    fill(120);
    textSize(size);
    size+= sizeDirection;
    count++;
    if(count > 5)
    {
        sizeDirection *=-2;
        count = 0;
    }
    text("benji mccrea",27,500 );


}