const Footer = () => {
  return (
    <footer className="text-center py-3 mt-4 border-top bg-light">
      <p className="mb-1">Mini Social App</p>
      <p className="text-muted mb-0">
        © {new Date().getFullYear()} All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
