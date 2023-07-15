$(function () {
    var sim = new Eng();
});

let Eng = function () {
    this.canvas = document.getElementById('chandrayaan');
    this.c = document.getElementById('chandrayaan').getContext('2d');
    this.timestep = 16;
    this.physicsTimestep = 16;
    this.physicsTimeout = true
    this.gravity = 0.24;
    this.maxSize = 13;
    this.baseSize = 5;
    this.keyDown = {
        up: false
    };
    this.height = 200;
    this.rocket = {
        acceleration: 0,
        pos: {
            y: this.height,
            x: 300
        }
    };
    this.exhaust = [];
    this.loop = function () {
        this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.updatePhysics();
        this.updateLocations();
        this.draw();

        setTimeout($.proxy(function () {
            this.loop();
        }, this), this.timestep);
    }

    this.updateLocations = function () {
        this.rocket.pos.y = this.rocket.pos.y + this.rocket.acceleration;
    }

    this.updatePhysics = function () {
        if (this.physicsTimeout === true) {

            this.createExhaust();
            this.accelerate();
            if (this.keyDown.up === true) {
            }

            this.physicsTimeout = false;
            if (this.rocket.acceleration < 2) {
                this.rocket.acceleration = this.rocket.acceleration + 0.108;
            }

            if (this.rocket.pos.y > this.height) {
                this.rocket.acceleration = 0;
                this.rocket.pos.y = this.height;
            }

            setTimeout($.proxy(function () {
                this.physicsTimeout = true;
            }, this), this.physicsTimestep);
        }
    }

    this.createExhaust = function () {
        this.exhaust.push({
            eng: this,
            size: 20,
            lastSize: 20,
            lastOpacity: 0.3,
            step: 0,
            direction: 0,
            lastX: this.rocket.pos.x,
            lastY: this.rocket.pos.y - 10,
            color: 'rgba(255, 255, 255, 1)',
            draw: function () {
                if (this.step < 1000) {
                    this.step++;

                    this.eng.c.beginPath();
                    var xDist = 2;
                    var color = Math.floor(220 - (this.step / 1.7));

                    if (this.direction === 0 && this.lastY > this.eng.height + 5) {
                        this.direction = 0.4;
                        if (Math.random() > 0.4) {
                            this.direction = -0.4;
                        }
                    }

                    var y = this.lastY;
                    if (this.lastY > this.eng.height + 5) {
                        xDist = this.step;
                    } else if (this.step < 300) {
                        y = this.lastY + 1;
                    }

                    this.lastY = y;

                    if (this.step < 10) {
                        y = y + 8;
                        var x = this.eng.rocket.pos.x + (Math.random() * 2 - 3 / 2);
                        var size = this.size * (0.02 * Math.abs(this.step - 10));

                        var glowSize = size * 2 * ((Math.random() / 5) + 1);
                        this.eng.c.arc(x, y, glowSize, 0, 2 * Math.PI, false);

                        var gradient = this.eng.c.createRadialGradient(x, y, glowSize, x, y, glowSize / 2);
                        var color = Math.floor(255 * Math.random());
                        gradient.addColorStop(0, 'rgba(255, ' + color + ', 0, 0');
                        gradient.addColorStop(1, 'rgba(255, ' + color + ', 0, ' + (Math.floor(((1 - this.step / 255) - 0.3) * 2) / 10) + ')');

                        this.eng.c.fillStyle = gradient;
                        this.eng.c.fill();

                        this.eng.c.beginPath();

                        this.eng.c.arc(x, y, size, 0, 2 * Math.PI, false);

                        var gradient = this.eng.c.createRadialGradient(x, y, size, x, y, size / 2);
                        gradient.addColorStop(0, 'rgba(255, 238, 0, 0');
                        gradient.addColorStop(1, 'rgba(255, 238, 0, ' + Math.floor(((1 - this.step / 255) - 0.3) * 10) / 10 + ')');

                        this.eng.c.fillStyle = gradient;
                        this.eng.c.fill();
                    } else if (this.step < 15) {

                        var x = this.eng.rocket.pos.x + (Math.random() * 2 - 3 / 2);
                        var size = this.size * (0.009 * this.step);

                        var glowSize = size * 1.8 * ((Math.random() / 5) + 1);
                        this.eng.c.arc(x, y, glowSize, 0, 2 * Math.PI, false);

                        var gradient = this.eng.c.createRadialGradient(x, y, glowSize, x, y, glowSize / 2);
                        var color = Math.floor(255 * Math.random());
                        gradient.addColorStop(0, 'rgba(255, ' + color + ', 0, 0');
                        gradient.addColorStop(1, 'rgba(255, ' + color + ', 0, ' + (Math.floor(((1 - this.step / 255) - 0.3) * 2) / 10) + ')');

                        this.eng.c.fillStyle = gradient;
                        this.eng.c.fill();

                        this.eng.c.beginPath();

                        this.eng.c.arc(x, y, size, 0, 2 * Math.PI, false);

                        var gradient = this.eng.c.createRadialGradient(x, y, size, x, y, size / 2);
                        gradient.addColorStop(0, 'rgba(255, 238, 0, 0');
                        gradient.addColorStop(1, 'rgba(255, 238, 0, ' + Math.floor(((1 - this.step / 255) - 0.5) * 10) / 10 + ')');

                        this.eng.c.fillStyle = gradient;
                        this.eng.c.fill();
                    } else if (this.step < 260) {
                        var x = this.lastX + this.direction + ((Math.random() - 0.5) * 1.3);
                        this.lastX = x;

                        if (y > this.eng.height && this.step < 100) {
                            y = y - (Math.random() * 3);
                        }

                        var size = this.size * (0.008 * this.step);
                        var opacity = Math.floor(((1 - this.step / 500) - 0.2) * 10) / 10;

                        this.eng.c.arc(x, y, size, 0, 2 * Math.PI, false);

                        var gradientGlow = this.eng.c.createRadialGradient(x, y - (size / 2), size, x, y - (size / 2), size / 2);
                        var glowColor = Math.floor(255 * Math.random());
                        gradientGlow.addColorStop(0, 'rgba(255, 157, 0, 0');
                        gradientGlow.addColorStop(1, 'rgba(255, 157, 0, ' + (Math.floor(((1 - this.step / 255) - 0.3) * 4) / 10) + ')');

                        var gradient = this.eng.c.createRadialGradient(x, y, size, x, y, size / 2);
                        gradient.addColorStop(0, 'rgba(' + color + ', ' + color + ', ' + color + ', 0');
                        gradient.addColorStop(1, 'rgba(' + color + ', ' + color + ', ' + color + ', ' + opacity + ')');
                        this.lastSize = size;

                        this.eng.c.fillStyle = gradient;
                        this.eng.c.fill();

                        this.eng.c.fillStyle = gradientGlow;
                        this.eng.c.fill();
                    } else {
                        var x = this.lastX;

                        var size = this.lastSize + 0.01 + (Math.abs(x - this.eng.rocket.pos.x) * 0.0001);
                        this.lastSize = size;
                        var opacity = Math.floor((this.lastOpacity - 0.005) * 10000) / 10000;
                        this.lastOpacity = opacity;

                        this.eng.c.arc(x, y, size, 0, 2 * Math.PI, false);
                        //this.eng.c.fillStyle = 'rgba('+this.step+', '+this.step+', '+this.step+', ' + ((1 - this.step/500)-0.2) + ')';
                        var gradient = this.eng.c.createRadialGradient(x, y, size, x, y, size / 2);
                        gradient.addColorStop(0, 'rgba(' + color + ', ' + color + ', ' + color + ', 0');
                        gradient.addColorStop(1, 'rgba(' + color + ', ' + color + ', ' + color + ', ' + opacity + ')');

                        this.eng.c.fillStyle = gradient;
                        this.eng.c.fill();
                    }
                }
            }
        });

    }

    this.draw = function () {
        for (i = 0; i < this.exhaust.length; i++) {
            this.exhaust[i].draw();
        }

        this.c.beginPath();
        this.c.moveTo(this.rocket.pos.x, this.rocket.pos.y);
        this.c.lineTo(this.rocket.pos.x, this.rocket.pos.y - 40);
        this.c.strokeStyle = 'rgba(255, 255, 255, 1)';
        this.c.lineWidth = 6;
        this.c.stroke();

        this.c.beginPath();
        this.c.moveTo(this.rocket.pos.x - 3, this.rocket.pos.y);
        this.c.lineTo(this.rocket.pos.x - 3, this.rocket.pos.y - 10);
        this.c.strokeStyle = 'rgba(255, 255, 255, 1)';
        this.c.lineWidth = 2;
        this.c.stroke();

        this.c.beginPath();
        this.c.moveTo(this.rocket.pos.x + 3, this.rocket.pos.y);
        this.c.lineTo(this.rocket.pos.x + 3, this.rocket.pos.y - 10);
        this.c.strokeStyle = 'rgba(255, 255, 255, 1)';
        this.c.lineWidth = 2;
        this.c.stroke();

        this.c.beginPath();
        this.c.arc(this.rocket.pos.x, this.rocket.pos.y - 40, 2, 0, 2 * Math.PI, false);
        this.c.fillStyle = 'rgba(255, 255, 255, 1)';
        this.c.fill();
    }

    this.accelerate = function () {
        this.rocket.acceleration = this.rocket.acceleration - 0.11;
    }

    this.turn = function (left) {
        if (left) {
            for (r = 0; r < this.car.wheels.length; r++) {
                this.car.wheels[r].pos.x = this.car.wheels[r].pos.x - 1;
            }
        } else {
            for (r = 0; r < this.car.wheels.length; r++) {
                this.car.wheels[r].pos.x = this.car.wheels[r].pos.x + 1;
            }
        }
    }

    $(document).bind('keydown', $.proxy(function (e) {
        key = e.keyCode;
        if (key == 37) {
            //this.turn(true);
        } else if (key == 38) {
            this.keyDown.up = true;
        } else if (key == 39) {
            //this.turn();
        } else if (key == 40) {
            //this.accelerate();
        }
    }, this));

    $(document).bind('keyup', $.proxy(function (e) {
        key = e.keyCode;
        if (key == 37) {
            //this.turn(true);
        } else if (key == 38) {
            this.keyDown.up = false;
        } else if (key == 39) {
            //this.turn();
        } else if (key == 40) {
            //this.accelerate();
        }
    }, this));

    this.loop();
}