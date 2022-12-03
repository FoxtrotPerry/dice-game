import { ReactNode } from 'react';

type CenterStageFooterProps = {
    children: ReactNode;
};

export const Footer = ({ children }: CenterStageFooterProps) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
            }}
        >
            {children}
        </div>
    );
};
