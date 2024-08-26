const App = () => {
  const course = 'Half Stack application development'

  const part1 = {
    name:'Fundamentals of React', 
    count:10
  }

  const part2 = {
    name:'Using props to pass data', 
    count:7
  }

  const part3 = {
    name:'State of a component', 
    count:14
  }

  return (
    <>
      <Header course={course} />
      <Content exercises={[part1, part2, part3]} />
      <Total exercises={[part1, part2, part3]} />
    </>
  )
}

const Header = ({ course }) => {
  return (
    <header>
      <h1>{course}</h1>
    </header>
  )
}

const Content = ({ exercises }) => {
  return (
    <div>
      {exercises.map((exercise, i) => <Part key={i} exercise={exercise}/>)}
    </div>
  )
}

const Part = ({ exercise }) => {
  return (
    <p> {exercise.name} {exercise.count} </p>
  )
}

const Total = ({ exercises }) => {
  const totalCount = {
    text:'Number of exercises',
    count:exercises.reduce((sum, item) => sum + item.count, 0)
  }

  return (
    <footer>
      <p>{totalCount.text} {totalCount.count}</p>
    </footer>
  )
}

export default App
