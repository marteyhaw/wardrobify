import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function withExtras(Component) {
  return (props) => (
    <Component {...props} params={useParams()} useNavigate={useNavigate()} />
  );
}

class ShoeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bin: {},
      model_name: "x",
    };
    this.deleteShoe = this.deleteShoe.bind(this);
  }

  async deleteShoe(event) {
    if (window.confirm("Are you sure you want to delete that?")) {
      const deleteUrl = `http://localhost:8080${event.target.value}`;
      const response = await fetch(deleteUrl, { method: "delete" });
      if (response.ok) {
        this.setState({ deleted: true });
        setTimeout(() => {
          this.props.useNavigate("/shoes/");
        }, 3000);
      }
    }
  }

  async componentDidMount() {
    let { id } = this.props.params;
    const detailUrl = `http://localhost:8080/api/shoes/${id}/`;
    try {
      const response = await fetch(detailUrl);
      if (response.ok) {
        const data = await response.json();
        this.setState({ ...data });
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    let containerClasses = "mt-5 container";
    let deletedClasses = "d-none";
    let shoeNotFoundClasses = "d-none";
    if (!this.state.model_name) {
      containerClasses = "d-none";
      shoeNotFoundClasses = "mt-5 container alert alert-danger mb-0";
    }
    if (this.state.deleted) {
      containerClasses = "d-none";
      deletedClasses = "mt-5 container alert alert-success mb-0";
    }
    let spinnerClasses = "d-flex justify-content-center mb-3";
    if (this.state.picture_url) {
      spinnerClasses = "d-none";
    }

    return (
      <>
        <div className={containerClasses} style={{ width: "500px" }}>
          <div className="card mb-3 shadow">
            <img
              src={this.state.picture_url}
              alt={this.state.model_name}
              className="card-img-top"
            />
            <div className={spinnerClasses} id="loading-conference-spinner">
              <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            <div className="card-body">
              <h5 className="card-title">{this.state.model_name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {this.state.manufacturer}
              </h6>
              <p className="card-text">{this.state.color}</p>
            </div>
            <div className="card-footer">
              Closet {this.state.bin.closet_name} | Bin No.{" "}
              {this.state.bin.bin_number} | Bin ID. {this.state.bin.id}
            </div>
            <button
              onClick={this.deleteShoe}
              value={this.state.href}
              className="border-danger"
            >
              Delete
            </button>
          </div>
        </div>
        <div className={deletedClasses} id="deleted-message">
          The shoe has been deleted.{" "}
          <Link to={`/shoes/`} className="text-decoration-none">
            ↩Return to shoe list
          </Link>{" "}
          or redirecting in a few seconds...
        </div>
        <div className={shoeNotFoundClasses} id="not-found-message">
          Shoe not found.
        </div>
      </>
    );
  }
}

export default withExtras(ShoeDetail);
