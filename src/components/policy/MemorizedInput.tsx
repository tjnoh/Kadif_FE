import { Input } from '@chakra-ui/react';
import React, { memo, ChangeEvent } from 'react';

// Props 타입을 정의합니다.
interface MemoizedInputProps {
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

// memo로 감싼 컴포넌트를 정의합니다.
const MemoizedInput = memo(({ id, value, onChange }: MemoizedInputProps) => {
  return (
    <Input
      key={id}
      value={value}
      border={'none'}
      borderRadius={'0px'}
      fontSize={'13px'}
      onChange={onChange}
    />
  );
});

MemoizedInput.displayName = 'MemoizedInput';

export default MemoizedInput;
