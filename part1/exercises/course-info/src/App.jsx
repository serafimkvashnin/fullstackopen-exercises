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
      <Header title={course} />
      <Content exercises={exercises} />
      <Footer text={totalCountText} count={totalCount} />
    </>
  )
}

const Header = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  )
}

const Content = ({ exercises }) => {
  const list = []
  for (let index = 0; index < exercises.length; index++) {
    const exercise = exercises[index];
    list[index] = <p key={index}> {exercise.name} {exercise.count} </p>
  }
  return (
    <div className="content">
      {list}
    </div>
  )
}

const Footer = ({ text, count }) => {
  return (
    <footer>
      <p>{text} {count}</p>
    </footer>
  )
}

export default App
