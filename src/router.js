import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login.vue';
import Home from '@/components/Home.vue';
import Usuarios from '@/components/Usuarios.vue';
import CadastrarUsuarios from '@/components/CadastrarUsuarios.vue';
import EditarUsuario from '@/components/EditarUsuarios.vue';
import ListarAcessos from './components/ListarAcessos.vue';
import RegistrarAcesso from './components/RegistrarAcesso.vue';
import CompararImagens from './components/CompararImagens.vue';

Vue.use(Router);

const router =  new Router({
    mode: "history",
    routes: [
        { path: "/login", component: Login },
        { 
            path: "/home", 
            component: Home,
            children: [
                { path: "usuarios", component: Usuarios },
                { path: "usuarios/cadastrar", component: CadastrarUsuarios },
                { path: "usuarios/editar/:id", component: EditarUsuario },
                { path: "acessos/listar", component: ListarAcessos },
                { path: "acessos/registrar", component: RegistrarAcesso },
                { path: "comparar-imagens", component: CompararImagens },
            ],
            meta: { requiresAuth: true}
        },
    ]
});

//Intercepta a navegação visando validar regras
router.beforeEach((to, from, next) => {
    const usuarioLogado = localStorage.getItem('dados-usuario-logado');

    //Valida se a rota solicitada estar logado e se possui dados de login
    if(to.matched.some(record => record.meta.requiresAuth) && !usuarioLogado)
    {
        // Se a rota exige autenticação e não há usuário logado, redireciona para login
        next('/login');
    }
    // segue a vida
    next();
});

export default router;