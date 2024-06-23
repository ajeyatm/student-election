"use client";

// src/app/admin/page.tsx

import { useState } from "react";

const AdminPage = () => {
  const [schoolName, setSchoolName] = useState("");
  const [electionOfficer, setElectionOficer] = useState("");
  const [numVoters, setNumVoters] = useState("");
  const [role, setRole] = useState("");
  const [candidates, setCandidates] = useState([
    { name: "", rollNumber: "", standard: "", votes: 0 },
  ]);

  const addCandidate = () => {
    setCandidates([
      ...candidates,
      { name: "", rollNumber: "", standard: "", votes: 0 },
    ]);
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCandidates = [...candidates];
    //@ts-ignore
    newCandidates[index][event.target.name] = event.target.value;
    setCandidates(newCandidates);
  };

  const handleSubmit = () => {
    if (Number(numVoters) < 1) {
      alert("Number of voters must be a positive number.");
      return;
    }

    // Validate votes count
    // let totalVotes = 0;
    // candidates.forEach((candidate) => {
    //   totalVotes += Number(candidate.votes);
    // });

    // if (totalVotes > Number(numVoters)) {
    //   alert("Total votes cannot exceed the number of voters.");
    //   return;
    // }

    const electionId = new Date().getTime().toString();
    localStorage.setItem(
      electionId,
      JSON.stringify({
        schoolName,
        electionOfficer,
        numVoters,
        role,
        candidates,
        votes: {},
      })
    );
    alert(`Election created with ID: ${electionId}`);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Election</h1>
      <div className="mb-4">
        <label className="block mb-2">School Name:</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Election officer:</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={electionOfficer}
          onChange={(e) => setElectionOficer(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Role:</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Number of Voters:</label>
        <input
          type="number"
          className="border p-2 w-full"
          value={numVoters}
          onChange={(e) => setNumVoters(e.target.value)}
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Candidates:</h2>
        {candidates.map((candidate, index) => (
          <div key={index} className="mb-4 border p-4">
            <div className="mb-2">
              <label className="block mb-1">Name:</label>
              <input
                type="text"
                name="name"
                className="border p-2 w-full"
                value={candidate.name}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Roll Number:</label>
              <input
                type="text"
                name="rollNumber"
                className="border p-2 w-full"
                value={candidate.rollNumber}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Standard:</label>
              <input
                type="text"
                name="standard"
                className="border p-2 w-full"
                value={candidate.standard}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            {/* <div className="mb-2">
              <label className="block mb-1">Votes:</label>
              <input
                type="number"
                name="votes"
                className="border p-2 w-full"
                value={candidate.votes}
                onChange={(e) => {
                  const newCandidates = [...candidates];
                  newCandidates[index].votes = e.target.value;
                  setCandidates(newCandidates);
                }}
              />
            </div> */}
          </div>
        ))}
        <button
          onClick={addCandidate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Candidate
        </button>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Create Election
      </button>
    </div>
  );
};

export default AdminPage;
