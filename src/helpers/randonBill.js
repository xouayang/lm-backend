function add_zero(your_number, length = 2) {
    var num = '' + your_number;
    if(num.length < length){
        num = '0' + num;
    }
    if(num.length > length){
        num = num.substring(num.length-2, num.length);
    }
    return num;
}
function billNumber() {
    let date = new Date();
    let year = add_zero(date.getFullYear());
    let month = add_zero(date.getMonth());
    let day = add_zero(date.getDate());
    let hour = add_zero(date.getHours());
    let minutes = add_zero(date.getMinutes());
    let seconds = add_zero(date.getSeconds());
    let random = Math.floor(Math.random() * 100);
    return `${year}${month}${day}${hour}${minutes}${seconds}${random}`;
}

module.exports = { add_zero, billNumber }