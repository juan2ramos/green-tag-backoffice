const HomePage = () => {
  return (
    <div className="flex flex-col gap-4 p-12 rounded-lg bg-white" id="Home">
      <section className="flex flex-col gap-4">
        <p>
          En Green List, nuestro compromiso es liderar el cambio hacia una
          industria publicitaria más sostenible y consciente del medio ambiente.
          Nuestro sistema innovador está diseñado para calcular con precisión
          las emisiones de CO2 generadas por campañas publicitarias digitales,
          utilizando datos de plataformas líderes en el sector como Xandr y
          Equativ.
        </p>
        <h2 className="text-2xl font-bold">Navegación Principal:</h2>
        <ul className="flex flex-col gap-4">
          <li>
            <a href="/agencias">Agencias:</a>
            <p>
              En este módulo, puedes gestionar las agencias de publicidad
              registradas en nuestro sistema. Registra nuevas agencias, edita su
              información, o elimínalas según sea necesario. Este espacio es
              crucial para definir y administrar las estrategias de obtención de
              datos para tus anunciantes y campañas.
            </p>
          </li>
          <li>
            <a href="/anunciantes">Anunciantes</a>
            <p>
              Aquí, administrarás a los anunciantes asociados con tus agencias.
              Dependiendo de la estrategia de obtención de datos elegida, podrás
              agregar anunciantes manualmente o seleccionarlos a través de
              nuestras conexiones API con plataformas publicitarias.
            </p>
          </li>
          <li>
            <a href="/campanas">Campañas</a>
            <p>
              Este módulo te permite visualizar y gestionar las campañas
              publicitarias y sus creativos. Tendrás una visión clara de las
              campañas que necesitan compensación por su impacto en carbono,
              facilitando la toma de decisiones y la implementación de acciones
              correctivas.
            </p>
          </li>
          <li>
            <a href="/bonos">Bonos</a>
            <p>
              Gestionar los bonos legados y los proyectos de compensación es más
              fácil que nunca. Este módulo te permite crear, editar y eliminar
              bonos y proyectos, ayudándote a organizar tus iniciativas de
              sostenibilidad.
            </p>
          </li>
          <li>
            <a href="/compensar">Compensar</a>
            <p>
              Aquí es donde la magia sucede. Nuestro sistema te permite
              compensar manualmente las emisiones de CO2 de tus campañas, con
              herramientas que facilitan la selección de campañas y la
              visualización del impacto de tus acciones de compensación.
            </p>
          </li>
        </ul>
      </section>
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Funcionalidades Destacadas:</h2>
        <ol className="flex flex-col gap-4">
          <li>
            <b>Administración de Agencias y Anunciantes:</b>
            <p>
              {' '}
              Nuestro módulo de agencias permite gestionar la creación, edición
              y eliminación de agencias y sus anunciantes asociados. Con
              estrategias flexibles para la obtención de datos, facilitamos la
              integración de información a través de API o de manera manual
              mediante Excel.
            </p>
          </li>
          <li>
            <b>Gestión de Campañas y Creativos:</b>
            <p>
              Visualiza y gestiona las campañas publicitarias y sus respectivos
              creativos. Nuestra plataforma permite identificar aquellas
              campañas que requieren compensación por su impacto en carbono,
              ofreciendo un enfoque práctico y detallado para la compensación
              ambiental.
            </p>
          </li>
          <li>
            <b>Micro servicio de Extracción de Datos:</b>
            <p>
              A través de nuestro micro servicio dedicado, automatizamos la
              extracción de datos relevantes desde plataformas publicitarias,
              asegurando una información precisa y actualizada para el cálculo
              de emisiones de CO2.
            </p>
          </li>
          <li>
            <b>compensación y Reportes:</b>
            <p>
              Ofrecemos herramientas avanzadas para compensar manualmente las
              emisiones de tus campañas, así como la generación de reportes
              detallados que resaltan el impacto positivo de tus esfuerzos de
              compensación.
            </p>
          </li>
          <li>
            <b>Bonos y Proyectos: </b>
            <p>
              Gestiona bonos y proyectos de compensación, permitiendo una visión
              integral de las iniciativas de sostenibilidad vinculadas a tus
              campañas.
            </p>
          </li>
        </ol>
      </section>
    </div>
  );
};

export default HomePage;
