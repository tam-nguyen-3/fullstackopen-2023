const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <>
    <Part name={props.parts[0].name} exercises={props.parts[0].exercises}></Part>
    <Part name={props.parts[1].name} exercises={props.parts[1].exercises}></Part>
    <Part name={props.parts[2].name} exercises={props.parts[2].exercises}></Part>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
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
      <Total parts={course.parts}></Total>
    </div>
  )
}

// const App = () => {
//   const course = 'Half Stack application development'
//   const contents = [
//     { part: 'Fundamentals of React', exercise: 10},
//     { part: 'Using props to pass data', exercise: 7},
//     { part: 'State of a component', exercise: 14}
//   ]

//   return (
    // <div>
    //   <Header course={course}></Header>
    //   <Content contents={contents}></Content>
    //   <Total contents={contents}></Total>
    // </div>
//   )
// }

// <Part course={props.contents[1].part} exercise={props.contents[1].exercise}></Part>
// <Part course={props.contents[2].part} exercise={props.contents[2].exercise}></Part>


export default App