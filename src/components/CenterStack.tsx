import { ReactNode, useMemo } from 'react';

export const CenterStack = ({ children }: { children: ReactNode | ReactNode[] }) => {
    const stack = useMemo(() => {
        if (Array.isArray(children)) {
            return children.map((node, i) => {
                /*
                    If the current node is the first one, allow it to
                    dictate the amt of space taken up in the DOM.
                */
                if (!i) {
                    return (
                        <div key={i} style={{ display: 'flex', zIndex: children.length - i }}>
                            {node}
                        </div>
                    );
                } else {
                    /*
                        Otherwise, center stack the node and make it's position absolute and centered.
                    */
                    return (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: children.length - i,
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {node}
                            </div>
                        </div>
                    );
                }
            });
        } else {
            return [children];
        }
    }, [children]);
    return <div style={{ position: 'relative', display: 'flex' }}>{stack}</div>;
};
