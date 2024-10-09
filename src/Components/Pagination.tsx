
import React, { MouseEventHandler } from 'react'
import '../CSS/Pagination.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

interface paginationprops_Type {
    totalPages: number | undefined,
    handlePage: (number: number) => void,
    minimumPagelimit: number,
    maximumPagelimit: number,
    handlePrevious: () => void,
    handleNext: () => void,
    currentPage: number,
}

export default function Pagination(props: paginationprops_Type) {

    let pageValue: number[] = [];
    let endElement, startElement;
    if (props.totalPages) {

        for (let i = 1; i <= props.totalPages; i++) {
            pageValue.push(i)
        }
    }
    endElement = pageValue[pageValue.length - 1]
    startElement = pageValue[0]
    console.log(endElement, "end element", props.minimumPagelimit, props.maximumPagelimit)


    return (
        <div className='pagination_outer'>
            {props.minimumPagelimit > startElement && <button className='prev_btn' onClick={props.handlePrevious}><i className='fas fa-chevron-left prev_next' /></button>}
            {pageValue.length > 1 && pageValue.map(number =>

            (number > props.minimumPagelimit && number <= props.maximumPagelimit && 

                <div className='pagination_inner'
                    key={number}
                    onClick={() => props.handlePage(number)}>
                    <div className={number === props.currentPage ? 'selected' : 'selected_all'}>{number}</div>

                </div>
            ))}

            {props.maximumPagelimit < endElement && <button className='next_btn' onClick={props.handleNext}><i className='fas fa-chevron-right prev_next' /></button>}
        </div>
    )
}