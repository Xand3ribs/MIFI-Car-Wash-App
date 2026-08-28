function Footer() {
  return (
    <footer className="py-6">
      <div className="container text-center">
        <p className="text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} MIFI Wash. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
