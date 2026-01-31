import { useContext, type PropsWithChildren } from 'react';
import { FeatureFlagContext } from './Context';

export type FeatureFlagsProps = {
  isMainLayourNewUI: boolean;
};

export const FeatureFlagProvider = ({
  children,
  value,
}: PropsWithChildren<{
  value: FeatureFlagsProps;
}>) => {
  return <FeatureFlagContext.Provider value={value}>{children}</FeatureFlagContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagProvider');
  }
  return context;
};
