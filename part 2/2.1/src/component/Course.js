const Course = ({ course }) => {
    const total = course.parts.reduce((previousValue, currentValue) => previousValue + currentValue.exercises, 0)
    return (
        <div>
            <h1>{course.name}</h1>
            {
                course.parts.map(course =>
                    <div key={course.id}>
                        <h3>{course.name}</h3>
                        <p>{course.exercises}</p>
                    </div>
                )
            }
            <strong><p>Total of {total} exercises.</p></strong>
            <hr />
        </div>
    )
}

export default Course