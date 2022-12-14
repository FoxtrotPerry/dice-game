import { ReactElement } from 'react';
import { CircularEase, CircularEaseProps } from '@components';
import { CenterStack } from './CenterStack';
import { usePreferenceContext } from '@context/PreferenceContext';

export type EasingProps = {
    children: ReactElement;
    CircularEaseProps?: CircularEaseProps;
    pingColor?: string;
    disabled?: boolean;
};

export const Easing = ({ CircularEaseProps, pingColor, children, disabled }: EasingProps) => {
    const { theme } = usePreferenceContext();
    return (
        <CenterStack>
            {children}
            {!disabled && (
                <CircularEase {...CircularEaseProps} color={pingColor ?? theme.palette.primary.main} />
            )}
        </CenterStack>
    );
};
