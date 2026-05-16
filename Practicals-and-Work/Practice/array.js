// let marks = [91, 82, 63, 84, false, "Not Present"]
// console.log(marks)
// console.log(marks[0])
// console.log(marks[1])
// console.log(marks[2])
// console.log(marks[3])
// console.log(marks[4])
// console.log(marks[5])
// console.log(marks[6]) //will be undefined because index 6 is not defined
// console.log(marks.length)
// marks[6] = 72 // adding a new value to the array
// console.log(marks[6])
// marks[6] = 96// changing value of an array
// console.log(marks[6])

// console.log(typeof marks)

// // arrays are mutable , arrays can be changed
// // strings are immutable, strings cannot be changed

// // Array methods:

// let num = [1, 2, 3, 34, 4]
// let b = num.toString() // b is now a string
// console.log(b, typeof b)

// let c = num.join("_")
// console.log(c, typeof c)

// num.pop() // popped 4
// console.log(num)
//  let r = num.pop(); // pop returns the last element
//  console.log(num)
//  console.log(r)


// let s= num.push(44) // push returns the new array length
// console.log(num, s)

// let t = num.shift() // remove and returns the first element
// console.log(num, t)

// let u = num.unshift(22) // adds element at the front and returns the length of the new array
// console.log(num, u)

// delete num[0]; // it does not change the length of the array
// console.log(num.length)
// console.log(num + "\n") // [ <1 empty item>, 2, 3, 44 ]

// let num2 = [12, 13, 14, 15, 16, 17, 18, 19, 10]
// let newArray = num.concat(num2)
// console.log(num, num2)
// console.log(newArray)

// let num3 = [213, 234, 109, 22, 27, 365, 34, 11, 187, 154, 110]
// num3.sort() // it sorts alphabetically 
// console.log(num3)
//  let compare = (a, b)=>{
//     return a-b
//  }
//  num3.sort(compare) // this will sort the array in ascending array
//  console.log(num3)
// console.log(num3.reverse())

// let num4 =  [102, 103, 104, 105, 106, 107, 108, 109, 100]
// let deleted = num4.splice(2, 3, 201, 202, 203)
// console.log(num4)
// console.log(deleted) // splice returns the array of deleted values
// // splice(start index, number of elements to be deleted, elements to be added)

// let num5 =  [102, 103, 104, 105, 106, 107, 108, 109, 100]
// let newnum = num5.slice(3)
// console.log(num5)
// console.log(newnum)


// // looping through array

// for(let i=0; i<num5.length; i++){
//     console.log(num5[i])
// }
// console.log("\n")

// num5.forEach((element)=>{
//     console.log(element * element)
// })

// // Array.from
// let myname = "Aditya"
// let arr = Array.from(myname) // makes an array from any object
// console.log(arr)

// for(let i in num5){
//     console.log(i) //returns indices
// }

// console.log("\n")

// for(let i of num5){
//     console.log(i) //returns elements
// }

// console.log("\n")

// // map method
// let arr1 = [45, 23, 21]
// let a = arr1.map((value, index, array)=>{
//     console.log(value, index, array)
//     return value + index
// })
// // map makes an new array, but foreach is only like a loop
// console.log(a)

// // filter method
// let arr2 = [45, 23, 21, 0, 3, 5]
// let a2 = arr2.filter((a) => {
//     return a<10
// })
// console.log(a2)
// // map and filter do not changes the original array
// console.log("\n")

// let arr3 = [1, 2, 3, 5, 2, 1]
// let a3 = arr3.reduce((adi, aadu)=>{
//     return adi+aadu
// })
// console.log(a3)
// console.log("\n")


// practice pronlem 1
// let arr = [1, 2, 3, 4, 5, 6]
// let a = prompt("enter a number")
// a = Number.parseInt(a)
// arr.push(a)
// console.log(arr)



