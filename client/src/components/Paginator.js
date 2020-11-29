import Pagination from "react-bootstrap/Pagination";

function Paginator({ active, lastPage, setPage }) {
  console.log(lastPage);
  let items = [];
  for (let number = 1; number <= lastPage; number++) {
    console.log("paginating", number);
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

  console.log(items);

  return (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );
}

export default Paginator;
