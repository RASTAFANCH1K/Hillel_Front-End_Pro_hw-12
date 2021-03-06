// ЗАДАНИЯ ДЛЯ РАЗМИНКИ!!!!!!)))

// EXERCISE-1
// Есть участок кода! обернуть в try catch нужный участок кода и выбросить ошибку если getResult возвращает undefined
// ANSWER:

function getResult() {
  var obj = {
    name: 'Sergei',
    lastName: 'Shakhov'
  }
  return
  obj;
}
try {
  const a = getResult();
  if (a === undefined) throw new Error('o_O OBJECT IS NOT DEFINED');
  console.log('RESULT', a);
} catch (err) {
  console.log('OMG', err)
} finally {
  console.log('Finished');
}

// EXERCISE-2
// исправить код чтобы консоль логи показывали от 0 до 10, и написать почему сейчас выводит десять десяток!!
// ANSWER:

for (var i = 0; i < 10; i++) {
  setTimeout(() => console.log(i), 0);
}

// Цикл for - синхронный код, в то время как setTimeout ассинхронный.
// setTimeout - браузерная API технология не входящая в спецификацию Standard ECMA-262,
// Весь синхронный код выполняется в браузерном движке V8 (Chrome), попадает в Call Stack,
// ассинхронный код попадает тоже в Call Stack затем стирается, и попадает в Web Apis, где ждёт отведённое время,
// затем идёт в Callback Queue и оттуда Event Loop загоняет его в Call Stack, и там он выполняется.
// setTimeout будет выполняться после того как закончится весь цикл,
// по окончанию цикла i будет равен 10 (из-за i++),
// setTimeout берёт i из глобальной области, когда цикл закончился на 10,
// затем setTimeout вызывает i, а тот в свою очередь в глобальной области равен 10.
// для var существует одна глобальная переменная которая на каждой итерации будет меняться,
// и для всех setTimeout i будет одна и та же.

for (let i = 0; i < 10; i++) {
  setTimeout(() => console.log(i), 0);
}

// Чтобы console.log выводил от 0 до 10 (ну тут от 0 до 9, не суть) нужно var заменить на let
// т.к. у let блочная область видимости и для каждой итерации будет создаваться свой let i,
// let i = 0, let i = 1, let i = 2, ... и т.д.
// Когда все setTimeout обработаются то им придется брать откуда-то i,
// а в данной ситуации для каждого setTimeout будет свой i.
// Если в функции setTimeout i не найдена то эта i будет найдена на область выше.

// Можно решить таким способом:

for (var i = 0; i < 10; i++) {
  setTimeout((param) => console.log(param), 0, i);
}

// где аргумент i закрепляется в параметре функции param.
// Тут играет роль замыкание и области видимости, где каждая i берётся из цикла и передается в параметр param
// в param передается сначала 0, затем 1, 2, 3 ... и т.д.

// Также можно обернуть setTimeout в функцию:

for (var i = 0; i < 10; i++) {
  function callSetTimeOut(param) { 
    setTimeout(() => console.log(param), 0);
  }
  callSetTimeOut(i);
}

// Тут тоже решает замыкание с лексическим окружением.

// EXERCISE-3
// Есть код!! В какой последовательности выполнится!
// ANSWER:

function getDatas() {
  return [
    {
      name: "Vasia"
    },
    {
      name: "Boria"
    },
    {
      name: "Misha"
    },
  ]
}

const res = getDatas();

console.log('RES', res);

setTimeout(() => console.log('settimeout1'), 100);

setTimeout( () => console.log('settimeout'), 10);

console.log('One');

console.log('two');

// Ну тут всё просто:
// Первым в Call Stack попадает RES, потом исчезает,
// затем settimeout1 и settimeout сначала появляются в Call Stack затем исчезают,
// идут после чего в Web Apis,
// One и two тоже появляются в Call Stack затем исчезают,
// когда settimeout1 и settimeout дождались своего выполнения в Web Apis,
// они попадают в Callback Queue и оттуда Event Loop их загоняет в Call Stack.

// RES
// One
// Two
// settimeout (10)
// settimeout1 (100)

// EXERCISE-4
// Что выведет alert в setTimeOut
// ANSWER:

setTimeout(function () {
  alert(i);
}, 100);

for (var i = 0; i < 1000000; i++) {}

// Выведет 1000000 
// Опять же во втором задании такой же ответ есть:
// Цикл for - синхронный код, в то время как setTimeout ассинхронный.
// ассинхронный код попадает тоже в Call Stack затем стирается, и попадает в Web Apis, где ждёт отведённое время,
// затем идёт в Callback Queue и оттуда Event Loop загоняет его в Call Stack, и там он выполняется.
// setTimeout будет выполняться после того как закончится весь цикл,
// по окончанию цикла i будет равен 1000000 (из-за i++),
// setTimeout берёт i из глобальной области, когда цикл закончился на 1000000,
// затем setTimeout вызывает i, а тот в свою очередь в глобальной области равен 1000000.
// для var существует одна глобальная переменная которая на каждой итерации будет меняться,
// и для всех setTimeout i будет одна и та же.

// EXERCISE-5
// Есть функция funct! Сделать из нее функцию конструктор которая создает обьект со свойствами name lastName
// ANSWER:

function funct(name, lastName) {
  this.name = name;
  this.lastName = lastName;
}

let res = new funct('Vasia', 'Vasichkin');

console.log(res);

// EXERCISE-6
// Создать функцию конструктор, которая принимает обьект и берет только lastName и position и создает обьект с этих свойств
// ANSWER:

// 1:
function factory({lastName, position}) {
  this.lastName = lastName;
  this.position = position;
}

let res = new factory({ name: 'Sergei', lastName: 'Shakhov', height: 188, position: 'Software developer' });

console.log(res);

// 2:
function factory({lastName, position}) {
  return {
    name: 'ZINA',
    lastName,
    position
  }; 
}

let res = new factory({ name: 'Sergei', lastName: 'Shakhov', height: 188, position: 'Software developer' });

console.log(res);

// EXERCISE-7
// Сделайте так чтобы выболнялось settimeout1 RES RES1
// ANSWER:

let t = new Promise((res, rej) => {
  setTimeout(() => res('settimeout1'), 100);
});

t.then((data) => {
  console.log(data);
  console.log('RES');
  console.log('RES1');
});

// EXERCISE-
// Есть код! Почему строчка с комментарием покажет {misha: NADUSHA}! Сделать так чтобы a.getObject(); вернул {misha: 'misha'}
// то есть должны быть независимые обьекты!!

function newFactory(obj) {
  var object = obj;
  return {
    getObject: function() {
      return object;
    }
  };
}

var a = newFactory({misha: 'misha'});

var k = a.getObject();

k.misha = 'NADUSHA'; 

a.getObject(); // КОММЕНТАРИЙ!!! покажет NADUSHA 

// ANSWER:

function newFactory(obj) {
  var object = obj;
  return {
    getObject: function() {
      return Object.assign({}, object); // можно и так {...object}
    }
  };
}

var a = newFactory({misha: 'misha'});

var k = a.getObject();

k.misha = 'NADUSHA'; 

a.getObject(); 

// Объект является ссылочным типом данных, когда мы его меняем, меняется и его ссылка,
// поэтому нужно сделать два независимых объекта с помощью Object.assign().
// Значит функция getObject должна вернуть не сам объект, а его копию.