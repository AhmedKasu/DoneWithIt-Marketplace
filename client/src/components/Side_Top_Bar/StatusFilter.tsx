import { useState } from 'react';
import CustomSelect from '../forms/CustomSelect';
import { Product } from '../../types';

type Status = Product['status'];

const status: Status[] = ['available', 'pending', 'sold'];

interface Props {
  onFilterStatus: (status: Status) => void;
}

export default function StatusFilter({ onFilterStatus }: Props) {
  const [selectedStatus, setSelectedStatus] = useState<Status | undefined>(
    undefined
  );

  const handleStatusSelect = (option: string) => {
    const selectedStatus = option as Status;
    setSelectedStatus(selectedStatus);
    onFilterStatus(selectedStatus);
  };
  return (
    <>
      <CustomSelect
        options={status}
        label='Availability'
        onSelect={handleStatusSelect}
        selectedOption={selectedStatus}
      />
    </>
  );
}
