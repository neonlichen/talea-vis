class Walker {
    constructor(x,y,w,h, sticky) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.sticky = sticky;
    }

    //up = 0, down = 1, left = 2, right = 3
    move() {
        let curRand = parseInt(Math.random() * 4.0);
        //up
        if(curRand == 0 && this.y > 0) {
            this.y -= 1;
        }
        else if (curRand == 1 && this.y < (this.h  - 1)) {
            this.y += 1;
        }
        else if(curRand == 2 && this.x > 0 ) {
            this.x -= 1;
        }
        else if(curRand == 3 && this.x < (this.w - 1)) {
            this.x += 1;
        };
    }
    
    willStick() {
        let curRand = Math.random();
        if (curRand < this.sticky) {
            return true;
        }
        else {
            return false;
        };
    }

    //DLA.state, returns neighbor if canstick else null
    stickSim(stateArray) {
        let curx = this.x;
        let cury = this.y;
        let curw = this.w;
        let curh = this.h;
        let curStick = null;
        let walker = this;
        if(stateArray[curx][cury] != 1) {
            /*
            let neighbors = [[curx-1,cury], [curx+1, cury], 
                            [curx, cury-1], [curx, cury+1]];
            */
            let neighbors = [[curx-1,cury], [curx+1, cury], 
                            [curx, cury-1], [curx, cury+1],
                            [curx-1, cury-1],[curx-1, cury+1],
                            [curx+1, cury-1], [curx+1, cury+1]];
            neighbors.forEach(
                function([x,y]) {
                    if( x >= 0 && x < curw && y >=0 && y < curh) {
                        if(stateArray[x][y] == 1) {
                            let willStick = walker.willStick();
                            if(willStick) {
                            curStick = [x,y];
                            };
                        };
                    };
                });
        };
        //console.log(curStick);
        return curStick;
    }

}

class DLA {
    constructor(w, h, num, sticky, startx, starty) {
        this.w = w;
        this.h = h;
        this.num = num;
        this.sticky = sticky;
        this.startx = startx;
        this.starty = starty;
        this.state = Array.from(Array(w), () => Array.from({length: h}, () => 0));
        //this.state[startx][starty] = 1;
        this.walkers = [];
        for(let i =0 ;i < num; i++) {
            let xcur = parseInt(Math.random()*w);
            let ycur = parseInt(Math.random()*h);
            let wcur = new Walker(xcur,ycur,w,h,sticky);
            this.walkers.push(wcur);
        };
        this.state[startx][starty] = 1;
        //console.log(this.walkers);
    }

    generate(curColor, curMult) {
        while(this.walkers.length > 0) {
            for(let i = 0; i < this.walkers.length; i++) {
                let curWalker = this.walkers[i];
                let willStick = curWalker.stickSim(this.state);
                if(willStick != null) {
                        let wx = curWalker.x;
                        let wy = curWalker.y;
                        let nx = willStick[0];
                        let ny = willStick[1];
                        this.state[wx][wy] = 1;
                        stroke(curColor);
                        line(nx*curMult, ny*curMult, wx*curMult, wy*curMult);
                        delete this.walkers[i];
                }
                else {
                    this.walkers[i].move();
                };
            };
            //console.log(this.walkers.length);
            this.walkers = this.walkers.filter((x) => x != null);
        };
    }
}
