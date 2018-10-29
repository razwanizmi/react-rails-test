// 3. Write a react form to update user profile.
// Fields: first name, last name, email, birth date, preferred job title, number
// of years experience
// send data to dummy end point https://api.dummyendpoint/me/profile with http
// PUT
// validate fields name and email to be required

// NOTE: App demo on https://codepen.io/razwanizmi/full/OBGmvO/

import React, { Component } from "react";

const API_URL = "https://api.dummyendpoint/me/profile";

class App extends Component {
  state = {
    errors: {},
    formValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      jobTitle: "",
      yearsExperience: 0
    },
    submitted: false
  };

  // handleChange is an event handler for all filed inputs.
  handleChange = e => {
    const { name, value } = e.target;

    this.setState(({ formValues }) => ({
      formValues: { ...formValues, [name]: value }
    }));
  };

  // handleSubmit validates and submits the form to the API endpoint. Then it
  // updates the form submitted state if succesful.
  handleSubmit = async e => {
    e.preventDefault();

    if (!this.validate()) return;

    const res = await fetch(API_URL, {
      body: JSON.stringify({ post: this.state.formValues }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST"
    });

    if (!res.ok) return;

    this.setState(() => ({ submitted: true }));
  };

  // validate checks the form and updates its error state. It returns true if no
  // error is found or false otherwise.
  validate = () => {
    const {
      formValues: { firstName, lastName, email }
    } = this.state;

    const errors = {};
    if (!firstName) {
      errors.firstName = "First name can't be blank";
    }
    if (!lastName) {
      errors.lastName = "Last name can't be blank";
    }
    if (!email) {
      errors.email = "Email can't be blank";
    }

    this.setState(() => ({ errors }));

    if (Object.keys(errors).length === 0) {
      return true;
    }

    return false;
  };

  render() {
    const { errors, formValues, submitted } = this.state;

    // Show success screen if form has been successfully submitted.
    if (submitted) {
      return (
        <div className="container">
          <h1>Form successfully submitted</h1>
        </div>
      );
    }

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formValues.firstName}
              onChange={this.handleChange}
            />
            {errors.firstName && (
              <span className="form-error">{errors.firstName}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formValues.lastName}
              onChange={this.handleChange}
            />
            {errors.lastName && (
              <span className="form-error">{errors.lastName}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formValues.email}
              onChange={this.handleChange}
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="birthDate">Birth date</label>
            <input
              type="date"
              name="birthDate"
              id="birthDate"
              value={formValues.birthDate}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobTitle">Preferred job title</label>
            <input
              type="text"
              name="jobTitle"
              id="jobTitle"
              value={formValues.jobTitle}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="yearsExperience">Years of experience</label>
            <input
              type="number"
              name="yearsExperience"
              id="yearsExperience"
              value={formValues.yearsExperience}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default App;
