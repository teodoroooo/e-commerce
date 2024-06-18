import { useState } from "react";
import { Button } from "../button/button";
import { FormInput } from "../form-input/form-input";
import './sign-in.scss'
import { signInAuthUserWithEmailPassword, signInWithGooglePopup } from "../../utils/firebase";

const defaultFormFilds = {
  email: "",
  senha: ""
}

export function SignIn() {

  const [formFilds, setFormFilds] = useState(defaultFormFilds)
  const { email, senha } = formFilds

  const handleChange = (event) => {
    const { name , value } = event.target
    setFormFilds({...formFilds, [name]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log(email, senha)
      const { user } = await signInAuthUserWithEmailPassword(email, senha)
      console.log(user)
    } catch (e) {
      console.log(e)
    }
    console.log(formFilds)
    setFormFilds(defaultFormFilds)
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup()
  }

  return (
    <div>
      <h2>Voce ja possui conta?</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <FormInput 
          label="E-mail"
          type="email"
          requeried
          name="email"
          placeholder="Digite seu e-mail"
          autocomplete="off"
          onChange={handleChange}
          value={email}
        />
        <FormInput 
          label="Senha"
          type="password"
          requeried
          name="senha"
          placeholder="Digite seu senha"
          onChange={handleChange}
          value={senha}
        />
        <Button type="submit">
          Login
        </Button>
        <Button type="button" typeButton="google" onClick={signInWithGoogle}>
          Login com Google
        </Button>
      </form>
    </div>
  )
}