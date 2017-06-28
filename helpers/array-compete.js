module.exports = function competeArray(arr1 = [], arr2 = []) {
    //如果arr1和arr2中有相同值， arr2中的会被去掉。并返回一个新的arr2
    let newArr = [];
    arr2.forEach(item => {
        let index = arr1.indexOf(item);
        if (index === -1) newArr.push(item);
    });
    return newArr;
};
