import React from "react";
import { Link } from "react-router-dom";

class LocationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
    };
    this.deleteLocation = this.deleteLocation.bind(this);
  }

  async componentDidMount() {
    const shoesUrl = "http://localhost:8100/api/locations/";

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

  async deleteLocation(event) {
    if (window.confirm("Are you sure you want to delete that?")) {
      const deleteUrl = `http://localhost:8100${event.target.value}`;
      const response = await fetch(deleteUrl, { method: "delete" });
      if (response.ok) {
        this.componentDidMount();
      }
    }
  }

  render() {
    return (
      <div className="container mt-5">
        <h1>Here are your current locations...</h1>
        <Link to="/locations/new">
          <button type="button" className="btn btn-success btn-md px-4 mx-1">
            Add location
          </button>
        </Link>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Closet Name</th>
              <th>Location No.</th>
              <th>Location Size</th>
              <th>Location ID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.locations.map((location) => {
              return (
                <tr key={location.href}>
                  <td>{location.closet_name}</td>
                  <td>{location.section_number}</td>
                  <td>{location.shelf_number}</td>
                  <td>{location.id}</td>
                  <td>
                    <button
                      onClick={this.deleteLocation}
                      value={location.href}
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

export default LocationList;
