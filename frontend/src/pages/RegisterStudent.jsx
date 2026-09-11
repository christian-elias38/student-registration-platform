import React from "react";
import { useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import { createStudent } from "../services/api";
import { useToast } from "../context/ToastContext";
import { ArrowLeft } from "lucide-react";

function RegisterStudent() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async (formData) => {
    try {
      await createStudent(formData);
      addToast("Student registered successfully!", "success");
      setTimeout(() => navigate("/students"), 800);
    } catch (err) {
      addToast(err.response?.data?.message || "Failed to register student", "error");
    }
  };

  return (
    <div style={{ maxWidth: 840, margin: "0 auto" }}>
      <div className="page-header">
        <div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate("/students")}
            style={{ marginBottom: 12 }}
          >
            <ArrowLeft style={{ width: 14, height: 14 }} />
            <span>Back to Directory</span>
          </button>
          <div className="page-title-group">
            <h1>Register New Student</h1>
            <p className="page-subtitle">
              Complete the step-by-step registration flow to add a student to the academic system.
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <StudentForm onSubmit={handleSubmit} submitLabel="Confirm & Save Student" />
      </div>
    </div>
  );
}

export default RegisterStudent;