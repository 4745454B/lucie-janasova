const Footer = () => {
  return (
    <footer className="w-full bg-zinc-900 text-white text-center py-4">
      <p className="text-lg font-semibold">Lucie Janášová</p>
      <p className="text-sm">Lektorka keramiky</p>
      <p className="mt-2 text-sm">
        Created by{" "}
        <a
          href="https://tomas-broz.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-400 hover:underline"
        >
          Tomas Broz
        </a>
      </p>
    </footer>
  );
};

export default Footer;
