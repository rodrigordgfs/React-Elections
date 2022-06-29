export default function Header({ title = "React", color = "bg-gray-400" }) {
  return (
    <header>
      <div className={`${color} mx-auto p-4`}>
        <h1 className="text-center text-white font-semibold text-xl">
          {title}
        </h1>
      </div>
    </header>
  );
}
