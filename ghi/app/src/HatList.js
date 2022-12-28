import React from "react";
import { Link } from "react-router-dom";

class HatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hats: [],
    };
    this.deleteHat = this.deleteHat.bind(this);
  }

  async componentDidMount() {
    const hatsUrl = "http://localhost:8090/api/hats/";

    try {
      const response = await fetch(hatsUrl);
      if (response.ok) {
        const data = await response.json();
        this.setState({ ...data });
      }
    } catch (e) {
      console.error(e);
    }
  }

  async deleteHat(event) {
    if (window.confirm("Are you sure you want to delete that?")) {
      const deleteUrl = `http://localhost:8090${event.target.value}`;
      const response = await fetch(deleteUrl, { method: "delete" });
      if (response.ok) {
        await response.json();
        this.componentDidMount();
      }
    }
  }

  render() {
    return (
      <div className="container mt-5">
        <h1>Your Fabulous Hat Collection...</h1>
        <Link to="/hats/new/">
          <button type="button" className="btn btn-success btn-md px-4 gap-3">
            Add hats
          </button>
        </Link>
        <Link to="/locations/new/">
          <button type="button" className="btn btn-success btn-md px-4 mx-1">
            Add Location
          </button>
        </Link>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Style</th>
              <th>Fabric</th>
              <th>Color</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {this.state.hats.map((hat) => {
              return (
                <tr key={hat.href}>
                  <td>
                    <Link
                      to={`/hats/${hat.id}`}
                      className="text-decoration-none"
                    >
                      {hat.style}
                    </Link>
                  </td>
                  <td>{hat.fabric}</td>
                  <td>{hat.color}</td>
                  <td>{hat.location}</td>
                  <td>
                    <button
                      onClick={this.deleteHat}
                      value={hat.href}
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

export default HatList;
