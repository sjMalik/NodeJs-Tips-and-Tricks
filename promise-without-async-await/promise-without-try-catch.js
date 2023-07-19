function getPromise(flag) {
    return new Promise((resolve, reject) => {
        if (flag) {
            resolve('Resolved')
        }else {
            reject(new Error('Something error occured'))
        }
    })
}

(async () => {
    let res = await getPromise(false).catch(err=> console.error(err));
    console.log('Promise', res);
})();
console.log('Important code to run');