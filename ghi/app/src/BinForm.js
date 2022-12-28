import React from "react";

class BinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closet_name: "",
      bin_number: "",
      bin_size: "",
      success: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.success;

    const binUrl = "http://localhost:8100/api/bins/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(binUrl, fetchConfig);
    if (response.ok) {
      const cleared = {
        closet_name: "",
        bin_number: "",
        bin_size: "",
        success: true,
      };
      this.setState(cleared);
      setTimeout(() => {
        this.setState({ success: false });
      }, 2000);
    }
  }

  handleInputChange(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  render() {
    let addedBinClasses = "d-none";
    if (this.state.success) {
      addedBinClasses = "mt-5 container alert alert-success mb-0";
    }

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new bin</h1>
            <form onSubmit={this.handleSubmit} id="create-bin-form">
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
                  value={this.state.bin_number}
                  placeholder="Bin number"
                  required
                  type="text"
                  name="bin_number"
                  id="bin_number"
                  className="form-control"
                />
                <label htmlFor="bin_number">Bin number</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleInputChange}
                  value={this.state.bin_size}
                  placeholder="Bin size"
                  type="text"
                  name="bin_size"
                  id="bin_size"
                  className="form-control"
                />
                <label htmlFor="bin_size">Bin size</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
          <div className={addedBinClasses} id="added-bin-message">
            <p>The bin has been created.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default BinForm;
