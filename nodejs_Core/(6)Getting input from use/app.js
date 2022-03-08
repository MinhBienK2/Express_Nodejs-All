// process.argv là 1 mảng . in ra cả địa chỉ vaf nới để ứng dụng 

const argv = process.argv
console.log(argv)
// argv.forEach((val, index) => {
//     console.log(`${index}: ${val}`);
//   });
// console.log(process.argv)

const argv1 = process.argv[2] = 'hell'
// console.log(argv1)