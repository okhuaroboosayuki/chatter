import "../styles/scss/confirm.scss";

export const Confirmation = () => {
  return (
    <section className="confirm">
      <div className="top">
        <h2>Enter confirmation code</h2>
        <p>
          We emailed you a code. Please input the code here for account
          verification
        </p>
      </div>
      <div className="bottom">
        <form className="num_input_form">
          <div className="inputs">
            <div className="num_input_wrapper">
              <input type="number" name="" id="" className="num_input" />
            </div>
            <div className="num_input_wrapper">
              <input type="number" name="" id="" className="num_input" />
            </div>
            <div className="num_input_wrapper">
              <input type="number" name="" id="" className="num_input" />
            </div>
            <div className="num_input_wrapper">
              <input type="number" name="" id="" className="num_input" />
            </div>
          </div>
          <button type="submit" className="confirm_submit">Create Account</button>
        </form>
      </div>
    </section>
  );
};
