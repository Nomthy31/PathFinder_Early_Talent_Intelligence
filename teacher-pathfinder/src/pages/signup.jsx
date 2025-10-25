import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

export default function TeacherSignup({ setClasses }) { // ✅ accept setClasses
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [school, setSchool] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const subjectOptions = [
    { value: "Mathematics", label: "Mathematics" },
    { value: "Languages", label: "Languages" },
    { value: "Life Skills", label: "Life Skills" },
    { value: "Arts", label: "Arts" },
    { value: "Technology", label: "Technology" },
  ];

  const gradeOptions = [];
  for (let g = 1; g <= 9; g++) {
    for (let c = 65; c <= 71; c++) {
      gradeOptions.push({
        value: `${g}${String.fromCharCode(c)}`,
        label: `${g}${String.fromCharCode(c)}`,
      });
    }
  }

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !surname || !school || subjects.length === 0 || grades.length === 0 || !password || !confirmPassword) {
      alert("Please fill all fields!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // ✅ Create classes array from selected subjects + grades
    const signupClasses = [];
    subjects.forEach((subj) => {
      grades.forEach((grade) => {
        signupClasses.push({
          id: Math.random(), // unique id for table
          name: subj.value,
          grade: grade.value,
          learners: 0,
        });
      });
    });

    // ✅ Update App.jsx state
    setClasses(signupClasses);

    // ✅ Save teacher info to localStorage
    localStorage.setItem(
      "teacher",
      JSON.stringify({
        name,
        surname,
        school,
        subjects: subjects.map((s) => s.value),
        grades: grades.map((g) => g.value),
        password,
        classes: signupClasses, // save full classes
      })
    );

    alert("Signup successful! Redirecting to Login.");
    navigate("/login"); // Nvigate to home
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #eef2f7, #d9e2ef)" }}>
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-blue-400 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Teacher Signup</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">First Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter first name" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Surname</label>
            <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Enter surname" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">School</label>
            <input type="text" value={school} onChange={(e) => setSchool(e.target.value)} placeholder="Enter school name" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Subjects</label>
            <Select options={subjectOptions} isMulti onChange={setSubjects} placeholder="Select all subjects you teach" />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Grades / Classes</label>
            <Select options={gradeOptions} isMulti onChange={setGrades} placeholder="Select all grades you teach" />
          </div>

          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">{showPassword ? "Hide" : "Show"}</button>
          </div>

          <div className="relative">
            <input type={showConfirm ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">{showConfirm ? "Hide" : "Show"}</button>
            {confirmPassword && password !== confirmPassword && <p className="text-red-500 text-sm mt-1">Passwords don't match</p>}
          </div>

          <button type="submit" className="w-full py-3 rounded-lg text-white font-semibold transition-colors" style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
