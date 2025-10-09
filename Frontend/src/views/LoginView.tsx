import { Link } from "react-router-dom"

export default function LoginView() {

    return (
        <>
            <div className=' bg-slatet-800 min-h-screen'>
                <div className=' max-w-lg mx-auto pt-10 px-5'></div>
                <img src='/logo.svg' alt='Logotipo' />
            </div>
            <nav>
                <Link to="/auth/register">
                    ¿No tienes cuenta? Crea una aqui
                </Link>
            </nav>
        </>
    )
}
