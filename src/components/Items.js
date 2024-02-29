function Items({ data }) {
  return (
    <>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div
            key={item.id}
            className={`item ${index % 2 === 0 ? "" : "bg-gray"}`}
          >
            <p>{item.id}</p>
            <p>{item.title}</p>
          </div>
        ))
      ) : (
        <div className="data-empty">Nenhum resultado encontrado.</div>
      )}
    </>
  );
}

export default Items;
