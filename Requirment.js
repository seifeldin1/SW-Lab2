/*IMPORTANT NOTES
1- you are using JS Name Casing (camelCasing)
2- make this code as clean as possible 
3- apply all the concepts you learned during this lab (Naming, comments,  functions)
*/

class Point {
  constructor(coordinateX, coordinateY) {
    this.coordinateX = coordinateX;
    this.coordinateY = coordinateY;
  }
}

class Rectangle {
  constructor(startingPoint, width, height) {
    this.startingPoint = startingPoint;
    this.width = width;
    this.height = height;
    try
    {  
      this.checkSidesValue(width,height)
    }
    catch(e)
    {
      console.log(e);
    }
  }

  // ***************
  // METHODS
  // ***************

  calculateArea() {
    return this.width * this.height;
  }

  calculatePerimeter() {
    return 2 * this.width + 2 * this.height;
  }


  updateHeight(height) {

    if (height && height > 0) {

      //check the case of updating height of a square
      if(this.height == this.width) {
        this.width = height;
      }
      this.height = height;
    }

  }

  update(startingPoint, width, height ) {

    try
    {  
      this.checkSidesValue(width,height)
    }
    catch(e)
    {
      console.log(e);
    }

    this.startingPoint = startingPoint;
    this.width = width;
    this.height = height;
  }

  fetchHeight() {
    return this.height;
  }

  
  endPoints() {
    const topRight = this.startingPoint.coordinateX + this.width;
    const bottomLeft = this.startingPoint.coordinateY + this.height;
    console.log("End Point X-Axis (Top Right): " + topRight);
    console.log("End Point Y-Axis (Bottom Left): " + bottomLeft);
  }

  fetchWidth() {
    return this.width;
  }

  checkSidesValue(width, height)
  {
    if (!height)
      {
      throw Error("Enter height."); 
      }
    else if(height <= 0) 
      {
        throw Error("Invalid height value."); 
      }
    else if(!width)  
      {
      throw Error("Enter width."); 
      }
    else if( width <= 0) 
      {
      throw Error("Invalid width value."); 
      }
  }
}

function createRectangle(width, coordinateX, height, coordinateY) {
  const mainPoint = new Point(coordinateX, coordinateY);
  const rectangle = new Rectangle(mainPoint, width, height);
  return rectangle;
}

function createSquare(coordinateX, coordinateY, height) {
  const mainPoint = new Point(coordinateX, coordinateY);
  const square = new Rectangle(mainPoint, height, height);
  return square;
}

const rectangle = createRectangle(2, 3, 5, 4);
const square = createSquare(5, 2, 5);

console.log(square.calculatePerimeter());
console.log(square.calculateArea())
square.endPoints();

rectangle.updateHeight(3);
