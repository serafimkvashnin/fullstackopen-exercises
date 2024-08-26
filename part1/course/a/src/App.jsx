const App = () => {
  const now = new Date()
  return (
    <>
      <p>RRRReactive app! {now.toString()}</p>
      <Card>
        < ProfileIcon src={"src/assets/react.svg"} alt={"React logo"} />
      </Card>
      < ProfileIcon src={"src/assets/react.svg"} alt={"React logo"} />
      < ProfileIcon src={"src/assets/react.svg"} alt={"React logo"} />
      < ProfileIcon src={"src/assets/react.svg"} alt={"React logo"} />
      <Hello name="Sima" />
      <HelloProps name={"Simas"} />
    </>
  )
}

const Card = ({children}) => {
  return (
    <div className="card">
      {children}
    </div>
  )
}


const HelloProps = (props) => {
  return (
    <div>
      <p>Hello {props.name}!</p>
    </div>
  )
}

const Hello = ({ name }) => {
  const names = ['Pider', 'Poter']
  return [
    <p>Hello {name} {names}!</p>
  ]
}

export function ProfileIcon({src, alt}) {
  return (
    <img src={src} alt={alt} />
  )
}

export default App
