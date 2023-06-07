const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ parts }) => {
  const exercisesArr = parts.map(part => part.exercises)
  return (
    <b>total of {exercisesArr.reduce((sum, value) => sum + value)} exercises</b>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
  {parts.map(part =>
    <Part key={part.id} part={part}></Part>
  )} 
  </>

const Course = ({course}) => 
  <div>
    <Header name={course.name}></Header>
    <Content parts={course.parts}></Content>
    <Total parts={course.parts}></Total>
  </div>

export default Course