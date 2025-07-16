import React, { useState, useEffect } from "react";
import "./VacationCalculator.css";

export default function VacationCalculator() {
  const [available, setAvailable] = useState(0);
  const [used, setUsed] = useState(0);
  const [message, setMessage] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const maxNotDivide = 14;
  const maxDivide = 13;
  const totalMax = maxNotDivide + maxDivide;

  const handleCalculate = () => {
    const remaining = available - used;

    let usedNotDivide = 0;
    let usedDivide = 0;
    let NotDivide = 0;
    let Divide = 0;
    let NotDivide_Alt = 0;
    let Divide_Alt = 0;
    let remainderNotDivide = 0;
    let remainderDivide = 0;
    let remainderTotal = remainderNotDivide + remainderDivide;

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

    const msg = `Використано ${usedDivide} днів подільної відпустки і ${usedNotDivide} неподільної відпустки`;
    setMessage(msg);

    remainderNotDivide = maxNotDivide - usedNotDivide;
    remainderDivide = maxDivide - usedDivide;
    remainderTotal = remainderNotDivide + remainderDivide;

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

    let userMsg = "";
    if (available === 0) {
      userMsg = "У тебе ще немає доступних днів відпустки";
    } else if (usedDivide === maxDivide && usedNotDivide === maxNotDivide) {
      userMsg = "Вся відпустка вже використана";
    } else if (remaining === 0) {
      userMsg = "У тебе ще немає доступних днів відпустки";
    } else if (Divide !== 0 && NotDivide === 0) {
      userMsg = `Є ${Divide} днів подільної відпустки`;
    } else if (Divide === 0 && NotDivide !== 0 && NotDivide !== maxNotDivide) {
      userMsg = `Є ${NotDivide} днів неподільної відпустки, для використання якої потрібно мати ${maxNotDivide} днів`;
    } else if (Divide === 0 && NotDivide === maxNotDivide) {
      userMsg = `Доступно для використання ${NotDivide} днів неподільної відпустки.`;
    } else if (
      Divide !== 0 &&
      NotDivide !== 0 &&
      NotDivide === 14 &&
      NotDivide_Alt === 0
    ) {
      userMsg = `Доступно для використання ${NotDivide} днів неподільної відпустки і ${Divide} днів подільної відпустки.`;
    } else if (
      Divide !== 0 &&
      NotDivide !== 0 &&
      NotDivide < 14 &&
      NotDivide_Alt === 0
    ) {
      userMsg = `Можна використати ${Divide} днів подільної відпустки і є ${NotDivide} днів неподільної відпустки, для використання якої потрібно мати ${maxNotDivide} днів.`;
    } else if (
      Divide !== 0 &&
      NotDivide !== 0 &&
      NotDivide < 14 &&
      NotDivide_Alt !== 0
    ) {
      userMsg = `Можна використати ${NotDivide_Alt} днів неподільної відпустки і ${Divide_Alt} днів подільної. АБО ${Divide} днів подільної відпустки і залишиться ${NotDivide} днів неподільної відпустки, для використання якої потрібно мати ${maxNotDivide} днів.`;
    } else if (
      Divide !== 0 &&
      NotDivide !== 0 &&
      NotDivide === 14 &&
      NotDivide_Alt !== 0
    ) {
      userMsg = `Можна використати ${Divide} днів подільної відпустки і ${NotDivide} днів неподільної відпустки.`;
    } else {
      userMsg = "Щось пішло не так, перевір дані";
    }

    setUserMessage(userMsg);
  };

  return (
    <div className="container">
      <h1>Деталізація відпустки</h1>
      <p>
        Всього на рік надається {totalMax} днів відпустки. Із них {maxNotDivide}{" "}
        можна використати тільки неподільно підряд, {maxDivide} як завгодно.
      </p>
      <div className="row">
        <div>
          <label>Днів доступно:</label>
          <input
            type="number"
            min="0"
            max="27"
            value={available}
            onChange={(e) => setAvailable(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Днів використано:</label>
          <input
            type="number"
            min="0"
            max={available}
            value={used}
            onChange={(e) => setUsed(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Залишилось:</label>
          <input type="number" value={available - used} disabled />
        </div>
      </div>
      <button onClick={handleCalculate}>Отримати додаткову інформацію</button>
      {message && <p className="result">{message}</p>}
      {userMessage && <p className="result alt">{userMessage}</p>}
    </div>
  );
}
