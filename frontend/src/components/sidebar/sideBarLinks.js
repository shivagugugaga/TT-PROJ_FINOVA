const SideBarLinks = [
    {
        "id": 0,
        "name": "Dashboard",
        "icon": "fa-solid fa-gauge-high",
        "to": "/user/dashboard",
        "role": "ROLE_USER"
    },
    {
        "id": 1,
        "name": "Transactions",
        "icon": "fa-solid fa-arrow-right-arrow-left",
        "to": "/user/transactions",
        "role": "ROLE_USER"
    },
    {
        "id": 2,
        "name": "New Transaction",
        "icon": "fa-solid fa-circle-plus",
        "to": "/user/newTransaction",
        "role": "ROLE_USER"
    },
    {
        "id": 11,
        "name": "Saved / Recurring",
        "icon": "fa-solid fa-bookmark",
        "to": "/user/savedTransactions",
        "role": "ROLE_USER"
    },
    {
        "id": 9,
        "name": "Analytics & Trends",
        "icon": "fa-solid fa-chart-line",
        "to": "/user/statistics",
        "role": "ROLE_USER"
    },
    {
        "id": 3,
        "name": "Account Settings",
        "icon": "fa-solid fa-gear",
        "to": "/user/settings",
        "role": "ROLE_USER"
    },
    {
        "id": 4,
        "name": "All Transactions",
        "icon": "fa-solid fa-database",
        "to": "/admin/transactions",
        "role": "ROLE_ADMIN"
    },
    {
        "id": 5,
        "name": "User Accounts",
        "icon": "fa-solid fa-users",
        "to": "/admin/users",
        "role": "ROLE_ADMIN"
    },
    {
        "id": 6,
        "name": "Categories",
        "icon": "fa-solid fa-tags",
        "to": "/admin/categories",
        "role": "ROLE_ADMIN"
    },
    {
        "id": 7,
        "name": "Create Category",
        "icon": "fa-solid fa-folder-plus",
        "to": "/admin/newCategory",
        "role": "ROLE_ADMIN"
    },
    {
        "id": 8,
        "name": "Admin Settings",
        "icon": "fa-solid fa-sliders",
        "to": "/admin/settings",
        "role": "ROLE_ADMIN"
    },
];

export default SideBarLinks;