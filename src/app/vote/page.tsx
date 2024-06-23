"use client";

import { useEffect, useRef, useState } from "react";

const VotePage = () => {
  const [electionId, setElectionId] = useState("");
  const [election, setElection] = useState<any>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null
  );

  const [highlight, setHighlight] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleFetchElection = () => {
    const storedElection = localStorage.getItem(electionId);
    if (storedElection) {
      setElection(JSON.parse(storedElection));
    } else {
      alert("Election not found");
    }
  };

  const handleVote = (candidateId: string) => {
    if (!election) return;

    const newElection = { ...election };
    if (!newElection.votes) {
      newElection.votes = {};
    }

    if (!newElection.votes[candidateId]) {
      newElection.votes[candidateId] = 0;
    }

    newElection.votes[candidateId] += 1;

    localStorage.setItem(electionId, JSON.stringify(newElection));
    setElection(newElection);
    setSelectedCandidate(candidateId);
    setHighlight(true);
    // alert("Vote registered!");
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setHighlight(false);
    }, 3 * 1000);
  }, [highlight]);

  return (
    <div className="max-w-md mx-auto">
      <audio ref={audioRef} src="/beep.mp3" />
      <h1 className="text-2xl font-bold mb-4">Vote</h1>
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
          {election.candidates.map((candidate: any) => (
            <button
              key={candidate.rollNumber}
              onClick={() => handleVote(candidate.rollNumber)}
              className={`block mb-2 p-2 w-full border ${
                selectedCandidate === candidate.rollNumber && highlight
                  ? "bg-green-500 text-white"
                  : ""
              }`}
            >
              {candidate.name} ({candidate.rollNumber})
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VotePage;
