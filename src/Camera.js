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
    
    var focusObject;

    this.update = function()
    {
        if(focusObject)
        {
            this.scroll(focusObject.x, focusObject.y, focusObject.name);
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
        delete this.scrolls[name];
        focusObject = undefined;
    };
    this.getScroll = function()
    {
        return {
            x: this.scrollX,
            y: this.scrollY
        };
    };

    this.scrolls = {};

    this.getTranslateValues = function()
    {
        return {
            x: this.windowX + this.halfWindowWidth - this.scrollX,
            y: this.windowY + this.halfWindowHeight - this.scrollY, 
        };
    };
}
Camera.prototype.scroll = function(x, y, name)
{
    if(!this.scrolls[name])
    {
        this.scrolls[name] = {
            x: this.scrollX,
            y: this.scrollY
        };
    }

    var scroll = this.scrolls[name];

    // Move direction and move magnitude
    // These will be used to move the scroll of the camera 
    var moveDir = Math.atan2(y - scroll.y, x - scroll.x);
    var moveMag = Math.sqrt(Math.pow(x - scroll.x, 2) + Math.pow(y - scroll.y, 2)) * this.scrollSpeed;

    // Move camera in both x and y components
    scroll.x += moveMag * Math.cos(moveDir);
    scroll.y += moveMag * Math.sin(moveDir);

    this.scrollX = scroll.x;
    this.scrollY = scroll.y;

    // Keep it within bounds
    this.scrollX = Math.min(Math.max(this.scrollX, this.bounds.minX + this.halfWindowWidth), this.bounds.maxX - this.halfWindowWidth);
    this.scrollY = Math.min(Math.max(this.scrollY, this.bounds.minY + this.halfWindowHeight), this.bounds.maxY - this.halfWindowHeight);

    // Update the bounding box
    this.boundingBox.minX = this.scrollX - this.halfWindowWidth;
    this.boundingBox.minY = this.scrollY - this.halfWindowHeight;
    this.boundingBox.maxX = this.scrollX + this.halfWindowWidth;
    this.boundingBox.maxY = this.scrollY + this.halfWindowHeight;
};
Camera.prototype.resize = function(windowX, windowY, windowWidth, windowHeight)
{
    this.windowX = windowX;
    this.windowY = windowY;
    this.windowWidth = windowWidth;
    this.windowHeight = windowHeight;
    this.halfWindowWidth = windowWidth / 2;
    this.halfWindowHeight = windowHeight / 2;
};

module.exports = Camera;