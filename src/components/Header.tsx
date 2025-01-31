function Header({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header>
      <h1 className="font-bold">{title}</h1>
      <p className="mt-1">{description}</p>
    </header>
  );
}

export default Header;
