export default function Elections({ candidate = {} }) {
  const image = () => candidate.candidate.image;
  const name = () => candidate.candidate.name;
  const votes = () => candidate.votes.toLocaleString("pt-BR");
  const elected = () => !!candidate.elected;
  const percent = () => candidate.candidate.percent;
  const electedColor = `${
    elected() ? "text-green-800" : "text-yellow-600"
  } font-bold`;

  return (
    <div className="shadow-lg p-2 m-2 flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-between gap-16">
        <img className="w-14 rounded-full" src={image()} alt={name()} />
        <div className="flex flex-col items-center">
          <p className={`${electedColor} font-medium`}>{percent()}%</p>
          <p>{votes()}</p>
        </div>
      </div>
      <p className="text-center my-8">{name()}</p>
      <p className={electedColor}>{`${elected() ? "Eleito" : "Não Eleito"}`}</p>
    </div>
  );
}
