<template>
    <div class="container mt-4">
      <h2 class="mb-3">Histórico de Acessos</h2>
  
      <div v-if="carregando" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Carregando...</span>
        </div>
      </div>
  
      <div v-if="erro" class="alert alert-danger text-center">
        <i class="fa fa-ban"></i> {{ erro }}
      </div>
  
      <div v-if="!carregando && acessos.length === 0 && !erro" class="alert alert-warning text-center">
        <i class="fa fa-exclamation-circle"></i> Nenhum acesso registrado.
      </div>
  
      <div v-if="!carregando && acessos.length > 0" class="table-responsive">
        <table class="table table-striped table-hover">
          <thead class="thead-dark">
            <tr>
              <th>ID</th>
              <th>Nome do Usuário</th>
              <th>Data/Hora do Acesso</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="acesso in acessos" :key="acesso.id">
              <td>{{ acesso.id }}</td>
              <td>{{ acesso.nomeUsuario }}</td>
              <td>{{ formatarData(acesso.dataHoraAcesso) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        acessos: [],
        carregando: false,
        erro: null
      };
    },
    mounted() {
      this.carregarAcessos();
    },
    methods: {
      async carregarAcessos() {
        this.carregando = true;
        try {
          const response = await axios.get("https://localhost:7269/api/v1/historico/listar-todos");
          this.acessos = response.data;
        } catch (error) {
          this.erro = "Erro ao carregar os acessos.";
          console.error(error);
        } finally {
          this.carregando = false;
        }
      },
      formatarData(data) {
        if (!data) return '';
        const dt = new Date(data);
        return dt.toLocaleString("pt-BR"); // dd/mm/yyyy hh:mm
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
  }
  h2 {
    font-weight: bold;
  }
  </style>
  