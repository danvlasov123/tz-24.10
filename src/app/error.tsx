'use client';

import { Button } from 'src/UI';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className='container'>
      <div className='py-12 max-w-sm mx-auto'>
        <h2 className='text-xl font-bold'>Oh no!</h2>
        <p className='my-2'>
          There was an issue with our storefront. This could be a temporary
          issue, please try your action again.
        </p>
        <Button onClick={() => reset()}>Try Again</Button>
      </div>
    </section>
  );
}
