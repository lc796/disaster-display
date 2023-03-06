const SearchFilter = () => {
    return (
        <section className="SearchFilter map-card">
            <h3>Search Filter</h3>
            <select id="disaster-filter">
                <label>Filter by disaster</label>
                <option>Earthquake</option>
                <option>Hurricane</option>
                <option>Tsunami</option>
            </select>
        </section>
    )
}

export default SearchFilter;