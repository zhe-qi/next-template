'use client';

import { Button } from '@/components/ui/button';
import { useCounterStore } from '@/providers/counter-store-provider';

export const Count = () => {
  const { count, incrementCount, decrementCount } = useCounterStore(
    state => state,
  );

  return (
    <div className="w-full">
      <div className="flex">
        Count:
        {count}
      </div>
      <hr />
      <div className="mt-2 flex gap-2">
        <Button className="flex-1" onClick={incrementCount}>
          Increment Count
        </Button>
        <Button className="flex-1" onClick={decrementCount}>
          Decrement Count
        </Button>
      </div>
    </div>
  );
};
