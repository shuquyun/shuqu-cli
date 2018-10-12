// 连字符转驼峰
// String.prototype.hyphenToHump = function () {
//     return this.replace(/-(\w)/g, (...args) => {
//         console.log('hyph')
//         return args[1].toUpperCase()
//     })
// }

// // 驼峰转连字符
// String.prototype.humpToHyphen = function () {
//     return this.replace(/([A-Z])/g, '-$1').toLowerCase()
// }


var str = "feiyongshenqing";



const toBig = (str) => {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
}

const hyphenToHump = (str) => {
    return str.replace(/_(\w)/g, (...args) => {
        return args[1].toUpperCase()
    })
}

const humpToHyphen = (str) => {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

module.exports = {
    toBig,
    hyphenToHump,
    humpToHyphen
}