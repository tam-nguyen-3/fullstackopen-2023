const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ parts }) => {
  console.log()
  return (
    <p>Number of exercises {parts.exercises.reduce((sum, exercise) => sum+exercise)}</p>
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
    {/* <Total parts={course.parts}></Total> */}
  </div>


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}


export default App