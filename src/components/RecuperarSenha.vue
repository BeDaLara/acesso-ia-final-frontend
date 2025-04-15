<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow p-4">
          <h3 class="text-center mb-4">Recuperar Senha</h3>

          <form @submit.prevent="enviarEmail">
            <div class="form-group">
              <label for="email">Informe seu email</label>
              <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="Digite seu email"
                required
              />
            </div>

            <div class="form-group mt-3" v-if="exibirCamposSenha">
              <input
                v-model="senha"
                type="password"
                class="form-control mb-2"
                placeholder="Digite a nova senha"
                required
              />

              <input
                v-model="senha1"
                type="password"
                class="form-control"
                placeholder="Confirme a nova senha"
                required
              />
            </div>

            <div class="text-center mt-3">
              <button class="btn btn-primary" type="submit" v-if="!exibirCamposSenha">
                <i class="fa fa-envelope"></i> Recuperar Senha
              </button>

              <button class="btn btn-primary" type="button" @click="confirmarNovaSenha" v-if="exibirCamposSenha">
                <i class="fa fa-envelope"></i> Recuperar Senha
              </button>

              <router-link to="/login" class="btn btn-link d-block mt-2">
                <i class="fa fa-arrow-left"></i> Voltar para o Login
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      email: "",
      senha: "",
      senha1: "",
      usuarioEncontrado: null,
      exibirCamposSenha: false,
    };
  },
  methods: {
    async enviarEmail() {
      if (!this.email) {
        Swal.fire({
          icon: "warning",
          title: "Campo obrigatório",
          text: "Por favor, informe o email.",
        });
        return;
      }

      try {
        const response = await axios.get(
          `https://localhost:7269/api/Login/buscar-email?email=${this.email}`
        );

        this.usuarioEncontrado = response.data;
        this.exibirCamposSenha = true;

        Swal.fire({
          icon: "info",
          title: "Email encontrado!",
          text: "Agora digite e confirme a nova senha.",
        });
      } catch (error) {
        const msg = error.response?.data || "Erro ao buscar o usuário";
        Swal.fire({
          icon: "error",
          title: "Email não encontrado",
          text:
            typeof msg === "string"
              ? msg
              : msg.title || msg.errors?.Usuario?.[0] || "O email informado não está cadastrado.",
        });
      }
    },

    async confirmarNovaSenha() {
      if (!this.senha || !this.senha1) {
        Swal.fire({
          icon: "warning",
          title: "Campos obrigatórios",
          text: "Preencha ambos os campos de senha.",
        });
        return;
      }

      if (this.senha !== this.senha1) {
        Swal.fire({
          icon: "error",
          title: "Senhas diferentes",
          text: "As senhas digitadas não coincidem.",
        });
        return;
      }

      try {
        await axios.put(
          `https://localhost:7269/api/Login/resetar-senha/${this.usuarioEncontrado.id}`,
          { novaSenha: this.senha }
        );

        Swal.fire({
          icon: "success",
          title: "Senha alterada!",
          text: "Sua senha foi redefinida com sucesso.",
        });

        this.email = "";
        this.senha = "";
        this.senha1 = "";
        this.exibirCamposSenha = false;
        this.usuarioEncontrado = null;

        this.$router.push("/login");
      } catch (error) {
        console.error("Erro ao redefinir senha", error);
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Não foi possível redefinir a senha.",
        });
      }
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  border: none;
}
</style>
