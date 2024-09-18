function splitString(str) {
  const result = [];
  let index = 0;

  while (index < str.length) {
    let step = 1;
    let slice = str.slice(index, index + step);

    while (!Number(slice)) {
      // Увеличиваем шаг, пока не получим число
      step++;
      slice = str.slice(index, index + step);
    }

    result.push(Number(slice));
    index += step;
  }

  return result;
}

const inputString = "1234567890";
const resultArray = splitString(inputString);
console.log(resultArray); // [1, 23, 456, 7890]