/* ============================================================
   storage.js — Persistência em localStorage (sem servidor)
   ============================================================ */

const STORAGE_KEY = "geradorCurriculos.v1";

const Storage = {
    save(state) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                savedAt: new Date().toISOString(),
                state: state
            }));
            return true;
        } catch (e) {
            console.warn("Não foi possível salvar:", e);
            return false;
        }
    },

    load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            const data = JSON.parse(raw);
            return data && data.state ? data.state : null;
        } catch (e) {
            return null;
        }
    },

    savedAt() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            return JSON.parse(raw).savedAt || null;
        } catch (e) { return null; }
    },

    clear() {
        localStorage.removeItem(STORAGE_KEY);
    }
};
