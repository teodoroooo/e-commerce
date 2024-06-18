import { useState } from "react";
import { Button } from "../button/button";
import { FormInput } from "../form-input/form-input";
import { createAuthUserWithEmailPassword, createUserDocumentFromAuth } from "../../utils/firebase";

const defaultFormFields = {
  displayName: "",
  email: "",
  senha: "",
  confirmeSenha: ""
}

export function SignUp() {

  const [formFilds, setFormFilds] = useState(defaultFormFields)
  const { displayName, email, senha, confirmeSenha } = formFilds

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFilds( {...formFilds, [name]:value} )
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (senha !== confirmeSenha) {
      alert("Senhas não são iguais")
      return
    }

    try {
      const { user } = await createAuthUserWithEmailPassword(email, senha)
      await createUserDocumentFromAuth(user, { displayName } )
      console.log(user)
      setFormFilds(defaultFormFields)
    } catch (erro) {
      if (erro.code === 'auth/email-already-in-use') {
        alert("E-mail já cadastrado")
      } else {
        console.log(erro)
      }
    }
  }


  return (
    <div>
      <h2>Não possui conta?</h2>
      <form className="form-container" onSubmit={handleSubmit}>
         <FormInput 
          label="Nome"
          type="text"
          requeried
          name="displayName"
          placeholder="Digite seu nome"
          autocomplete="off"
          onChange={handleChange}
          value={displayName}
        />
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
        <FormInput 
          label="Confirme sua senha"
          type="password"
          requeried
          name="confirmeSenha"
          placeholder="Digite seu senha novamente"
          onChange={handleChange}
          value={confirmeSenha}
        />
        <Button type="submit">
          Criar conta
        </Button>
      </form>
    </div>
  )
}