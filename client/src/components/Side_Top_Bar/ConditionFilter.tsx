import { useState } from 'react';

import { Product } from '../../types';
import CustomSelect from '../Forms/CustomSelect';

type Condition = Product['condition'];
type Conditions = Array<Condition>;

const conditions: Conditions = [
  'New',
  'Used - Like New',
  'Used - Good',
  'Used - Fair',
];

interface Props {
  onFilterCondition: (condition: Condition) => void;
}

export default function ConditionFilter({ onFilterCondition }: Props) {
  const [selectedCondition, setSelectedCondition] = useState<
    Condition | undefined
  >(undefined);

  const handleConditionSelect = (option: string) => {
    const selectedCondition = option as Condition;
    setSelectedCondition(selectedCondition);
    onFilterCondition(selectedCondition);
  };

  return (
    <>
      <CustomSelect
        options={conditions}
        label='Condition'
        onSelect={handleConditionSelect}
        selectedOption={selectedCondition}
      />
    </>
  );
}
