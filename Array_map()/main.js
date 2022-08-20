/*
var courses = [
    {
        id: 1,
        name:'javascript',
        coin: 0,
    },
    {
        id: 2,
        name:'HTML, CSS',
        coin: 1,
    },
    {
        id: 3,
        name:'Ruby',
        coin: 1,
    },
    {
        id: 4,
        name:'PHP',
        coin: 200,
    },
    {
        id: 5,
        name:'ReactJS',
        coin: 1,
    },
    {
        id: 6,
        name:'ruby',
        coin: 10,
    },
    {
        id: 7,
        name:'ruby',
        coin: 12,
    },
];

function courseHandle(course, index, originArray) {
    return {
        id: course.id,
        name:`khoa hoc: ${course.name}`, 
        coin: course.coin,
        coinText:`gia: ${course.coin}`,
        index: index,
        originArray: originArray
    }
}

var newCourse = courses.map(courseHandle)

console.log(newCourse)

// lấy name ra tạo thanh 1 mảng mới
function courseHandle(course, index, originArray) {
    return course.name
}

var newCourse = courses.map(courseHandle)

console.log(newCourse)


// ///////////////
function courseHandle(course, index, originArray) {
    return `<h2>${course.name}</h2>,<p>${course.coin}</p>
    `
}

var newCourse = courses.map(courseHandle)

console.log(newCourse.join(' - '))


// //////////////////////////////////
var newCourse = courses.map(course => {
    return `<p>${course.name}</p>`
})

console.log(newCourse)
*/

// //////////////////////////////////////////////////////////////////

var obj = {
    a: "hello",
    b: "this is",
    c: "javascript!",
};

var array = Object.keys(obj).map(function (key) {
    return obj[key];
});

console.log(array);

