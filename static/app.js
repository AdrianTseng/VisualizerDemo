/**
 * Created by zqm on 17-5-5.
 */

var errorColor = "#FF0000";
var passColor = "#00FF00";
var warnColor = "#FF6100";
var standbyColor = "#FFFFCD";

var ball = {
  radius: 25,
  draw: function(x, y, ctx, color) {
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }
};

var line = {
    height: 4,
    draw: function (x, y, width, ctx, color) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x + width, y + this.height);
        ctx.lineTo(x, y + this.height);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }
};

var app = new Vue({
    el: '#app',
    data: {
        step: 0,
        animatedFrame: null
    },
    directives: {
        updateProgress: function (canvasElement, binding) {
            function updateFrame() {
                var canvas = document.getElementById("process");
                canvas.width = 640;
                canvas.height = 400;
                var ctx = canvas.getContext("2d");

                if(binding.value == 0) {
                    ball.draw(230, 25, ctx, standbyColor);
                    line.draw(265, 23, 120, ctx, standbyColor);
                    ball.draw(420, 25, ctx, standbyColor);
                }else if(binding.value == 1){
                    ball.draw(230, 25, ctx, passColor);
                    line.draw(265, 23, 120, ctx, standbyColor);
                    ball.draw(420, 25, ctx, standbyColor);
                }
                else if(binding.value == 2){
                    ball.draw(230, 25, ctx, passColor);
                    line.draw(265, 23, 120, ctx, warnColor);
                    ball.draw(420, 25, ctx, standbyColor);
                }
                else if(binding.value == 3){
                    ball.draw(230, 25, ctx, passColor);
                    line.draw(265, 23, 120, ctx, warnColor);
                    ball.draw(420, 25, ctx, errorColor);
                }
            }

            this.animatedFrame = window.requestAnimationFrame(updateFrame);
        }
    },
    watch: {
        step: function () {
            console.log("step is " + this.step);
        }
    },
    methods: {
        update: function () {
            this.step += 1;
            if(this.step > 3){
                this.step = 0;
            }
        }
    }
});
