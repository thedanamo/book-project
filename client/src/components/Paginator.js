import Pagination from "react-bootstrap/Pagination";

function Paginator({ active, lastPage, setPage }) {
  let items = [];
  for (let number = 1; number <= lastPage; number++) {
    items.push(
      <Pagination.Item
        onClick={() => {
          setPage(number);
        }}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );
}

export default Paginator;
