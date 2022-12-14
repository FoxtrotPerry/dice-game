import { ReactElement } from 'react';
import { CircularPulse, CircularPulseProps } from '@components';
import { CenterStack } from './CenterStack';
import { usePreferenceContext } from '@context/PreferenceContext';

type PingingProps = {
    children: ReactElement;
    CircularPulseProps?: CircularPulseProps;
    pingColor?: string;
    disabled?: boolean;
};

export const Pinging = ({ CircularPulseProps, pingColor, children, disabled }: PingingProps) => {
    const { theme } = usePreferenceContext();
    return (
        <CenterStack>
            {children}
            {!disabled && (
                <CircularPulse
                    {...CircularPulseProps}
                    color={pingColor ?? theme.palette.primary.main}
                />
            )}
        </CenterStack>
    );
};
