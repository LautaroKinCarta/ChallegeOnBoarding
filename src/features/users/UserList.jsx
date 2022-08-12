import { getProducts } from "./productSlice"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"


export function UserList() {
  const dispatch = useDispatch();
  
  const products = useSelector((state) => state.products.all);
  const loading = useSelector((state) => state.products.loading);

  return (
    <div className="container">
      <div className="row">
        <h1>Administration Panel - Lux Watches</h1>
      </div>
      <div className="row">
        <div className="two columns">
          <button
            onClick={() => dispatch(getProducts())}
            className="button-primary"
          >
            Load Watches
          </button>
        </div>
        <div className="two columns">
          <Link to="/add-user">
            <button className="button-primary">Add Watch</button>
          </Link>
        </div>
      </div>
      <div className="row">
        {loading ? (
          "Loading..."
        ) : (
          <table className="u-full-width">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length &&
                products.map(({ id, name, price }, i) => (
                  <tr key={i}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{price}</td>
                    <td>
                      <button>Delete</button>
                      <Link to={`/edit-user/${id}`}>
                        <button>Edit</button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}