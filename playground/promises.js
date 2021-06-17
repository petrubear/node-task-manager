const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([7, 8, 9]);
        // reject(new Error('things went wrong'));
    }, 1000);
});


doWorkPromise.then((result) => {
    console.log('succes ', result);
}).catch((error) => {
    console.log(error);
});


// ////////////////////////

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    });
};

add(1, 2).then((sum) => {
    console.log(sum);
    add(sum, 5).then((sum2) => {
        console.log(sum2);
    }).catch((e) => {
        console.log(e);
    });
}).catch((e) => {
    console.log(e);
});

// with promise chaining

add(2, 3).then((sum) => {
    console.log(sum);
    return add(sum, 4);
}).then((sum2) => {
    console.log(sum2);
}).catch((e) => {
    console.log(e);
});
