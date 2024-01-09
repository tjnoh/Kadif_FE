export interface PageInfo {
    items:number,
    pageSize:number,
    currentPage:number
}

const Pagination = (pageInfo:PageInfo) => {
    const {items,pageSize,currentPage} = pageInfo;
    
    const pageCount = Math.ceil(items/pageSize);

}

export default Pagination;

