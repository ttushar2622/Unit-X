import { useContext , useState , useEffect } from "react";
import Loader from "../Components/Loader";
import { AuthContext } from "../Context/AuthContext";
import ProductList from "../Components/ProductList";
import Pagination from "../Components/Pagination";

const getProducts =  async ({ page=1 , sortBy="asc"}) => {
  const res = await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?page=${page}&orderBy=${sortBy}&limit=10`);
  return await res.json();
};

function Dashboard() {
  const {authState , logoutUser} = useContext(AuthContext);
  const [loading , setLoading] = useState(false);
  const [err , setErr] = useState(false);
  const [products , setProducts] = useState([]);
  const [totalPages , setTotalPages] = useState(1);
  const [page , setPage] = useState(1);
  const [sortBy , setSortBy] = useState("asc");

  useEffect(()=>{
    setLoading(true);
    getProducts({
      page , 
      sortBy
    })
    .then((res)=>{
      setProducts(res.data);
      setLoading(false);
      setTotalPages(res.totalPages);
    })
    .catch((err)=>{
      setErr(true);
    })
  } , [ page , sortBy ]);
//  console.log(page)
  return (
    <div>
      <h3>Dashboard</h3>
      <div>
        <button data-testid="logout-btn" onClick={logoutUser}>Logout</button>
        <p>
          Token:
          <b data-testid="user-token">{authState.token}</b>
        </p>
      </div>
      <br />
      <div data-testid ="sort-container">
      <button data-testid="low-to-high" disabled={sortBy==="asc"} onClick={()=>setSortBy("asc")}>Sort low to high</button>
      <button data-testid="high-to-low" disabled={sortBy==="desc"} onClick={()=>setSortBy("desc")}>Sort high to low</button>
      </div>
      <br />
      <br />
      <Pagination current={page} totalPage={totalPages} onChange={page=>setPage(page)}></Pagination>
      <div style={{ display: "flex", justifyContent: "center" }}>
        { loading ? <Loader /> : <ProductList products={products && products}></ProductList>}
      </div>   
    </div>
  );
}

export default Dashboard;