function Camera(windowX, windowY, windowWidth, windowHeight)
{
    // Window stuff
    this.windowX = windowX;
    this.windowY = windowY;
    this.windowWidth = windowWidth;
    this.windowHeight = windowHeight;
    this.halfWindowWidth = windowWidth / 2;
    this.halfWindowHeight = windowHeight / 2;

    // Needed for moving the camera
    this.scrollX = this.halfWindowWidth;
    this.scrollY = this.halfWindowHeight;
    this.scrollSpeed = 0.5;

    // The bounds the camera will stay with in
    // These will need to be set externally
    this.bounds = {
        minX: -Infinity,
        minY: -Infinity,
        maxX: Infinity,
        maxY: Infinity
    };

    this.boundingBox = {
        minX: this.scrollX - this.halfWindowWidth,
        minY: this.scrollY - this.halfWindowHeight,
        maxX: this.scrollX + this.halfWindowWidth,
        maxY: this.scrollY + this.halfWindowHeight
    };

    this.resize = function(windowX, windowY, windowWidth, windowHeight)
    {
        this.windowX = windowX;
        this.windowY = windowY;
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.halfWindowWidth = windowWidth / 2;
        this.halfWindowHeight = windowHeight / 2;
    };
    
    var focusObject;

    this.update = function()
    {
        if(focusObject)
        {
            this.scroll(focusObject.x, focusObject.y);
        }
    };

    this.setFocus = function(x, y, name)
    {
        focusObject = {
            x: x,
            y: y,
            name: name
        };
    };
    this.updateFocus = function(x, y)
    {
        if(focusObject)
        {
            focusObject.x = x;
            focusObject.y = y;
        }
    };
    this.getFocus = function()
    {
        return focusObject;
    };
    this.removeFocus = function()
    {
        focusObject = undefined;
    };
    this.getScroll = function()
    {
        return {
            x: this.scrollX,
            y: this.scrollY
        };
    };

    this.getTranslateValues = function()
    {
        return {
            x: this.windowX + this.halfWindowWidth - this.scrollX,
            y: this.windowY + this.halfWindowHeight - this.scrollY, 
        };
    };
}
Camera.prototype.scroll = function(x, y)
{
    // Move direction and move magnitude
    // These will be used to move the scroll of the camera 

    var moveDir = Math.atan2(y - this.scrollY, x - this.scrollX);
    var moveMag = Math.sqrt(Math.pow(x - this.scrollX, 2) + Math.pow(y - this.scrollY, 2)) * this.scrollSpeed;

    // Move camera in both x and y components
    this.scrollX += moveMag * Math.cos(moveDir);
    this.scrollY += moveMag * Math.sin(moveDir);

    // Keep it within bounds
    this.scrollX = Math.min(Math.max(this.scrollX, this.bounds.minX + this.halfWindowWidth), this.bounds.maxX - this.halfWindowWidth);
    this.scrollY = Math.min(Math.max(this.scrollY, this.bounds.minY + this.halfWindowHeight), this.bounds.maxY - this.halfWindowHeight);

    // Update the bounding box
    this.boundingBox.minX = this.scrollX - this.halfWindowWidth;
    this.boundingBox.minY = this.scrollY - this.halfWindowHeight;
    this.boundingBox.maxX = this.scrollX + this.halfWindowWidth;
    this.boundingBox.maxY = this.scrollY + this.halfWindowHeight;
};

module.exports = Camera;