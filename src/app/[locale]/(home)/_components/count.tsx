'use client';

import { Button } from '@/components/ui/button';
import { useCounterStore } from '@/providers/counter-store-provider';

export const Count = () => {
  const { count, incrementCount, decrementCount } = useCounterStore(
    state => state,
  );

  return (
    <div>
      <div className="flex">
        Count:
        {count}
      </div>
      <hr />
      <div className="flex gap-2 mt-2">
        <Button onClick={incrementCount}>
          Increment Count
        </Button>
        <Button onClick={decrementCount}>
          Decrement Count
        </Button>
      </div>
    </div>
  );
};
