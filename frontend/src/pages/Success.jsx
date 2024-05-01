import "../styles/success.css";

function Success() {
  return (
    <section className="success-section flex-center">
      <div className="success-container flex-center">
        <h2 className="form-heading">Appointment Booked Successfully!</h2>
        <h3 className="appointment-message">You will be redirected to the home page shortly.</h3>
      </div>
    </section>
  );
  }

export default Success;