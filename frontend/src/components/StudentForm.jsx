import React, { useState, useEffect } from "react";
import { User, GraduationCap, Contact, CheckCircle2, ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";

const emptyForm = {
  student_id: "",
  full_name: "",
  email: "",
  phone: "",
  gender: "",
  department: "",
  year: "",
  dob: "",
};

function StudentForm({ initialData, onSubmit, submitLabel = "Save Student", isEditMode = false }) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...emptyForm, ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.student_id.trim()) newErrors.student_id = "Student ID is required";
      if (!formData.full_name.trim()) newErrors.full_name = "Full name is required";
    }

    if (currentStep === 2) {
      if (!formData.department) newErrors.department = "Department is required";
      if (!formData.year) newErrors.year = "Year level is required";
    }

    if (currentStep === 3) {
      if (!formData.email.trim()) newErrors.email = "Email address is required";
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(1) && validateStep(2) && validateStep(3)) {
      onSubmit(formData);
    }
  };

  const handleReset = () => {
    setFormData(initialData ? { ...emptyForm, ...initialData } : emptyForm);
    setErrors({});
    setStep(1);
  };

  return (
    <div>
      {/* Step Wizard Progress Bar */}
      <div className="wizard-progress">
        <div className={`wizard-step ${step === 1 ? "active" : step > 1 ? "completed" : ""}`}>
          <div className="step-number">{step > 1 ? <CheckCircle2 style={{ width: 18, height: 18 }} /> : "1"}</div>
          <span className="step-label">Personal Info</span>
        </div>

        <div className={`wizard-step ${step === 2 ? "active" : step > 2 ? "completed" : ""}`}>
          <div className="step-number">{step > 2 ? <CheckCircle2 style={{ width: 18, height: 18 }} /> : "2"}</div>
          <span className="step-label">Academic Info</span>
        </div>

        <div className={`wizard-step ${step === 3 ? "active" : ""}`}>
          <div className="step-number">3</div>
          <span className="step-label">Contact & Review</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* STEP 1: PERSONAL INFORMATION */}
        {step === 1 && (
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Student ID <span className="required-star">*</span>
              </label>
              <input
                className={`form-input ${errors.student_id ? "has-error" : ""}`}
                name="student_id"
                value={formData.student_id}
                onChange={handleChange}
                placeholder="e.g. STU-2026-001"
              />
              {errors.student_id && <span className="field-error">{errors.student_id}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Full Name <span className="required-star">*</span>
              </label>
              <input
                className={`form-input ${errors.full_name ? "has-error" : ""}`}
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="e.g. Abebe Kebede"
              />
              {errors.full_name && <span className="field-error">{errors.full_name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <select className="form-select" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-input"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {/* STEP 2: ACADEMIC INFORMATION */}
        {step === 2 && (
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Department <span className="required-star">*</span>
              </label>
              <select
                className={`form-select ${errors.department ? "has-error" : ""}`}
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Medicine">Medicine</option>
                <option value="Law">Law</option>
              </select>
              {errors.department && <span className="field-error">{errors.department}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Academic Year Level <span className="required-star">*</span>
              </label>
              <select
                className={`form-select ${errors.year ? "has-error" : ""}`}
                name="year"
                value={formData.year}
                onChange={handleChange}
              >
                <option value="">Select Year Level</option>
                <option value="1st Year">1st Year (Freshman)</option>
                <option value="2nd Year">2nd Year (Sophomore)</option>
                <option value="3rd Year">3rd Year (Junior)</option>
                <option value="4th Year">4th Year (Senior)</option>
              </select>
              {errors.year && <span className="field-error">{errors.year}</span>}
            </div>
          </div>
        )}

        {/* STEP 3: CONTACT & REVIEW */}
        {step === 3 && (
          <div>
            <div className="form-grid" style={{ marginBottom: 24 }}>
              <div className="form-group">
                <label className="form-label">
                  Email Address <span className="required-star">*</span>
                </label>
                <input
                  type="email"
                  className={`form-input ${errors.email ? "has-error" : ""}`}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. student@university.edu"
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  className="form-input"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +251 911 223 344"
                />
              </div>
            </div>

            {/* Summary Review Section */}
            <div
              style={{
                background: "var(--surface-alt)",
                borderRadius: "var(--radius-md)",
                padding: 18,
                border: "1px solid var(--border)",
              }}
            >
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: "var(--text-primary)" }}>
                Registration Summary Review
              </h4>
              <div className="form-grid" style={{ gap: 12 }}>
                <div>
                  <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                    Student ID
                  </span>
                  <p style={{ fontWeight: 700, color: "var(--primary)" }}>{formData.student_id || "-"}</p>
                </div>
                <div>
                  <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                    Full Name
                  </span>
                  <p style={{ fontWeight: 700, color: "var(--text-primary)" }}>{formData.full_name || "-"}</p>
                </div>
                <div>
                  <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                    Department
                  </span>
                  <p style={{ fontWeight: 600 }}>{formData.department || "-"}</p>
                </div>
                <div>
                  <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                    Year Level
                  </span>
                  <p style={{ fontWeight: 600 }}>{formData.year || "-"}</p>
                </div>
                <div>
                  <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                    Email
                  </span>
                  <p style={{ fontWeight: 600 }}>{formData.email || "-"}</p>
                </div>
                <div>
                  <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                    Phone
                  </span>
                  <p style={{ fontWeight: 600 }}>{formData.phone || "-"}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div
          style={{
            display: "flex",
            justify: "space-between",
            alignItems: "center",
            marginTop: 28,
            paddingTop: 18,
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            <RotateCcw style={{ width: 15, height: 15 }} />
            <span>Reset</span>
          </button>

          <div style={{ display: "flex", gap: 12 }}>
            {step > 1 && (
              <button type="button" className="btn btn-secondary" onClick={handleBack}>
                <ArrowLeft style={{ width: 16, height: 16 }} />
                <span>Back</span>
              </button>
            )}

            {step < 3 ? (
              <button type="button" className="btn btn-primary" onClick={handleNext}>
                <span>Next Step</span>
                <ArrowRight style={{ width: 16, height: 16 }} />
              </button>
            ) : (
              <button type="submit" className="btn btn-terracotta">
                <CheckCircle2 style={{ width: 16, height: 16 }} />
                <span>{submitLabel}</span>
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;