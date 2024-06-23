"use client";

import { useState } from "react";

const ResultsPage = () => {
  const [electionId, setElectionId] = useState("");
  const [election, setElection] = useState<any>(null);

  const handleFetchElection = () => {
    const storedElection = localStorage.getItem(electionId);
    if (storedElection) {
      setElection(JSON.parse(storedElection));
    } else {
      alert("Election not found");
    }
  };

  const handleDeclareWinner = () => {
    if (!election) return;

    let winnerName = "";
    let maxVotes = -1;

    Object.entries(election.votes).forEach(([candidateId, votes]) => {
      if (votes > maxVotes) {
        maxVotes = votes;
        const candidate = election.candidates.find(
          (c: any) => c.rollNumber === candidateId
        );
        if (candidate) {
          winnerName = candidate.name;
        }
      }
    });

    alert(`Winner for ${election.role} role is: ${winnerName}`);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Results</h1>
      <div className="mb-4">
        <label className="block mb-2">Enter Election ID:</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={electionId}
          onChange={(e) => setElectionId(e.target.value)}
        />
        <button
          onClick={handleFetchElection}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Fetch Election
        </button>
      </div>
      {election && (
        <div>
          <h2 className="text-xl font-semibold mb-2">{election.schoolName}</h2>
          <h3 className="text-lg mb-2">{election.role}</h3>
          <ul className="mb-4">
            {election.candidates.map((candidate: any) => (
              <li
                key={candidate.rollNumber}
                className="flex justify-between items-center border-b py-2"
              >
                <span>
                  {candidate.name} ({candidate.rollNumber})
                </span>
                <span>Votes: {election.votes[candidate.rollNumber] || 0}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={handleDeclareWinner}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Declare Winner
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
