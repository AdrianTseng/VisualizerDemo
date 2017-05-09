/**
 * Created by zqm on 17-5-5.
 */

let errorColor = "#FF0000";
let passColor = "#00FF00";
let warnColor = "#FF9100";
let standbyColor = "#FFFFFD";

class CaseElement {
    constructor(x, y, name){
        this.x = x;
        this.y = y;
        this.name = name;
        this.color = standbyColor;
    }

    setState(state){
        if(state.localeCompare("succeed") == 0){
            this.color = passColor;
        }else if(state.localeCompare("warning") == 0){
            this.color = warnColor;
        }else if(state.localeCompare("failed") == 0){
            this.color = errorColor;
        }else{
            this.color = standbyColor;
        }
    }

    updateState(name, state){
        if(name.localeCompare(this.name) == 0){
            this.setState(state);
        }
    }
}

class Semaphore extends CaseElement {
    constructor(x, y, name){
        super(x, y, name);
        this.radius = 21;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class Railway extends  CaseElement {
    constructor(x, y, name, x_end, y_end){
        super(x, y, name);
        this.x_end = x_end;
        this.y_end = y_end;
    }

    draw(ctx){
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x_end, this.y_end);
        ctx.closePath();
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}
