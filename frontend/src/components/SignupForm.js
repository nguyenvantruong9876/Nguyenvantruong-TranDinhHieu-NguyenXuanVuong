import React from "react";
import useForm from "./useForm";

const SignupForm = ({submitForm}) => {

  const { handleChange, handleFormSubmit, values, errors } = useForm(submitForm);
  return (      
    <div className="container">
        <div className="app-wrapper">
            <div>
                <h2 className="title">Create Account</h2>
            </div>
            <form className="form-wrapper">
                <div className="name">
                    <label className="lable">Name</label>
                    <input
                      className="input"
                      type="text"
                      name="fullName"
                      value={values.fullName}
                      onChange={handleChange}/>
                    {errors.fullname && <p className="error">{errors.fullname}</p>}
                </div>
                <div className="email">
                    <label className="lable">Email</label>
                    <input
                      className="input"
                      type="email"
                      name="email" 
                      value={values.email}
                      onChange={handleChange}/>
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="password">
                    <label className="lable">Password</label>
                    <input 
                      className="input" 
                      type="password" 
                      name="password" 
                      value={values.password}
                      onChange={handleChange}/>
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <div>
                    <button className="submit" onClick={handleFormSubmit}>
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default SignupForm