const Header = ({course}) => <h1>{course}</h1>

const Total = ({sum}) => <p>Number of exercises {sum}</p>

const Part = ({part}) =>  <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => {
  return (
    <>
    <Part part={parts[0]}></Part>
    <Part part={parts[1]}></Part>
    <Part part={parts[2]}></Part>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total sum={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}></Total>
    </div>
  )
}

export default App