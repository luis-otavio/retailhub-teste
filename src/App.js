import { useEffect, useState } from "react";
import Items from "./components/Items";
import "./styles.css";

// 1. fazer um fetch da api https://jsonplaceholder.typicode.com/todos
// 2. não usar axios ou qualquer outra lib, usar diretamente o fetch
// 3. pegar o resultado e mostrar na pagina:
//    - ID e Título
//    - com flexbox deixar o ID a esquerda e os títulos a direita
// 4. fazer uma filtragem: exibir apenas títulos com a primeira letra S
// 5. adicionar um background cinza nas linhas pares com JS
// 6. implementar paginação, botão de próximo e anterior, de 2 em 2

export default function App() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterActive, setFilterActive] = useState(false);
  const itemsPerPage = 2;

  async function fetchData() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();
    return data;
  }

  useEffect(() => {
    fetchData().then((data) => {
      data && setItems(data);
    });
  }, []);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filterItems = () => {
    setFilterActive(!filterActive)
    if (!filterActive) {
      const filteredData = items.filter(item => item.title.startsWith('S'));
      setItems(filteredData)
    } else {
      fetchData().then((data) => {
        data && setItems(data);
      });
    }
  }

  const paginatedItems = items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="App">
      <h1>Retailhub Teste</h1>
      <button className="btn-filter" onClick={filterItems}>
        {!filterActive ? 'Filtrar' : 'Limpar filtro'}
      </button>
      <Items data={paginatedItems} />
      <button className="btn-pagination" onClick={prevPage} disabled={currentPage <= 0}>Anterior</button>
      <button className="btn-pagination" onClick={nextPage} disabled={items.length <= (currentPage + 1) * itemsPerPage}>Próximo</button>
    </div>
  );
}
