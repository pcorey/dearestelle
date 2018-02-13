let mask, images, speed = 0.25;

function preload() {
    mask = loadImage('loose.png');
    let range = (images = _.chain(1)
        .range(43)
        .without(25)
        .map(n => ({
            n
        }))
        .map(i => reset(i, true))
        .value());
}

function reset(image, first) {
    image.loading = true;
    image.r = _.random(-PI / 8, PI / 8);
    image.image = loadImage(`img/${image.n}.jpg`, i => {
        image.image = i;
        image.image.resize(_.random(200, 600), 0);
        image.image.mask(mask);
        image.x = _.random(-image.image.width / 2, windowWidth + image.image.width / 2);
        if (first) {
            image.y = _.random(-image.image.height / 2, windowHeight + image.image.height / 2);
        } else {
            image.y = -image.image.height / 2;
        }
        image.loading = false;
    });
    image.v = _.random(2, 10.0);
    /* image.show = _.random(1, true) < 0.75;*/
    image.show = true;
    return image;
}

function update(image) {
    if (image.loading) {
        return;
    }
    image.y += Math.max(speed, (Math.cos(image.y / windowHeight * 2 * PI) + 1) * image.v);
    if (image.y - image.image.height > windowHeight) {
        reset(image);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    imageMode(CENTER);
}

function draw() {
    background('#ddddff');
    _.chain(images)
        .filter('show')
        .forEach(i => {
            push();
            translate(i.x, i.y);
            rotate(i.r);
            image(i.image, 0, 0);
            pop();
        })
        .value();
    fill(255, 255, 255, 75);
    rect(0, 0, windowWidth, windowHeight);
    _.forEach(images, update);
}

function mouseMoved() {
    speed = mouseX / windowWidth * 5;
}
