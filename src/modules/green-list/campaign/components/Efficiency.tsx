import { Checkbox } from '@/components/ui/checkbox';
import { URLInterface } from '../interfaces/campaign.interface';
interface EfficiencyProps {
  urls: URLInterface[];
  checkedState: { [key: string]: boolean };
  onCategoryChange: (category: string, isChecked: boolean) => void;
}

export const Efficiency = ({
  urls,
  checkedState,
  onCategoryChange,
}: EfficiencyProps) => {
  const onClickEfficiency = (id: string) => {
    onCategoryChange(id, !checkedState[id]);
  };
  const calculateAverage = (categories: string[]): string => {
    const selectedUrls = urls.filter((url) =>
      categories.includes(url.category),
    );
    if (selectedUrls.length === 0) return '0';
    const totalScore = selectedUrls.reduce((acc, url) => acc + url.score, 0);
    const average = totalScore / selectedUrls.length;
    return Number.isInteger(average) ? average.toString() : average.toFixed(2);
  };
  const getSelectedCategories = (): string[] => {
    const categories: string[] = [];
    if (checkedState.A) categories.push('A');
    if (checkedState.B) categories.push('B');
    if (checkedState.C) categories.push('C');
    if (checkedState.D) categories.push('D');
    return categories;
  };

  const selectedCategories = getSelectedCategories();
  const averageScore = calculateAverage(selectedCategories);
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
        <span className=" font-robotoFlex text-[#00CA21] ">
          {averageScore}%
        </span>
      </div>
    </div>
  );
};
