

const Pagination = ({ recipesPerPage, totalRecipes, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
        pageNumbers.push(i)
    }


    return (
        <div>
            <ul className="pagination">
                {
                    pageNumbers.map(number => (
                        <li className={ (currentPage == number) ? 'page-item page-item_active' : 'page-item'} 
                            key={number}
                        >
                            <a className={ (currentPage == number) ? 'page-link page-link_active' : 'page-link'} 
                                onClick={() => paginate(number)}> 
                                {number} 
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Pagination