const t = [1, 'text', -1];

t.push(true);

console.log(t.length);
console.log(t[1]);

t.forEach((value, i, array) => {
    console.log(value, i, array);
})

const t2 = t.concat(2, 5);
console.log(t2);

console.log(t2.map((item, i) => '<li>' + item + '</li>'))

let a, b, c;
[a, b, ...c] = t2;
console.log(a, b, c);