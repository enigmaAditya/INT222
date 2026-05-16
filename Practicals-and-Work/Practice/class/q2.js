// write a js program to demonstrate prototype-based inheritance using the constructor functions. Create a parent object and a child object with inherited properties and methods

function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.greet = function() {
    console.log("Hello, my name is " + this.name);
};

function Student(name, age, roll){
    Person.call(this, name, age)
    this.roll = roll
}
Student.prototype = Object.create(Person.prototype)
Student.prototype.construvtor = Student
Student.prototype.study = ()=>{
    console.log(this.nam3 + " is studying")
}

const person = new Person("Aditya", 21)
const student = new Student("Ayush", 17, 101)

person.greet()
student.greet()
student.study()