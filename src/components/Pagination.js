import React from "react";
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.css';

const pagination = ({pageCount, currentPage, onPageChange}) => {
    // console.log('Pagination props are', pageCount, currentPage);

    var cells = [];

    if (pageCount < 5) {
        for (let i = 1; i <= pageCount; i++) {
            cells.push(<Pagination.Item key={i} active={i === currentPage} onClick={() => onPageChange({target:String(i)})}>{i}</Pagination.Item>)
        }
    } else {
        if(currentPage <= 2) {
            for (let i = 1; i <= 5; i++) {
                cells.push(<Pagination.Item key={i} active={i === currentPage} onClick={() => onPageChange({target:String(i)})}>{i}</Pagination.Item>)
            }
        } else if (currentPage > pageCount - 2) {
            for (let i = pageCount - 5; i <= pageCount; i++) {
                cells.push(<Pagination.Item key={i} active={i === currentPage} onClick={() => onPageChange({target:String(i)})}>{i}</Pagination.Item>)
            }
        } else {
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                cells.push(<Pagination.Item key={i} active={i === currentPage} onClick={() => onPageChange({target: String(i)})}>{i}</Pagination.Item>)
            }
        }
    }
    return (
        <div>
            <Pagination style={{flexDirection: 'row', paddingLeft: '35%', width: '40%'}}>
                <Pagination.First disabled={currentPage === 1} onClick={currentPage === 1 ? null : () => onPageChange({target:'First'})}/> 
                <Pagination.Prev disabled={currentPage === 1} onClick={currentPage === 1 ? null : () => onPageChange({target: 'Previous'})}/>
                {currentPage > 3 ? <Pagination.Ellipsis disabled href='#/row'/>: null}
                {cells}
                {currentPage < pageCount - 2 ? <Pagination.Ellipsis disabled/>: null}
                <Pagination.Next disabled={currentPage === pageCount} onClick={currentPage === pageCount ? null : () => onPageChange({target: 'Next'})}/>
                <Pagination.Last disabled={currentPage === pageCount} onClick={currentPage === pageCount ? null : () => onPageChange({target:'Last'})}/>
            </Pagination>
        </div>
    );
}

export default pagination;