class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    greet() {
        console.log('Hello, my name is ' + this.name)
    }
}

const person1 = new Person('Adam', 23)
const person2 = new Person('Briena', 43)
console.log(person1, person2)

person1.greet()
person2.greet()

function PersonAsFunc(name) {
    this.name = name;
    this.greet = () => {
        console.log('Hello, my name is ' + this.name)
    }
}

const person3 = new PersonAsFunc('Josh')
person3.greet()
