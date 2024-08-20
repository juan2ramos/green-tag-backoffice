import { Checkbox } from '@/components/ui/checkbox';
import { useQuery } from '@tanstack/react-query';
import {
  getEfficiencyAllSites,
  getEfficiencyByCampaigns,
} from '../services/efficiencies';

interface EfficiencyProps {
  checkedState: { [key: string]: boolean };
  onCategoryChange: (category: string, isChecked: boolean) => void;
  reporting: number | null;
  isAllSites: boolean;
  campaignId: number;
}

export const Efficiency = ({
  checkedState,
  onCategoryChange,
  reporting,
  isAllSites,
  campaignId,
}: EfficiencyProps) => {
  const { data: efficiencyAllSites } = useQuery({
    queryKey: ['efficiency'],
    queryFn: () => getEfficiencyAllSites(),
    enabled: isAllSites,
  });
  const { data: efficiency } = useQuery({
    queryKey: ['efficiency'],
    queryFn: () => getEfficiencyByCampaigns(campaignId),
    enabled: !isAllSites,
  });
  const onClickEfficiency = (id: string) => {
    onCategoryChange(id, !checkedState[id]);
  };
  const calculateAverage = (categories: string): string => {
    const efficiencies = efficiency ? efficiency : efficiencyAllSites;
    const efficiencySelect = efficiencies?.find((efficiency: Efficiency) => {
      if (efficiency.category === categories) {
        return efficiency.result;
      }
    });

    return efficiencySelect ? efficiencySelect?.result : 0;
  };
  const getSelectedCategories = (): string => {
    let categories: string = '';
    Object.keys(checkedState).forEach((key) => {
      if (checkedState[key]) categories += key;
    });
    return categories;
  };

  const averageScore = calculateAverage(getSelectedCategories());
  return (
    <div className="flex gap-3 items-center">
      <div className="flex gap-2 items-center ">
        <label htmlFor="catA" className=" leading-[18px]">
          A
        </label>
        <Checkbox
          checked={checkedState.A}
          onClick={() => onClickEfficiency('A')}
        />
      </div>
      <div className="flex gap-2 items-center ">
        <label htmlFor="catB" className=" leading-[18px]">
          B
        </label>
        <Checkbox
          onClick={() => onClickEfficiency('B')}
          checked={checkedState.B}
        />
      </div>
      <div className="flex gap-2 items-center ">
        <label htmlFor="catC" className=" leading-[18px]">
          C
        </label>
        <Checkbox
          onClick={() => onClickEfficiency('C')}
          checked={checkedState.C}
        />
      </div>
      <div className="flex gap-2 items-center ">
        <label htmlFor="catD" className=" leading-[18px]">
          D
        </label>
        <Checkbox
          onClick={() => onClickEfficiency('D')}
          checked={checkedState.D}
        />
      </div>
      <div className="leading-[18px]">
        <span className="font-semibold">Eficiencia:</span>{' '}
        <span className=" font-robotoFlex text-[#00CA21] pr-4">
          {averageScore}%
        </span>
        {reporting && (
          <>
            <span className="font-semibold">Eficiencia Reporte: </span>
            <span className=" font-robotoFlex text-[#00CA21] ">
              {Math.trunc(reporting * 100)}%
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export interface Efficiency {
  category: string;
  result: string;
}
