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
            }}
        >
            {children}
        </div>
    );
};
