import { useEffect, useState } from "react";
import {
  getAllCandidates,
  getCandidateById,
} from "../../services/api/candidatesService";
import { getElectionByCity } from "../../services/api/electionService";
import { errorMessage } from "../../utils/toast";

export default function Elections({ city = {} }) {
  const [election, setElection] = useState({});
  const { id, name, votingPopulation, absence, presence } = city;
  const totalEleitores = () => votingPopulation.toLocaleString("pt-BR") || 0;
  const abstencao = () => absence.toLocaleString("pt-BR") || 0;
  const comparecimento = () => presence.toLocaleString("pt-BR") || 0;
  const qtdCandidatos = () => election.length || 0;

  useEffect(() => {
    getElectionByCity(id)
      .then(({ data }) => {
        let electionCity = data;
        getAllCandidates()
          .then(({ data }) => {
            setElection(
              electionCity
                .map((candidate) => {
                  const candidateData = data.filter(
                    (candidateData) =>
                      candidateData.id === candidate.candidateId
                  )[0];
                  return { ...candidate, candidate: candidateData };
                })
                .sort((a, b) =>
                  a.candidate.name.localeCompare(b.candidate.name)
                )
            );
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
    </div>
  );
}
