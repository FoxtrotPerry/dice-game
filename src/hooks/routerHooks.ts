import { ValidRoutes } from '../App';
import { useNavigate } from 'react-router-dom';

export const useRouteToHome = () => {
    const nav = useNavigate();
    return () => {
        nav(ValidRoutes.HOME);
    };
};

export const useRouteToGameWizard = () => {
    const nav = useNavigate();
    return () => {
        nav(ValidRoutes.GAME_WIZARD);
    };
};

export const useRouteToRules = () => {
    const nav = useNavigate();
    return () => {
        nav(ValidRoutes.RULES);
    };
};
