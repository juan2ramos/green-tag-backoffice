import {
  Agency,
  CompensationStrategiesEntity,
} from '../../agency/interfaces/agency.interface';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetDataFilter } from '../hooks/useGetDataFilter';
import { AdvertisersList } from '../components/List';

const AdvertiserPage = () => {
  const {
    agencies,
    strategies,
    strategySelected,
    handleChangeAgency,
    handleStrategyChange,
    isLoading,
    error,
  } = useGetDataFilter();
  return (
    <>
      <div className="flex justify-end w-full gap-3 pb-6">
        <Select onValueChange={handleChangeAgency}>
          <SelectTrigger className="w-[220px] bg-[white]" disabled={!agencies}>
            <SelectValue
              placeholder={
                agencies ? 'Seleccione una agencia' : 'Cargando Agencias'
              }
            />
          </SelectTrigger>
          <SelectContent>
            {agencies?.map((agencie: Agency) => (
              <SelectItem key={agencie.id} value={agencie.id || ''}>
                {agencie.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={strategySelected?.id || ''}
          onValueChange={handleStrategyChange}
        >
          <SelectTrigger
            className="w-[220px] bg-[white]"
            disabled={strategies.length === 0}
          >
            <SelectValue placeholder="Seleccione una plataforma" />
          </SelectTrigger>
          <SelectContent>
            {strategies.map((strategy: CompensationStrategiesEntity) => (
              <SelectItem key={strategy.id} value={strategy.id || ''}>
                {strategy.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <section className="wrapper">
        <div className=" w-full">
          <h2 className="pb-2">Administración de anunciantes</h2>
          <hr />
          {error != null && (
            <div className="mt-4">
              Hubo un error al obtener los anunciantes, revisa las credenciales
              e inténtalo de nuevo{' '}
            </div>
          )}
          {agencies == null && !isLoading && (
            <div className="mt-4">No hay agencias registradas</div>
          )}
          {strategySelected != null && (
            <AdvertisersList strategy={strategySelected} />
          )}
          {strategySelected === null && (
            <div className="mt-4">
              Selecciona una agencia y un plataforma para obtener los
              anunciantes
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AdvertiserPage;
