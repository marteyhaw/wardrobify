import React from "react";
import { Link } from "react-router-dom";

class BinList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bins: [],
    };
    this.deleteBin = this.deleteBin.bind(this);
  }

  async deleteBin(event) {
    if (window.confirm("Are you sure you want to delete that?")) {
      const deleteUrl = `http://localhost:8100${event.target.value}`;
      const response = await fetch(deleteUrl, { method: "delete" });
      if (response.ok) {
        this.componentDidMount();
      }
    }
  }

  async componentDidMount() {
    const binsUrl = "http://localhost:8100/api/bins/";

    try {
      const response = await fetch(binsUrl);
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
        <h1>Here are your current bins...</h1>
        <Link to="/bins/new">
          <button type="button" className="btn btn-success btn-md px-4 mx-1">
            Add bin
          </button>
        </Link>
        <table className="table table-striped table-hover text-center">
          <thead>
            <tr>
              <th>Closet Name</th>
              <th>Bin No.</th>
              <th>Bin Size</th>
              <th>Bin ID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.bins.map((bin) => {
              return (
                <tr key={bin.href}>
                  <td>{bin.closet_name}</td>
                  <td>{bin.bin_number}</td>
                  <td>{bin.bin_size}</td>
                  <td>{bin.id}</td>
                  <td>
                    <button
                      onClick={this.deleteBin}
                      value={bin.href}
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

export default BinList;
