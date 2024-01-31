import React, { FC } from 'react';

import classNames from 'clsx';

import Spinner from 'app/atoms/Spinner/Spinner';

interface Props {
  large?: boolean;
  className?: string;
}

export const CollectibleImageLoader: FC<Props> = ({ large = false, className }) => (
  <div className={classNames('w-full h-full flex items-center justify-center', className)}>
    <Spinner theme="dark-gray" className={large ? 'w-10' : 'w-8'} />
  </div>
);
