import { createContext, useContext, useEffect, useState } from "react";
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const auth = getAuth();

export const AuthContext = createContext();

const armarUsuario = async (usuarioFirebase) => {
    let rol = "user";
    let nombre = null;
    try {
        const docUsuario = await getDoc(doc(db, "usuarios", usuarioFirebase.uid));
        if (docUsuario.exists()) {
            rol = docUsuario.data().rol === "admin" ? "admin" : "user";
            nombre = docUsuario.data().nombre ?? null;
        }
    } catch (error) {
        console.error("No se pudieron leer los datos del usuario:", error);
    }
    return { uid: usuarioFirebase.uid, email: usuarioFirebase.email, rol, nombre };
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth);

    const recargarUsuario = async () => {
        if (auth.currentUser) {
            setUser(await armarUsuario(auth.currentUser));
        }
    };

    useEffect(() => {
        const cancelar = onAuthStateChanged(auth, async (usuarioFirebase) => {
            if (usuarioFirebase) {
                setUser(await armarUsuario(usuarioFirebase));
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => cancelar();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, recargarUsuario }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
