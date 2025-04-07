<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h2 class="text-center mb-4">Registrar Acesso</h2>

        <form @submit.prevent="registrarAcesso">
          <!-- Select de usuários -->
          <div class="form-group mb-4">
            <label for="usuario">Usuário</label>
            <select v-model="acesso.idUsuario" class="form-control" required>
              <option disabled value="">Selecione um usuário</option>
              <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
                {{ usuario.nome }}
              </option>
            </select>
          </div>

          <!-- Campo data/hora -->
          <div class="form-group mb-4">
            <label for="dataHora">Data e Hora do Acesso</label>
            <input type="datetime-local" v-model="acesso.data_hora_acesso" class="form-control" required>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-success">
              <i class="fa fa-save"></i> Salvar
            </button>
            <router-link to="/home" class="btn btn-secondary ml-2">
              <i class="fa fa-arrow-left"></i> Voltar
            </router-link>
          </div>
        </form>
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
      acesso: {
        idUsuario: '',
        data_hora_acesso: ''
      },
      usuarios: []
    };
  },
  mounted() {
    this.carregarUsuarios();
  },
  methods: {
    async carregarUsuarios() {
      try {
        const response = await axios.get("https://localhost:7269/api/v1/usuarios/listar-todos");
        this.usuarios = response.data;
      } catch (error) {
        console.error("Erro ao carregar usuários", error);
      }
    },
    async registrarAcesso() {
      try {
        await axios.post("https://localhost:7269/api/Login/atualizar-senha", this.acesso);
        Swal.fire({
          title: "Sucesso!",
          text: "Registro de acesso salvo com sucesso.",
          icon: "success",
          confirmButtonText: "OK"
        });
        this.acesso.idUsuario = '';
        this.acesso.data_hora_acesso = '';
      } catch (error) {
        Swal.fire("Erro!", "Não foi possível registrar o acesso.", "error");
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
h2 {
  font-weight: bold;
}
</style>
