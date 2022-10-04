

const Numbers = ({ personToShow }) => {
    return (
        <div>
            {personToShow.map((person) => {
                return (
                    <div key={person.id}>
                        <p>{person.name} | {person.number}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Numbers