import { useEffect, useState } from "react";
import { getAllCandidates } from "../../services/api/candidatesService";
import { getElectionByCity } from "../../services/api/electionService";
import { errorMessage } from "../../utils/toast";
import Candidate from "../../components/Candidate";
import Loading from "../../components/Loading";

export default function Elections({ city = {} }) {
  const [election, setElection] = useState({});
  const [loading, setLoading] = useState(true);
  const { id, name, votingPopulation, absence, presence } = city;
  const totalEleitores = () => votingPopulation.toLocaleString("pt-BR") || 0;
  const abstencao = () => absence.toLocaleString("pt-BR") || 0;
  const comparecimento = () => presence.toLocaleString("pt-BR") || 0;
  const qtdCandidatos = () => election.length || 0;

  useEffect(() => {
    setLoading(true);
    getElectionByCity(id)
      .then(({ data }) => {
        let electionCity = data;
        getAllCandidates()
          .then(({ data }) => {
            let candidates = electionCity
              .map((candidate) => {
                const candidateData = data.filter(
                  (candidateData) => candidateData.id === candidate.candidateId
                )[0];
                return { ...candidate, candidate: candidateData };
              })
              .sort((a, b) => a.candidate.name.localeCompare(b.candidate.name));
            const totalVotes = candidates.reduce(
              (acc, curr) => (acc += curr.votes),
              0
            );
            candidates = candidates
              .map((data) => ({
                ...data,
                candidate: {
                  ...data.candidate,
                  percent: Number((data.votes / totalVotes) * 100).toFixed(2),
                },
              }))
              .sort((a, b) => b.candidate.percent - a.candidate.percent)
              .map((candidate, index) => ({
                ...candidate,
                elected: index === 0,
              }));
            setElection(candidates);
            setLoading(false);
          })
          .catch(({ message }) => {
            errorMessage(message);
          });
      })
      .catch(({ message }) => {
        errorMessage(message);
      });
  }, [id]);

  console.log(election);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center m-4">
          <Loading />
        </div>
      ) : (
        <div className="border p-2 mt-4 text-center">
          <p className="font-bold">Eleição em {name}</p>
          <div className="flex flex-row space-x-4 items-center justify-center my-2">
            <p>
              <span className="font-semibold">Total de eleitores: </span>
              {totalEleitores()}
            </p>
            <p>
              <span className="font-semibold">Abstenção: </span>
              {abstencao()}
            </p>
            <p>
              <span className="font-semibold">Comparecimento: </span>
              {comparecimento()}
            </p>
          </div>
          <p className="font-semibold">{qtdCandidatos()} candidatos</p>
          <div className="flex flex-row flex-wrap items-center justify-center my-2">
            {election.map((candidate) => {
              return <Candidate key={candidate.id} candidate={candidate} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}
