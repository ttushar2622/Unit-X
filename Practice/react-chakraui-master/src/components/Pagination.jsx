import React from "react";
import {Button,ButtonGroup,Select} from "@chakra-ui/react";

const Pagination = ({pageFilter,updatePageFilter}) => {
  // TODO: Remove below const and instead import them from chakra
  // const Button = () => <div />;
  // const ButtonGroup = () => <div />;
  // const Select = () => <div />;
  const {pageNumber,limit,totalCount}=pageFilter;

  return (
    <ButtonGroup>
      <Button  disabled={pageNumber===1} onClick={()=>updatePageFilter({pageNumber:1})} data-cy="pagination-first-button">First</Button>
      <Button disabled={pageNumber===1} onClick={()=>updatePageFilter({pageNumber:pageNumber-1})} data-cy="pagination-previous-button">Previous</Button>
      <Select value={limit} onChange={({target})=>updatePageFilter({limit:target.value})} data-cy="pagination-limit-select">
        <option value="3" data-cy="pagination-limit-3">3</option>
        <option value="6" data-cy="pagination-limit-6">6</option>
        <option value="9" data-cy="pagination-limit-9">9</option>
      </Select>
      <Button disabled={pageNumber * limit >  totalCount} onClick={()=>updatePageFilter({pageNumber:pageNumber+1})} data-cy="pagination-next-button">Next</Button>
      <Button disabled={pageNumber * limit >  totalCount} onClick={()=>updatePageFilter({pageNumber:Math.ceil(totalCount/limit)})} data-cy="pagination-last-button">Last</Button>
    </ButtonGroup>
  );
};

export default Pagination;
