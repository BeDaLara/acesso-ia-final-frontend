<template>
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h2 class="text-center mb-4">Registrar Acesso</h2>
    
          <!-- Formulário -->
          <form @submit.prevent="cadastrarUsuario">
            <div class="form-group mb-4">
              <label for="nome">Usuário</label>
              <input type="text" v-model="usuario.IdUsuario" class="form-control" required placeholder="Selecione um usuário">
            </div>
    
            <div class="form-group mb-4">
              <label for="data">Data e Hora de Acesso</label>
              <input type="date" v-model="usuario.dataHoraAcesso" class="form-control" required placeholder="dd/mm/aaaa 00:00">
            </div>

            <div class="text-center">
              <button type="submit" class="btn btn-success">
                <i class="fa fa-save"></i> Salvar
              </button>

              <router-link :to="'/home/acessos/listar'" class="btn btn-primary">⬅︎ Voltar
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
      usuario: {
        IdUsuario: "",
        dataHoraAcesso: "",
      },
    };
  },
  methods: {
    async cadastrarUsuario() {

        const response = await axios.get(`https://localhost:7269/api/v1/usuarios/listar-todos`);
        console.log(response);
       try {
         const response = await axios.post("https://localhost:7269/api/v1/historico/registrar", this.usuario);
         console.log(response);
         Swal.fire({
           title: "Sucesso!",
           text: "Acesso registrado com sucesso.",
           icon: "success",
           confirmButtonText: "OK"
         });
  
         this.$router.push("/home/acessos/listar"); 
       } catch (error) {
         Swal.fire({
           title: "Erro!",
           text: "Falha ao registrar usuário.",
           icon: "error",
           confirmButtonText: "OK"
         });
        console.error(error);
      }
    },
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
  .dropzone {
    border: 2px dashed #007bff;
    border-radius: 10px;
    padding: 20px;
    text-align: center; 
    background-color: #f8f9fa; 
  }
  .img-preview {
  max-width: 100%;
  max-height: 300px;
  border-radius: 10px;
  border: 3px solid #ddd;
  }
  </style>
  