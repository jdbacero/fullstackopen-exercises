

const Filter = ({ nameFilter, setNameFilter }) => {
    const handleFilterChange = e => setNameFilter(e.target.value)
    return (
        <div>
            Filter name: <input onChange={handleFilterChange} value={nameFilter} />
        </div>
    )
}

export default Filter