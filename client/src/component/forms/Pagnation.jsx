import React from 'react'
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi'

function Pagnation({ postsPerPage, totalPosts, paginate, currentPage, maxPageNumLimit, minPageNumLimit, handlePagNext, handlePagPrev }) {
    
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    let pageIncrementBtn = null;
    if (pageNumbers.length > maxPageNumLimit) {
        pageIncrementBtn = <div className='pag_fig' onClick={() => handlePagNext(pageNumbers)}>&hellip;</div>
    }

    let pageDecrementBtn = null;
    if (pageNumbers.length > maxPageNumLimit) {
        pageDecrementBtn = <div className='pag_fig' onClick={() => handlePagPrev(pageNumbers)}>&hellip;</div>
    }


    return (
        <>
            <div className="pag_cont d-f">
                <div className="pag_fig" onClick={() => handlePagPrev(pageNumbers)}> <BiChevronsLeft size={27} /> Prev</div>
                {pageDecrementBtn}
                {
                    pageNumbers.map((number, i) => {
                        if (number < maxPageNumLimit + 1 && number > minPageNumLimit) {
                            return (
                                <div key={i} className={`pag_fig ${currentPage == number ? 'pag_active' : ''}`} onClick={() => paginate(number)} >{number}</div>
                            )
                        } else {
                            return null
                        }
                    })
                }
                {pageIncrementBtn}
                <div className="pag_fig" onClick={() => handlePagNext(pageNumbers)}>Next <BiChevronsRight size={27} /></div>
            </div>
        </>
    )
}

export default Pagnation