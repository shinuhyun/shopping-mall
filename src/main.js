'use strict';

// Fetch API로 JSON file에서 items를 가져와서 파싱한다.
function loadItems() {
  return fetch('data/data.json')
    .then((response) => response.json())
    .then((json) => json.items);
}

// items를 받아와서 createHTMLString함수에서 만들어진 li들을 ul안에 넣는다.
function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map((item) => createHTMLString(item)).join('');
}

//items 안의 item을 가져와서 필요한 정보들로 li 만든다.
function createHTMLString(item) {
  return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

// button에 맞춰 filter한 배열을 만들어서 displayItems에 전달한다.
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  // early-exit
  if (key == null || value == null) {
    return;
  }

  const filtered = items.filter((item) => item[key] === value);
  displayItems(filtered);
}

// items들을 가져와서 logo랑 buttons들에 click event를 걸어준다.
function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');

  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', (event) => onButtonClick(event, items));
}

// main
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
