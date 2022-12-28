import React from "react";

class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closet_name: "",
      section_number: "",
      shelf_number: "",
      success: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.success;

    const locationUrl = "http://localhost:8100/api/locations/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      const cleared = {
        closet_name: "",
        section_number: "",
        shelf_number: "",
        success: true,
      };
      this.setState(cleared);
      setTimeout(() => {
        this.setState({ success: false });
      }, 7000);
    }
  }

  handleInputChange(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  render() {
    let addedLocationClasses = "d-none";
    if (this.state.success) {
      addedLocationClasses = "mt-5 container alert alert-success mb-0";
    }

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new location</h1>
            <form onSubmit={this.handleSubmit} id="create-location-form">
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleInputChange}
                  value={this.state.closet_name}
                  placeholder="Closet Name"
                  required
                  type="text"
                  name="closet_name"
                  id="closet_name"
                  className="form-control"
                />
                <label htmlFor="closet_name">Closet Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleInputChange}
                  value={this.state.section_number}
                  placeholder="Location number"
                  required
                  type="text"
                  name="section_number"
                  id="section_number"
                  className="form-control"
                />
                <label htmlFor="section_number">Location number</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleInputChange}
                  value={this.state.shelf_number}
                  placeholder="Location size"
                  type="text"
                  name="shelf_number"
                  id="shelf_number"
                  className="form-control"
                />
                <label htmlFor="shelf_number">Location size</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
          <div className={addedLocationClasses} id="added-location-message">
            <p>The location has been created.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default LocationForm;
