'use strict'

const text = document.querySelector('p').textContent;
const regexp = /(\W)(')(\w|\B)/gm;
const newText = text.replace(regexp, '$1"$3');
document.querySelector('p').textContent = newText;
