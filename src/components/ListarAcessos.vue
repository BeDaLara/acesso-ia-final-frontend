<template>
    <div class="container mt-4">
        <h2 class="mb-3">Historico de Acessos</h2>

        <div v-if="carregando" class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Carregando...</span>
            </div>
        </div>

        <div v-if="erro" class="alert alert-danger text-center">
            <i class="fa fa-ban"></i> {{ erro }}
        </div>

        <div v-if="!carregando && usuarios.length === 0 && !erro" class="alert alert-warning text-center">
            <i class="fa fa-exclamation-circle"></i> Nenhum acesso registrado!
        </div>

        <!-- Tabela de listagem -->
        <div class="table-responsive">
            <table v-if="!carregando && usuarios.length > 0" class="table table-striped table-hover">
                <thead class="thead-dark">
                    <tr>
                        <th>Id</th>
                        <th>Nome do Usuário</th>
                        <th>Data/Hora do Acesso</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="usuario in usuarios" :key="usuario.id">
                        <td>{{ usuario.id }}</td>
                        <td>{{ usuario.nomeUsuario }}</td>
                        <td>{{ usuario.dataHoraAcesso }}</td>
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
            usuarios: [],
            carregando: false,
            erro: null,
        };
    },
    mounted() {
        this.carregarHistorico();
    },
    methods: {
        async carregarHistorico() {
            this.carregando = true;

            try {
                const response = await axios.get("https://localhost:7269/api/v1/historico/listar-todos");

                setTimeout(() => {
                    this.usuarios = response.data;
                    this.carregando = false;
                }, 2000);
            } catch (error) {
                this.erro = "Ocorreu um erro ao listar o historico de acesso";
                console.log(error);
                this.carregando = false;
            }
        }
    }
}
</script>