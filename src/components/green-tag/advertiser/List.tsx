import { useQuery } from '@tanstack/react-query';
import {
  createOrUpdateAdvertiser,
  getAdvertiser,
} from '../../../services/advertiser';
import { Advertiser } from './types';
const Advertiser = ({
  strategyName,
  strategyId,
}: {
  strategyName: string;
  strategyId: string;
}) => {
  const {
    data: advertisers,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['advertiser', strategyName, strategyId],
    queryFn: () => getAdvertiser({ strategyId, strategyName }),
  });
  const handleAdvertiserChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const isChecked = e.target.checked;
    const id = e.target.value;
    const advertiser = advertisers?.find((a: Advertiser) => a.id == id);

    await createOrUpdateAdvertiser({
      name: advertiser.name,
      strategyId: strategyId,
      externalId: id,
      active: isChecked,
    });
  };

  return (
    <>
      <section className="m-8">
        {isLoading && <strong>Cargando...</strong>}
        {error != null && <strong>Algo ha ido mal</strong>}
        <h3>Advertisers</h3>
        <hr />
        {advertisers?.map((advertiser: Advertiser) => (
          <label key={advertiser.id} className="flex gap-4 items-center m-4">
            <input
              type="checkbox"
              className="border-gray-300 border-2 text-[#44C949] focus:border-gray-300 focus:ring-[#4A9A81]"
              name="active"
              value={advertiser.id}
              onChange={handleAdvertiserChange}
              defaultChecked={advertiser.active}
            />
            <h3 className="text-xl">{advertiser.name}</h3>
            <p className="text-gray-600">{advertiser.id}</p>
          </label>
        ))}
      </section>
    </>
  );
};
export default Advertiser;
