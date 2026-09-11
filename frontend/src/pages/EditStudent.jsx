import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import { getStudent, updateStudent } from "../services/api";
import { useToast } from "../context/ToastContext";
import { ArrowLeft } from "lucide-react";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudent(id)
      .then((res) => setStudent(res.data))
      .catch(() => {
        addToast("Student not found", "error");
        setStudent(null);
      })
      .finally(() => setLoading(false));
  }, [id, addToast]);

  const handleSubmit = async (formData) => {
    try {
      await updateStudent(id, formData);
      addToast("Student information updated successfully!", "success");
      setTimeout(() => navigate(`/students/${id}`), 800);
    } catch (err) {
      addToast(err.response?.data?.message || "Failed to update student", "error");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
        Loading student record...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="card" style={{ textAlign: "center", padding: 40 }}>
        <h3>Student Not Found</h3>
        <p style={{ color: "var(--text-muted)", marginTop: 8 }}>
          The requested student record does not exist.
        </p>
        <button className="btn btn-secondary" onClick={() => navigate("/students")} style={{ marginTop: 16 }}>
          Return to Student Directory
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 840, margin: "0 auto" }}>
      <div className="page-header">
        <div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate(`/students/${id}`)}
            style={{ marginBottom: 12 }}
          >
            <ArrowLeft style={{ width: 14, height: 14 }} />
            <span>Back to Profile</span>
          </button>
          <div className="page-title-group">
            <h1>Edit Student Profile</h1>
            <p className="page-subtitle">Update information for {student.full_name}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <StudentForm
          initialData={student}
          onSubmit={handleSubmit}
          submitLabel="Update Student Record"
          isEditMode={true}
        />
      </div>
    </div>
  );
}

export default EditStudent;