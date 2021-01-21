let cw = 1200;
let ch = 800;
let dladiv = 2;
let num = 5000;
let sticky = 0.85;
let dla = new DLA(cw/dladiv, ch/dladiv, num, sticky, cw/(dladiv*2), 0);
let d = 1;

function polarToCart(radius, theta) {
    return [radius * Math.cos(theta), radius * Math.sin(theta)];
} 



function preload()
{

    //noStroke();
}

function setup()
{
    //console.log("bob");
    frameRate(24);
    createCanvas(cw,ch);
    background(255);
    stroke(0);
    fill(0);
    /*
    for(let i =0; i < cw/dladiv; i++){
        for(let j=0; j < ch/dladiv; j++) {
            let curState = dla.state[i][j];
            //console.log(curState);
            if(curState == 1) {
                circle(i*dladiv,j*dladiv,d);
            };
        };
    };
    */
    dla.generate(0, dladiv);
}


function draw()
{
    
     
}


function windowResized()
{
    /*
    resizeCanvas(windowWidth, windowHeight);
    cw = windowWidth;
    ch = windowHeight;
    */
}
