import { FormCreate } from './FormCreate';

const CreateAgency = () => {
  return (
    <>
      <section className="wrapper">
        <div className=" w-full">
          <h2 className="pb-2">Crear agencia</h2>
          <hr />
        </div>
        <FormCreate />
      </section>
    </>
  );
};

export default CreateAgency;
