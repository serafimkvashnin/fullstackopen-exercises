const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name:'Fundamentals of React', 
        count:10
      },
      {
        name:'Using props to pass data', 
        count:7
      },
      {
        name:'State of a component', 
        count:14
      }
    ],
  }

  course.total = {
    name: 'Number of exercises',
    count: course.parts.reduce((sum, part) => sum + part.count, 0)
  }

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.total} />
    </>
  )
}

const Header = ({ course }) => <h1>{course}</h1>

const Content = ({ parts }) => parts.map((exercise, i) => <Part key={i} exercise={exercise}/>)

const Part = ({ exercise }) => <p> {exercise.name} {exercise.count} </p>

const Total = ({ total }) => <p>{total.name} {total.count}</p>

export default App
