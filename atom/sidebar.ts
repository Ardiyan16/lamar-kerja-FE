import { atom } from 'jotai';

const mobileMode = () => {
    if (typeof window !== 'undefined') {
        return window.innerWidth <= 768;
    }
    return false;
}

export const sidebarAtom = atom(mobileMode() ? false : true)