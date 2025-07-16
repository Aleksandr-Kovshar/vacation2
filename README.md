<!-- логика на JS -->

let available = 1; // Доступно днів
let used = 1; // Використано днів
const remaining = available - used; // Залишилось днів

const maxNotDivide = 14;
const maxDivide = 13;
const totalMax = maxNotDivide + maxDivide; // 27

let usedNotDivide = 0;
let usedDivide = 0;

// Можно использовать сейчас подільних/не подільних:
let NotDivide = 0;
let Divide = 0;
let NotDivide_Alt = 0;
let Divide_Alt = 0;

// Остаток общий на год:

let remainderNotDivide = 0;
let remainderDivide = 0;
let remainderTotal = remainderNotDivide + remainderDivide;

function calculate(available, used, remaining) {
const basicInformation = `Всього на рік надається ${totalMax} днів відпустки.  Із них ${maxNotDivide} можна використати тільки неподільно підряд, ${maxDivide} як завгодно.`;

// if (used >= maxNotDivide) {
// usedNotDivide = maxNotDivide;
// } else {
// usedNotDivide = 0;
// }

// if (used === maxDivide || used === totalMax) {
// usedDivide = maxDivide;
// } else if (used < maxDivide) {
// usedDivide = used;
// } else if (used > maxDivide) {
// usedDivide = used - usedNotDivide;
// }

if (used === 0) {
usedNotDivide = 0;
usedDivide = 0;
} else if (used > 0 && used < maxDivide) {
usedNotDivide = 0;
usedDivide = used;
} else if (used === maxDivide) {
usedNotDivide = 0;
usedDivide = used - usedNotDivide;
} else if (used === maxNotDivide) {
usedNotDivide = maxNotDivide;
usedDivide = used - usedNotDivide;
} else if (used > maxNotDivide && used < totalMax) {
usedNotDivide = maxNotDivide;
usedDivide = used - usedNotDivide;
} else if (used === totalMax) {
usedNotDivide = maxNotDivide;
usedDivide = maxDivide;
}

message = `Використано ${usedDivide} днів подільної відпустки і ${usedNotDivide} неподільної відпустки`;

// Общий остаток на год подільних і неподільних
remainderNotDivide = maxNotDivide - usedNotDivide;
remainderDivide = maxDivide - usedDivide;

// Вычисляем что сейчас можно использовать, включая альтернативу

if (maxDivide - usedDivide >= remaining) {
Divide = remaining;
} else {
Divide = maxDivide - usedDivide;
}

NotDivide = remaining - Divide;

if (remaining >= maxNotDivide) {
NotDivide_Alt = maxNotDivide;
Divide_Alt = remaining - NotDivide_Alt;
}

console.log(message);

console.log(
`Доступно на зараз подільної: ${Divide}, Неподільної: ${NotDivide} АБО подільної: ${Divide_Alt}, Неподільної: ${NotDivide_Alt} `
);

return message;
}

calculate(available, used, remaining);

function findUserMassage(
available,
used,
remaining,
usedNotDivide,
usedDivide,
NotDivide,
Divide,
NotDivide_Alt,
Divide_Alt
) {
let userMassage = "";

if (available === 0) {
userMassage = "У тебе ще немає доступних днів відпустки";
} else if (usedDivide === maxDivide && usedNotDivide === maxNotDivide) {
userMassage = "Вся відпустка вже використана";
} else if (remaining === 0) {
userMassage = "У тебе ще немає доступних днів відпустки";
} else if (Divide !== 0 && NotDivide === 0) {
userMassage = `Є ${Divide} днів подільної відпустки`;
} else if (Divide === 0 && NotDivide !== 0 && NotDivide !== maxNotDivide) {
userMassage = `Є ${NotDivide} днів неподільної відпустки, для використання якої потрібно мати ${maxNotDivide} днів`;
} else if (Divide === 0 && NotDivide !== 0 && NotDivide === maxNotDivide) {
userMassage = `Доступно для використання ${NotDivide} днів неподільної відпустки.`;
} else if (
Divide !== 0 &&
NotDivide !== 0 &&
NotDivide === 14 &&
NotDivide_Alt === 0
) {
userMassage = `Доступно для використання ${NotDivide} днів неподільної відпустки і ${Divide} днів подільної відпустки.`;
} else if (
Divide !== 0 &&
NotDivide !== 0 &&
NotDivide < 14 &&
NotDivide_Alt === 0
) {
userMassage = `Можна використати ${Divide} днів подільної відпустки і є ${NotDivide} днів неподільної відпустки, для використання якої потрібно мати ${maxNotDivide} днів.`;
} else if (
Divide !== 0 &&
NotDivide !== 0 &&
NotDivide < 14 &&
NotDivide_Alt !== 0
) {
userMassage = `Можна використати ${NotDivide_Alt} днів неподільної відпустки і ${Divide_Alt} днів подільної. АБО ${Divide} днів подільної відпустки і залишиться ${NotDivide} днів неподільної відпустки, для використання якої потрібно мати ${maxNotDivide} днів.`;
} else if (
Divide !== 0 &&
NotDivide !== 0 &&
NotDivide === 14 &&
NotDivide_Alt !== 0
) {
userMassage = `Можна використати ${Divide} днів подільної відпустки і ${NotDivide} днів неподільної відпустки.`;
} else {
userMassage = "Щось пішло не так, перевір дані";
}

console.log(userMassage);
return userMassage;
}

findUserMassage(
available,
used,
remaining,
usedNotDivide,
usedDivide,
NotDivide,
Divide,
NotDivide_Alt,
Divide_Alt
);
