import { useNavigate } from "react-router-dom";

const Success = () => {
  const department = sessionStorage.getItem('department');
  const proc = sessionStorage.getItem('proc');
  const dates = sessionStorage.getItem('dates');
  const apptype = sessionStorage.getItem('apptype');
  const doc = sessionStorage.getItem('Doc');
 	const slot = sessionStorage.getItem('Slot');
  const navigate = useNavigate();

  const gohome = async (e) => {
    e.preventDefault();
    try {
    navigate("/");
    }
    catch (error) {
      return error;
    }
  };

  const godoc = async (e) => {
    e.preventDefault();
    try {
    navigate("/doctors");
    }
    catch (error) {
      return error;
    }
  };

  return (
    <section className="success-section flex-center">
      <div className="success-container flex-center">
        <h2 className="form-heading">Appointment Booked</h2>
        <h2 className="form-heading">Successfully!!!</h2>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333'}}>Selected Details</p>
        <div
          className="info-box"
          style={{
            border: '2px solid #666',
            padding: '1rem',
            textAlign: 'left',
            width: '500px', // Set a fixed width
            display: 'inline-block', // Allow the box to scale vertically
          }}
        >
          <p>Department: {department}</p>
          <p>Appointment Date: {dates}</p>
          <p>Appointment Type: {apptype}</p>
          {proc !== '' ? <p>Selected Procedure: {proc}</p> : null}
          <p>Doctor Name: {doc}</p>
          <p>Slot Timing: {slot}</p>
        </div>

        <button
        	className="btn form-btn"
            onClick={godoc}
          >
            Click here to Edit your Booking
          </button>

        <button
        	className="btn form-btn"
            onClick={gohome}
          >
            Click here to go back to homepage
          </button>
      </div>
    </section>
  );
};

export default Success;