import { DatePickerWithRange } from '@/components/ui/data-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import {
  Campaigns,
  CreativesType,
  VideoContentDuration,
  BitRates,
} from '../data';
import { Button } from '@/components/ui/button';

export const CreateOffset = () => {
  const [result, setResult] = useState(0);
  const [radioVideoDuration, setRadioVideoDuration] = useState<string>('yes');
  const [radioBitrate, setRadioRadioBitrate] = useState<string>('yes');
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [videoDuration, setVideoDuration] = useState<number | undefined>(
    undefined,
  );
  const [creative, setCreative] = useState<string | undefined>(undefined);
  const [bitrate, setBitrate] = useState<number | undefined>(undefined);
  const [percentage, setPercentage] = useState<number | undefined>(undefined);
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [impresiones, setImpresiones] = useState<number | string>('');

  useEffect(() => {
    if (creative === 'Video' && videoDuration && bitrate && percentage) {
      const result = (videoDuration * bitrate * percentage) / 1000;
      setResult(result);
    }
    if (
      (creative === 'Banner' || creative === 'Native') &&
      weight &&
      impresiones
    ) {
      const result = weight * +impresiones;
      setResult(result);
    }
  }, [videoDuration, bitrate, percentage, weight, creative, impresiones]);
  return (
    <form className="py-4">
      <div className="flex gap-3">
        <div className="w-1/4">
          <Select
            disabled={false}
            onValueChange={(value) => console.log(value)}
            defaultValue={''}
            value={''}
          >
            <SelectTrigger className=" bg-[white]">
              <SelectValue placeholder="Seleccione una campaña " />
            </SelectTrigger>
            <SelectContent>
              {Campaigns?.map((campaign) => (
                <SelectItem
                  key={`campaign-${campaign.id}`}
                  value={campaign.id?.toString() || ''}
                >
                  {campaign.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-1/4">
          <DatePickerWithRange
            className="w-[100%]"
            date={date}
            setDate={setDate}
          />
        </div>
        <div className="w-1/4">
          <Select
            disabled={false}
            onValueChange={(value) => setCreative(value)}
          >
            <SelectTrigger className=" bg-[white]">
              <SelectValue placeholder="Tipo de creativo " />
            </SelectTrigger>
            <SelectContent>
              {CreativesType?.map((creative) => (
                <SelectItem
                  key={`campaign-${creative.id}`}
                  value={creative.name}
                >
                  {creative.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-1/4">
          <Input
            type="number"
            placeholder="Impresiones"
            className=" font-thin font-robotoFlex"
            value={impresiones}
            onChange={(e) => setImpresiones(Number(e.target.value))}
          />
        </div>
      </div>
      {creative === 'Video' && (
        <>
          <div className="flex gap-3 items-center py-6">
            <div className="flex w-1/4 gap-2">
              <label htmlFor="">¿Conoces la duración del video?</label>
              <RadioGroup
                value={radioVideoDuration}
                onValueChange={(value) => setRadioVideoDuration(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">Si</Label>
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">No</Label>
                </div>
              </RadioGroup>
            </div>
            {radioVideoDuration === 'yes' && (
              <div className="w-1/4">
                <Input
                  type="number"
                  placeholder="Duración del video (segundos)"
                  className="font-thin font-robotoFlex"
                  value={videoDuration}
                  onChange={(e) => setVideoDuration(Number(e.target.value))}
                />
              </div>
            )}{' '}
            {radioVideoDuration === 'no' && (
              <div className="w-1/4">
                <Select
                  disabled={false}
                  onValueChange={(value) => console.log(value)}
                >
                  <SelectTrigger className="bg-[white]">
                    <SelectValue placeholder="Seleccione una duración promedio" />
                  </SelectTrigger>
                  <SelectContent>
                    {VideoContentDuration.map((content) => (
                      <SelectItem
                        key={`campaign-${content.id}`}
                        value={content.name}
                      >
                        {content.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="flex w-1/4 gap-2">
              <label htmlFor="">¿Conoces el bitrate?</label>
              <RadioGroup
                value={radioBitrate}
                onValueChange={(value) => setRadioRadioBitrate(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">Si</Label>
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">No</Label>
                </div>
              </RadioGroup>
            </div>
            {radioBitrate === 'yes' && (
              <div className="w-1/4">
                <Input
                  type="number"
                  placeholder="Bitrate"
                  className="font-thin font-robotoFlex"
                  value={bitrate}
                  onChange={(e) => setBitrate(Number(e.target.value))}
                />
              </div>
            )}{' '}
            {radioBitrate === 'no' && (
              <div className="w-1/4">
                <Select
                  disabled={false}
                  onValueChange={(value) => console.log(value)}
                >
                  <SelectTrigger className="bg-[white]">
                    <SelectValue placeholder="Seleccione una duración promedio" />
                  </SelectTrigger>
                  <SelectContent>
                    {BitRates.map((bitrate) => (
                      <SelectItem
                        key={`bitrate-${bitrate.id}`}
                        value={bitrate.name}
                      >
                        {bitrate.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div className="flex gap-3 pb-6">
            <div className="w-1/4  flex items-center">
              <Input
                max={100}
                type="number"
                placeholder="Porcentaje promedio de reproducción"
                className="font-thin font-robotoFlex"
                value={percentage}
                onChange={(e) => setPercentage(Number(e.target.value))}
              />
              <span className="ml-2">%</span>
            </div>
            <div className="w-1/4 "> </div>
            <div className="w-1/4 "> </div>
            <div className="w-1/4 "> </div>
          </div>
        </>
      )}
      {(creative === 'Banner' || creative === 'Native') && (
        <div className="flex  gap-3 py-3">
          <div className="w-1/4">
            <Input
              type="number"
              placeholder="Peso del creativo (KB)"
              className="font-thin font-robotoFlex"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
          </div>

          <div className="w-1/4 "> </div>
          <div className="w-1/4 "> </div>
          <div className="w-1/4 "> </div>
        </div>
      )}
      {creative && result > 0 && (
        <div className="pt-6 flex gap-3 items-center">
          <span>
            <b className='className=" font-robotoFlex font-thin"'>{result}</b>{' '}
            CO2 a compensar
          </span>
          <Button variant={'create'}>Compensar </Button>
        </div>
      )}
    </form>
  );
};
