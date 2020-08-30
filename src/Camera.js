function Camera(windowX, windowY, windowWidth, windowHeight)
{
    // Window stuff
    this.windowX = windowX;
    this.windowY = windowY;
    this.windowWidth = windowWidth;
    this.windowHeight = windowHeight;
    this.halfWindowWidth = this.windowWidth / 2;
    this.halfWindowHeight = this.windowHeight / 2;

    // Needed for moving the camera
    this.focusX = 0;
    this.focusY = 0;
    this.focusSpeed = 0.5;

    // The bounds the camera will stay with in
    // These will need to be set externally
    this.bounds = {
        minX: -Infinity,
        minY: -Infinity,
        maxX: Infinity,
        maxY: Infinity
    };
}
Camera.prototype.moveFocus = function(x, y)
{
    // Move direction and move magnitude
    // These will be used to move the focus of the camera 
    var moveDir = Math.atan2(y - this.focusY, x - this.focusX);
    var moveMag = Math.sqrt(Math.pow(x - this.focusX, 2) + Math.pow(y - this.focusY, 2)) * this.speed;

    // Move camera in both x and y components
    this.focusX += this.distance * Math.cos(this.angle);
    this.focusY += this.distance * Math.sin(this.angle);

    // Keep it within bounds
    this.focusX = Math.min(Math.max(this.focusX, this.bounds.minX), this.bounds.maxX);
    this.focusY = Math.min(Math.max(this.focusY, this.bounds.minY), this.bounds.maxY);
};

module.exports = Camera;