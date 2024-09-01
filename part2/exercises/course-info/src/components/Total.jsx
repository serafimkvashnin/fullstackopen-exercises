const Total = ({ parts }) => {
    const exercises = parts.reduce((sum, part) => 
        sum + part.exercises, 0)
    return <strong>Total of {exercises} exercises</strong>
}

export default Total