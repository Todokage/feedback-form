// Define the Vehicle class
class Vehicle {
    constructor(make, model, year) {
      this.make = make;
      this.model = model;
      this.year = year;
    }
  
    start() {
      console.log("Vehicle engine started");
    }
  }
  
  // Implement the Car class extending Vehicle
  class Car extends Vehicle {
    constructor(make, model, year) {
      super(make, model, year);
    }
  }
  
  // Create an instance of the Car class
  const myCar = new Car("Toyota", "Camry", 2022);
  
  // Call the start method
  myCar.start();
  export default Vehicle;