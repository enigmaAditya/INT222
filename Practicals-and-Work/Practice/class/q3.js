// write a js program for a student management system that uses ES6 features such as let, const, spread operator, and object destructing to manage and dispaly student details and marks

const student = {
    name : "Aditya",
    age : 21,
    marks : {
        sub1 : 90,
        sub2 : 85,
        sub3 : 92
    }
}
const {name, age, ...rest} = student;
console.log(name, age, rest);
const sum = ({...marks}) =>({...marks, total: Object.values(marks).reduce((acc, curr) => acc + curr, 0)});
console.log(sum(student.marks))
