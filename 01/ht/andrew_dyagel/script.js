/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */
// @ts-check

/**
 * Функция вывода строк для работы в fizzBuzz
 * @param {*} a
 */
function log (a) {
    console.log(a);
}

/* Раместите ваш код ниже */

/**
 * реализовать фукнцию `fizzBuzz`
 * которая выводит числа от 1 до 100.
 * Если число кратно 3 - вместо числа вывести `Fizz`.
 * Если кратно 5 - вывести вместо числа `Buzz`.
 * Если число кратно и 3 и 5 - вывести вместо числа `FizzBuzz`.
 * Для вывода использовать фукнцию `log` (аналогично заданию в классе).
 * В теле функции нельзя использовать  `if`, `switch`, тернарный оператор `? :`
 */
function fizzBuzz () {
    for (var i = 1; i <= 100; i++) {
        var value = i.toString();
        ((i % 3 === 0 && i % 5 === 0) && (value = 'FizzBuzz')) ||
            ((i % 3 === 0) && (value = 'Fizz')) ||
            ((i % 5 === 0) && (value = 'Buzz'));
        log(value);
    }
}

/**
 * реализовать фукнцию  `isPolindrom`,
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString
 * @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 */
function isPolindrom (textString) {
    for (var i = 0, j = (textString.length - 1); i < textString.length / 2, j >= textString.length / 2; i++ , j--) {
        if (textString.charAt(i) === textString.charAt(j)) {
            continue;
        } else {
            return false;
        }
    }
    return true;
}


/**
 * Реализовать фукнцию `drawCalendar` ,
 * которая принимает три аргумента - год, месяц, htmlElement
 * и выводит в этот элемент календарь на месяц (дни недели начинаются с понедельника ).
 * @param {number} year
 * @param {number} month - номер месяца, начиная с 1
 * @param {external} htmlEl
 */
function drawCalendar (year, month, htmlEl) {
    /* Ваше решение */
}


/**
 * Написать функцию `isDeepEqual`
 * которая принимает на вход двe переменных
 * и проверяет идентичны ли они по содержимому. Например
 * @param {*} objA
 * @param {*} objB
 * @return {boolean} идентичны ли параметры по содержимому
 */
function isDeepEqual (objA, objB) {
    if (!objA && !objB) {
        return true;
    } else if (!objA || !objB) {
        return false;
    }

    var propertiesA = Object.keys(objA).sort();
    var propertiesB = Object.keys(objB).sort();

    if (propertiesA.length !== propertiesB.length) {
        return false
    }

    if (propertiesA.length === 0 && propertiesB.length === 0) {
        if (objA !== objB) {
            return false;
        }
    }

    for (var i = 0; i < propertiesA.length; i++) {
        if (objA.hasOwnProperty(propertiesA[i]) !== objB.hasOwnProperty(propertiesB[i])) {
            return false;
        }

        var valueOfA = objA[propertiesA[i]];
        var valueOfB = objB[propertiesB[i]];

        if (valueOfA instanceof Array && valueOfB instanceof Array) {
            if (!arrayComparer(valueOfA, valueOfB)) {
                return false;
            }
        } else if (valueOfA instanceof Object && valueOfB instanceof Object) {
            if (!isDeepEqual(valueOfA, valueOfB)) {
                return false;
            }
        } else if (valueOfA !== valueOfB) {
            return false;
        }
    }

    return true;
}

function arrayComparer (arrayA, arrayB) {
    if (arrayA.length !== arrayB.length) {
        return false;
    }

    var j = arrayA.length;
    while (j--) {
        if (arrayA[j] !== arrayB[j]) {
            return false;
        }
    }
    return true;
}

var testArray = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23]
]; // [1,2,3,4,5,10,15,20,23,22,21,16,11,6,7,8,9,14,19,18,17,12,13]

var result = spiral(testArray);

/**
 * Принимает на вход двумерный массив и возвращает
 * одномерный массив с элементами расположенными
 * по спирали.
 * @param {Array} initialArray
 * @return {Array}
 */
