function Footer() {
  return (
    <footer className="md:py-16 md:px-24 py-8 px-12 flex flex-col gap-4 bg-slate-50">
      <hr className="h-px bg-gray-400 border-0 dark:bg-gray-500" />
      <p className="text-lg font-normal">
        A{' '}
        <img
          className="w-[70.29px] h-[17px] inline"
          src="/logo__better.svg"
          alt="better.sg"
        />{' '}
        initiative
      </p>
    </footer>
  );
}

export default Footer;
