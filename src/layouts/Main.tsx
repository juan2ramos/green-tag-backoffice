import Header from './Header';
type MainProps = {
  children: React.ReactNode;
};

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className=" max-w-[1200px] mx-auto py-10">{children}</main>
    </>
  );
};

export default Main;
