import { ReactElement } from 'react';
import { CircularEase, CircularEaseProps } from '@components';
import { CenterStack } from './CenterStack';
import { usePreferenceContext } from '@context/PreferenceContext';

type PingingIconProps = {
    children: ReactElement;
    scale?: CircularEaseProps['scale'];
    easeInScale?: CircularEaseProps['easeInScale'];
    easeOutScale?: CircularEaseProps['easeOutScale'];
    loopMs?: CircularEaseProps['loopMs'];
    pingColor?: string;
    disabled?: boolean;
};

export const EasingIcon = ({
    scale,
    easeInScale,
    easeOutScale,
    loopMs,
    pingColor,
    children,
    disabled,
}: PingingIconProps) => {
    const { theme } = usePreferenceContext();
    return (
        <CenterStack>
            {children}
            {!disabled && (
                <CircularEase
                    scale={scale}
                    easeInScale={easeInScale}
                    easeOutScale={easeOutScale}
                    loopMs={loopMs}
                    color={pingColor ?? theme.palette.primary.main}
                />
            )}
        </CenterStack>
    );
};
