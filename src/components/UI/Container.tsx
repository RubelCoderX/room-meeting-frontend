const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container max-w-7xl mx-auto  pt-16 px-40 flex-grow">
      {children}
    </div>
  );
};

export default Container;
