// const getPromise = () => {
//     return new Promise((resolve, reject)=>{
//         console.log("I am a Promise")
//         // reject("error")
//         resolve("Promise resolved")
//     })
// }

// let promise = getPromise();
// promise.then((value)=>{
//      console.log("resolved: ",value)
// }).catch((value)=>{
//     console.log("rejected: ",value)
// })

// function asyncfunc(){
//     return new Promise((resolve, reject) => {
//         setTimeout(()=>{
//             console.log("some detail")
//             resolve("success")
//         }, 4000)
//     })
// }

// console.log("fetching data1........")
// asyncfunc().then((res)=>{
//     console.log("data fetched ", res)
//     console.log("fetching data2........")
//     asyncfunc().then((res)=>{
//         console.log("data fetched ", res)
//     })
// })

// async function hello(){
//     console.log("hello");
// }

// async function api(){
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             console.log("weather Data fetched")
//             resolve(200)
    
//         }, 2000)
//     })
// }

// async function getWeatherData(){
//     await api()
// }

// getWeatherData()


function getdata(dataId){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            console.log("data", dataId)
            resolve("success")
        }, 2000);
    })
}

// Async/Await:
async function getAllData(){
    console.log("fetching data1........")
    await getdata(1);
    console.log("fetching data2........")
    await getdata(2);
    console.log("fetching data3........")
    await getdata(3);
}


// immediately invoked function expression

// Application programming interface