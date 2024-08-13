import { CreateBrandLift } from '../components/create';

export const BrandLiftPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <section className="wrapper">
        <div className="w-full ">
          <h2 className="pb-2">Crear un Brand Lift</h2>
          <hr />
          <CreateBrandLift />
        </div>
      </section>
      <section className="wrapper">
        <div className="w-full">
          <h2 className="pb-2">Listado de Brand Lift</h2>
          <hr />
          <div className="mt-8 w-full px-5 py-7 b bg-[#F9FBFC] rounded-md"></div>
        </div>
      </section>
    </div>
  );
};
