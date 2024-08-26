const App = () => {
  const course = 'Half Stack application development'

  const exercises = [
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
  ]

  const totalCountText = 'Number of exercises'
  let totalCount = 0
  for (let index = 0; index < exercises.length; index++) {
    const element = exercises[index];
    totalCount += element.count;
  }

  return (
    <>
      <Header course={course} />
      <Content exercises={exercises} />
      <Total text={totalCountText} count={totalCount} />
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
      {exercises.map((exercise, i) => <Part key={i} exerciseName={exercise.name} exerciseCount={exercise.count}/>)}
    </div>
  )
}

const Part = ({ exerciseName, exerciseCount }) => {
  return (
    <p> {exerciseName} {exerciseCount} </p>
  )
}

const Total = ({ text, count }) => {
  return (
    <footer>
      <p>{text} {count}</p>
    </footer>
  )
}

export default App
