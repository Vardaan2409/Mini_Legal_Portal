const LS_USER_KEY = "legassist_user";
const LS_QUERIES_KEY = "legassist_queries";

export const loadUser = () =>
    JSON.parse(localStorage.getItem(LS_USER_KEY) || "null");
export const saveUser = (user) =>
    localStorage.setItem(LS_USER_KEY, JSON.stringify(user));
export const clearUser = () => localStorage.removeItem(LS_USER_KEY);

export const loadQueries = () =>
    JSON.parse(localStorage.getItem(LS_QUERIES_KEY) || "[]");
export const saveQueries = (qs) =>
    localStorage.setItem(LS_QUERIES_KEY, JSON.stringify(qs));

export const seedDemoQueries = () => {
    const existing = loadQueries();
    if (existing.length) return;
    const demo = [
        {
            id: crypto.randomUUID(),
            text: "How to draft a simple rental agreement?",
            createdAt: new Date().toISOString(),
            by: "demo@legassist.app",
        },
        {
            id: crypto.randomUUID(),
            text: "What is the notice period in an employment contract?",
            createdAt: new Date().toISOString(),
            by: "demo@legassist.app",
        },
    ];
    saveQueries(demo);
};
