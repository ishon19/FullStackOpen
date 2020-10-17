import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => <h1>{props.courseName}</h1>;

const Content = () => (
  <div>
    <Part part="Fundamentals of React" excercises={10} />
    <Part part="Using props to pass data" excercises={7} />
    <Part part="State of a component" excercises={14} />
  </div>
);

const Part = (props) => (
  <p>
    {props.part} {props.excercises}
  </p>
);

const Total = (props) => {
  var total = 0;
  props.excercises.map((item, idx) => (total += item));
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  return (
    <div>
      <Header courseName="Half Stack application development" />
      <Content />
      <Total excercises={[10, 7, 14]} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
