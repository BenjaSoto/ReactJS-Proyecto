import getpass
import json
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

LINKEDIN = "https://www.linkedin.com/in/bsotop"

EQUIPO = [
    {"nombre": "Ana Paula", "rol": "Talento & RRHH", "linkedinURL": ""},
    {"nombre": "Elvis Soto", "rol": "Backend Java", "linkedinURL": LINKEDIN},
    {"nombre": "Camila Velazquez", "rol": "QA Automation", "linkedinURL": ""},
]


def leer_env():
    datos = {}
    for linea in (Path(__file__).parent.parent / ".env").read_text(encoding="utf-8").splitlines():
        if "=" in linea and not linea.strip().startswith("#"):
            clave, valor = linea.split("=", 1)
            datos[clave.strip()] = valor.strip().strip('"')
    return datos


def pedir(url, metodo="GET", cuerpo=None, token=None):
    cabeceras = {"Content-Type": "application/json"}
    if token:
        cabeceras["Authorization"] = f"Bearer {token}"
    datos = json.dumps(cuerpo).encode() if cuerpo is not None else None
    peticion = urllib.request.Request(url, data=datos, headers=cabeceras, method=metodo)
    try:
        with urllib.request.urlopen(peticion) as respuesta:
            return json.loads(respuesta.read())
    except urllib.error.HTTPError as error:
        raise SystemExit(f"Error {error.code}: {error.read().decode()}")


def a_firestore(persona):
    return {"fields": {campo: {"stringValue": valor} for campo, valor in persona.items()}}


def main():
    env = leer_env()
    api_key = env["VITE_FIREBASE_API_KEY"]
    proyecto = env["VITE_FIREBASE_PROJECT_ID"]

    email = input("Email del usuario admin: ").strip()
    password = getpass.getpass("Contraseña (no se muestra): ")

    login = pedir(
        f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={api_key}",
        "POST",
        {"email": email, "password": password, "returnSecureToken": True},
    )
    token = login["idToken"]

    base = f"https://firestore.googleapis.com/v1/projects/{proyecto}/databases/(default)/documents/equipo"
    existentes = pedir(base, token=token).get("documents", [])

    if not existentes:
        for persona in EQUIPO:
            pedir(base, "POST", a_firestore(persona), token)
        print(f"Colección vacía: se crearon {len(EQUIPO)} documentos.")
        return

    actualizados = 0
    for documento in existentes:
        nombre = documento["fields"].get("nombre", {}).get("stringValue", "")
        if "soto" in nombre.lower():
            id_doc = documento["name"].split("/")[-1]
            url = f"{base}/{id_doc}?" + urllib.parse.urlencode({"updateMask.fieldPaths": "linkedinURL"})
            pedir(url, "PATCH", a_firestore({"linkedinURL": LINKEDIN}), token)
            actualizados += 1
    print(f"LinkedIn agregado en {actualizados} documento(s).")


if __name__ == "__main__":
    main()
