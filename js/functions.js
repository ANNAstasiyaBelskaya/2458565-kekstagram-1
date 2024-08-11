//2.1 Функция для проверки, является ли строка палиндромом.

function isPalindrome (string) {
  string = string.toUpperCase().replaceAll(' ', '');
  const reverseString = string.split('').reverse().join('');

  return string === reverseString;
}

isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true


//2.2 Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN.

function isNumber (index) {
  return typeof index !== 'undefined' && !isNaN(index) || typeof index === 'number';
}

function getNumber (string) {
  let newString = '';
  string = string.toString().replaceAll(' ', '');

  for(let i = 0; i <= string.length; i++) {
    const number = isNumber(string[i]);
    if (number) {
      newString += string[i];
    }
  }
  return newString ? Number(newString) : NaN;
}

//передана строка
getNumber('2023 год'); // 2023
getNumber('ECMAScript 2022'); // 2022
getNumber('1 кефир, 0.5 батона'); // 105
getNumber('агент 007'); // 7
getNumber('а я томат'); // NaN

//передано число
getNumber(2023); // 2023
getNumber(-1); // 1
getNumber(1.5); // 15


//2.3 Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.

function getNewString (string, minLength, characterString) {
  const baseString = string;
  const baseCharacterString = characterString;
  let newString = '';

  for (let i = string.length; i < minLength; i++) {
    if (characterString.length % 2 === 0) {
      string += characterString[0] + baseCharacterString;
    }
    string += characterString;
  }

  newString = string.split('').slice(baseString.length, minLength).join('');
  newString += baseString;
  return baseString.length >= minLength ? baseString : newString;
}

// Добавочный символ использован один раз
getNewString('1', 2, '0'); // '01'

// Добавочный символ использован три раза
getNewString('1', 4, '0'); // '0001'

// Добавочные символы обрезаны с конца
getNewString('q', 4, 'werty'); // 'werq'

// Добавочные символы использованы полтора раза
getNewString('q', 4, 'we'); // 'wweq'

// Добавочные символы не использованы, исходная строка не изменена
getNewString('qwerty', 4, '0'); // 'qwerty'


//2.4 Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.

const checkLength = (string, length) => string.length <= length;

// Cтрока короче 20 символов
checkLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkLength('проверяемая строка', 10); // false