function spiral (initialArray) {
    // Начальный индекс.
    var index = 0;
    var resultArray = [];

    return moveToRightAndUp(index, initialArray, resultArray);
}

/**
 * Добавляет элементы по направлению вправо и вверх.
 * @param {Array} array Коллекция элементов.
 * @param {Array} resultArray Результирующая коллекция.
 * @return {Array}
 */
function moveToRightAndUp (index, array, resultArray) {
    // Номер круга.
    var lap = 0;
    index === 0 ? lap = 1 : lap = index + 1;

    for (var i = index; i < array.length - index; i++) {
        if (i === index) {
            resultArray = pushStartElement(i, array, resultArray, false, lap);
            resultArray = concatLowerRow(i, array, resultArray);
            resultArray = pushEndElement(i, array, resultArray, false, lap);
        } else if (i === (array.length - (index + 1))) {
            resultArray = moveToLeftAndDown(i, array, resultArray, lap)
        } else {
            resultArray = pushEndElement(i, array, resultArray, false, lap);
        }
    }
    return resultArray;
}

/**
 * Добавляет элементы по направлению влево и вниз.
 * @param {Array} array Коллекция элементов.
 * @param {Array} resultArray Результирующая коллекция.
 * @param {number} lap Номер круга.
 * @return {Array}
 */
function moveToLeftAndDown (index, array, resultArray, lap) {
    for (var i = index; i >= array.length - index; i--) {
        if (i === index) {
            resultArray = pushStartElement(i, array, resultArray, true, lap);
            resultArray = concatUpperReversedRow(i, array, resultArray);
            resultArray = pushEndElement(i, array, resultArray, true, lap);
        } else if (i === (array.length - index)) {
            resultArray = moveToRightAndUp(i, array, resultArray);
        } else {
            resultArray = pushEndElement(i, array, resultArray, true, lap);
        }
    }
    return resultArray;
}

/**
 * Добавляет нижнюю строку текущего круга спирали.
 * Не включает крайние элементы.
 * @param {number} index Индекс текущей строки.
 * @param {Array} array Коллекция элементов.
 * @param {Array} resultArray Результирующая коллекция.
 * @return {Array}
 */
function concatLowerRow (index, array, resultArray) {
    return resultArray = resultArray
        .concat(
            array[index]
                .slice(
                    index === 0 ? (index + 1) : index,
                    array[index].length - (index + 1)));
}

/**
 * Добавляет элементы верхней строки текущего круга спирали,
 * отсортированные в обратном порядке.
 * Не включает крайние элементы.
 * @param {number} index Индекс текущей строки.
 * @param {Array} array Коллекция элементов.
 * @param {Array} resultArray Результирующая коллекция.
 * @return {Array}
 */
function concatUpperReversedRow (index, array, resultArray) {
    return resultArray = resultArray.concat(
        array[index]
            .slice(array.length - index, array[index].length - (array.length - index))
            .reverse());
}

/**
 * Добавляет начальный элемент в зависимости
 * от направления движения.
 * @param {number} index Индекс текущей строки.
 * @param {Array} array Коллекция элементов.
 * @param {Array} resultArray Результирующая коллекция.
 * @param {boolean} isReversed Если движемся в обратном направлении то true.
 * @param {number} lap Номер круга.
 * @return {Array}
 */
function pushStartElement (index, array, resultArray, isReversed, lap) {
    if (isReversed) {
        resultArray.push(array[index][array[index].length - lap]);
    } else {
        resultArray.push(array[index][index === 0 ? 0 : (index - 1)]);
    }
    return resultArray;
}

/**
 * Добавляет конечный элемент в зависимости
 * от направления движения.
 * @param {number} index Индекс текущей строки.
 * @param {Array} array Коллекция элементов.
 * @param {Array} resultArray Результирующая коллекция.
 * @param {boolean} isReversed Если движемся в обратном направлении то true.
 * @param {number} lap Номер круга.
 * @return {Array}
 */
function pushEndElement (index, array, resultArray, isReversed, lap) {
    if (isReversed) {
        resultArray.push(array[index][lap - 1]);
    } else {
        resultArray.push(array[index][array[index].length - lap]);
    }
    return resultArray;
}
