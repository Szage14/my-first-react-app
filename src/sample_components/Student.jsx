import propTypes from 'prop-types';
function Student(props){
    return (
       <div className="student">
              <h2>Name: {props.name}</h2>
              <p>Course: {props.course}</p>
              <p>Age: {props.age}</p>
              <p>Student: {props.isStudent ? "Yes" : "No"}</p>

       </div>
    )
}
Student.propTypes = {
    name: propTypes.string,
    course: propTypes.string,
    age: propTypes.number,
    isStudent: propTypes.bool
}
Student.defaultProps = {
    name: "No name",
    course: "No course",
    age: "No age",
    isStudent: false
}
export default Student;