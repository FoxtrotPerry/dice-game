import { SvgIconProps, Tooltip, TooltipProps, useTheme } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

export type CircularPulseProps = {
    scale?: number;
    startPulseScale?: number;
    endPulseScale?: number;
    loopMs?: number;
    size?: SvgIconProps['fontSize'];
    color?: SvgIconProps['htmlColor'];
    sx?: SvgIconProps['sx'];
    tooltip?: string;
    tooltipPlacement?: TooltipProps['placement'];
};

export const CircularPulse = ({
    scale = 1,
    startPulseScale = 0.5,
    endPulseScale = 1,
    loopMs = 1250,
    size = 'medium',
    color,
    sx,
    tooltip,
    tooltipPlacement = 'top',
}: CircularPulseProps) => {
    const theme = useTheme();
    const circularPulse = (
        <CircleIcon
            fontSize={size}
            htmlColor={color ?? theme.palette.primary.main}
            sx={{
                ...sx,
                animation: `pulse ${loopMs}ms infinite`,
                '@keyframes pulse': {
                    '0%': {
                        transform: `scale(${scale * startPulseScale})`,
                        opacity: 0.9,
                    },
                    '100%': {
                        transform: `scale(${scale * endPulseScale})`,
                        opacity: 0,
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
