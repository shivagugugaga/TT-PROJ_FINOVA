import { memo } from "react";

const PageInfo = memo(({ info, onPrevClick, onNextClick, pageNumber, noOfPages }) => {
    const isFirstPage = pageNumber === 0;
    const isLastPage = pageNumber + 1 >= noOfPages;

    return (
        <div className="page-info pagination-control">
            <span className="page-info-label">{info}</span>
            <div className="pagination-btn-group">
                <button 
                    type="button"
                    onClick={onPrevClick} 
                    disabled={isFirstPage}
                    className={`pagination-nav-btn ${isFirstPage ? "disable" : ""}`}
                    aria-label="Previous Page"
                >
                    <i className='fa-solid fa-chevron-left' aria-hidden='true'></i>
                </button>
                <button 
                    type="button"
                    onClick={onNextClick} 
                    disabled={isLastPage}
                    className={`pagination-nav-btn ${isLastPage ? "disable" : ""}`}
                    aria-label="Next Page"
                >
                    <i className='fa-solid fa-chevron-right' aria-hidden='true'></i>
                </button>
            </div>
        </div>
    );
});

export default PageInfo;