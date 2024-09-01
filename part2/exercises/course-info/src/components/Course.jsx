const Course = ({ course }) => {
    return <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>
}

const Header = ({ name }) => <h2>{name}</h2>

const Content = ({ parts }) => parts.map((part) => 
    <Part 
        key={part.id} 
        part={part}
    />
)

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ parts }) => {
    const exercises = parts.reduce((sum, part) => 
        sum + part.exercises, 0)
    return <strong>Total of {exercises} exercises</strong>
}


export default Course