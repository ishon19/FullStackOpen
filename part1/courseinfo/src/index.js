import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => <h1>{props.courseName}</h1>;

const Content = (props) => (
  <div>
    {props.parts.map((element) => (
      <Part part={element.name} excercises={element.exercises} />
    ))}
  </div>
);

const Part = (props) => (
  <p>
    {props.part} {props.excercises}
  </p>
);

const Total = (props) => {
  var total = 0;
  props.parts.map((element) => (total += element.exercises));
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
