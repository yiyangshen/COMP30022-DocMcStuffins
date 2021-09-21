import * as AiIcons from "react-icons/ai";

export const SidebarData = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text",
    },
    {
        title: "Contacts",
        path: "/contacts",
        icon: <AiIcons.AiFillContacts />,
        cName: "nav-text",
    },
    {
        title: "Groups",
        path: "/groups",
        icon: <AiIcons.AiFillGold />,
        cName: "nav-text",
    },
    {
        title: "Memos",
        path: "/memos",
        icon: <AiIcons.AiFillFileText />,
        cName: "nav-text",
    },

    {
        title: "Logout",
        path: "/signin",
        icon: <AiIcons.AiFillCaretLeft />,
        cName: "nav-text logout",
    },
];
