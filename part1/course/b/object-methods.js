const arto = {
    name: 'Arto Hellas',
    age: 35,
    greet: function() {
        console.log('Hello, my name is ' + this.name)
    }
}

greetRef = arto.greet.bind(arto)
//greetRef()

function func() {
    console.log(this === global);
}

const obj = new func();
console.log(obj)