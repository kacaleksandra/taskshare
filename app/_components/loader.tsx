import Image from 'next/image';

const Loader = () => {
  return (
    <div className='w-full flex justify-center items-center h-full'>
      <Image src='/loader.svg' alt='loading' width={100} height={100} />
    </div>
  );
};

export default Loader;
