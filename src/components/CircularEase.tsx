import { SvgIconProps, Tooltip, TooltipProps } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { usePreferenceContext } from '@context/PreferenceContext';

export type CircularEaseProps = {
    scale?: number;
    easeInScale?: number;
    easeOutScale?: number;
    loopMs?: number;
    size?: SvgIconProps['fontSize'];
    color?: SvgIconProps['htmlColor'];
    sx?: SvgIconProps['sx'];
    tooltip?: string;
    tooltipPlacement?: TooltipProps['placement'];
};

export const CircularEase = ({
    scale = 1,
    easeInScale = 1,
    easeOutScale = 1,
    loopMs = 3000,
    size = 'medium',
    color,
    sx,
    tooltip,
    tooltipPlacement = 'top',
}: CircularEaseProps) => {
    const { theme } = usePreferenceContext();
    const circularPulse = (
        <CircleIcon
            fontSize={size}
            htmlColor={color ?? theme.palette.primary.main}
            sx={{
                ...sx,
                animation: `pulse ${loopMs}ms infinite`,
                '@keyframes pulse': {
                    '0%': {
                        transform: `scale(${scale * easeInScale})`,
                        opacity: 0.9,
                    },
                    '50%': {
                        transform: `scale(${scale * easeOutScale})`,
                        opacity: 1,
                    },
                    '100%': {
                        transform: `scale(${scale * easeInScale})`,
                        opacity: 0.9,
                    },
                },
            }}
        />
    );

    return tooltip ? (
        <Tooltip title={tooltip} placement={tooltipPlacement}>
            {circularPulse}
        </Tooltip>
    ) : (
        circularPulse
    );
};
