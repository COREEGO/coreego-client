import { ANALITICS_PAGE_ICON, BACK_ICON, PROFIL_ICON } from "./icon";

export const dashboardLinks = [
    {
        page_name: 'Retourner sur le site',
        icon: <BACK_ICON />,
        path: '/'
    },
    {
        page_name: 'Analyse des données',
        icon: <ANALITICS_PAGE_ICON />,
        path: '/dashboard/analitics'
    },
    {
        page_name: 'utilisateur',
        icon: <PROFIL_ICON />,
        path: '/dashboard/users'
    },
]