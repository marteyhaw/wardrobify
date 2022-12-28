import React from "react";
import { Link } from "react-router-dom";

class ShoeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoes: [],
    };
    this.deleteShoe = this.deleteShoe.bind(this);
  }

  async deleteShoe(event) {
    if (window.confirm("Are you sure you want to delete that?")) {
      const deleteUrl = `http://localhost:8080${event.target.value}`;
      const response = await fetch(deleteUrl, { method: "delete" });
      if (response.ok) {
        await response.json();
        this.componentDidMount();
      }
    }
  }

  async componentDidMount() {
    const shoesUrl = "http://localhost:8080/api/shoes/";

    try {
      const response = await fetch(shoesUrl);
      if (response.ok) {
        const data = await response.json();
        this.setState({ ...data });
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <div className="container mt-5">
        <h1>Your Fabulous Shoe Collection...</h1>
        <Link to="/shoes/new/">
          <button type="button" className="btn btn-success btn-md px-4">
            Add shoes
          </button>
        </Link>
        <Link to="/bins/new/">
          <button type="button" className="btn btn-success btn-md px-4 mx-1">
            Add bin
          </button>
        </Link>
        <table className="table table-striped table-hover text-center">
          <thead>
            <tr>
              <th>Model Name</th>
              <th>Manufacturer</th>
              <th>Color</th>
              <th>Bin ID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.shoes.map((shoe) => {
              return (
                <tr key={shoe.href}>
                  <td>
                    <Link
                      to={`/shoes/${shoe.href.slice(11)}`}
                      className="text-decoration-none"
                    >
                      {shoe.model_name}
                    </Link>
                  </td>
                  <td>{shoe.manufacturer}</td>
                  <td>{shoe.color}</td>
                  <td>{shoe.bin}</td>
                  <td>
                    <button
                      onClick={this.deleteShoe}
                      value={shoe.href}
                      className="btn btn-danger fw-bold"
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ShoeList;
