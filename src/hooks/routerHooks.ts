import { ValidRoutes } from '../App';
import { useNavigate } from 'react-router-dom';

export const useRouteToHome = () => {
    const nav = useNavigate();
    return () => {
        if (!(window.location.pathname === ValidRoutes.HOME)) nav(ValidRoutes.HOME);
    };
};

export const useRouteToGameWizard = () => {
    const nav = useNavigate();
    return () => {
        if (!window.location.pathname.includes(ValidRoutes.GAME_WIZARD)) nav(ValidRoutes.GAME_WIZARD);
    };
};

export const useRouteToRules = () => {
    const nav = useNavigate();
    return () => {
        if (!window.location.pathname.includes(ValidRoutes.RULES)) nav(ValidRoutes.RULES);
    };
};

export const useRouteToAbout = () => {
    const nav = useNavigate();
    return () => {
        if (!window.location.pathname.includes(ValidRoutes.ABOUT)) nav(ValidRoutes.ABOUT);
    };
};
