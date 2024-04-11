import React, { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import Navbar from "../components/Navbar";
import "../styles/doctors.css";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/rootSlice";
import Empty from "../components/Empty";

// Define your sample data here with department names
const sampleDepartmentsData = [
    {
      _id: 1,
      department: "Cardiology",
      experience: 15,
      mobile: "123-456-7890",
      procedures: ["Echocardiogram", "Angioplasty", "Stress Test"],
    },
    {
      _id: 2,
      department: "Pediatrics",
      experience: 10,
      mobile: "987-654-3210",
      procedures: ["Vaccination", "Child Checkup", "Pediatric Surgery"],
    },
    {
      _id: 3,
      department: "Dermatology",
      experience: 12,
      mobile: "555-555-5555",
      procedures: ["Skin Examination", "Acne Treatment", "Dermabrasion"],
    },
    {
      _id: 4,
      department: "Oncology",
      experience: 18,
      mobile: "111-222-3333",
      procedures: ["Chemotherapy", "Radiation Therapy", "Biopsy"],
    },
    {
      _id: 5,
      department: "Orthopedics",
      experience: 20,
      mobile: "444-444-4444",
      procedures: ["Joint Replacement", "Fracture Repair", "Sports Medicine"],
    },
    {
      _id: 6,
      department: "Psychiatry",
      experience: 8,
      mobile: "777-777-7777",
      procedures: ["Counseling", "Medication Management", "Psychotherapy"],
    },
    {
      _id: 7,
      department: "Neurology",
      experience: 14,
      mobile: "999-999-9999",
      procedures: ["MRI Scan", "Neurosurgery", "Electroencephalogram (EEG)"],
    },
    {
      _id: 8,
      department: "Gynecology",
      experience: 11,
      mobile: "123-123-1234",
      procedures: ["Prenatal Care", "Gynecological Surgery", "Family Planning"],
    },
  ];
  

const Doctors = () => {
  const [departments, setDepartments] = useState(sampleDepartmentsData); // Use the sample data with department names
  const dispatch = useDispatch();

  // Comment out or remove the API call
  // const fetchAllDocs = async () => {
  //   dispatch(setLoading(true));
  //   const data = await axios.get(
  //       'http://localhost:5000/doctors/getalldoctors'
  //   );
  //   setDepartments(data.data);
  //   dispatch(setLoading(false));
  // };

  useEffect(() => {
    // Comment out or remove the API call
    // fetchAllDocs();
  }, []);

  return (
    <>
      <Navbar />
        <section className="container doctors">
          <h2 className="page-heading">Our Departments</h2>
          {departments.length > 0 ? (
            <div className="doctors-card-container">
              {departments.map((ele) => (
                <DoctorCard
                  ele={ele}
                  key={ele._id}
                />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </section>
    </>
  );
};

export default Doctors;