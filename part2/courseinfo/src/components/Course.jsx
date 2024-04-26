const Header = ({course}) => <h2>{course}</h2>

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p><b>total of {total} exercises</b></p>
  )
}

const Part = ({part}) =>  <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => {
  return (
    <>
    {parts.map((part) => <Part key={part.id} part={part}></Part>)}
    </>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}

export default Course