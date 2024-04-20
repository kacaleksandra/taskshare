'use client';

import Lottie from 'react-lottie-player';
import waitingForApproval from 'ui/lotties/waiting-for-approval.json';

function WaitingForApprovalPage() {
  return (
    <div className='grid md:grid-cols-2 w-11/12 mx-auto md:h-5/6 mt-8'>
      <div className='h-full flex items-center mx-5 md:mx-12'>
        <div>
          <p className='text-center lg:text-xl mb-5'>
            We are sorry to say that
            <span className='font-medium'>
              {' '}
              you are still waiting for your teacher status to be approved{' '}
            </span>{' '}
            by the TaskShare Platform Admin.
          </p>
          <p className='text-center lg:text-xl mb-5'>
            Your enthusiasm to join our teaching community is truly appreciated!
            We are working diligently to process approvals swiftly.
          </p>
          <p className='text-center lg:text-xl'>
            <span className='font-medium'>Thank you </span>
            for your patience and understanding as we strive to make TaskShare
            the best it can be!
          </p>
        </div>
      </div>
      <Lottie
        loop
        animationData={waitingForApproval}
        play
        className='w-3/4 mx-auto'
      />
    </div>
  );
}

export default WaitingForApprovalPage;
