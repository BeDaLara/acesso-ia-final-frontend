<template>
    <div class="container mt-4">
      <h2 class="text-center mb-4">Comparar Imagens</h2>
      
      <div class="d-flex justify-content-center">
        <!-- Upload Foto 1 -->
        <div class="form-group mx-3 text-center">
          <label>Imagem 1</label>
          <div ref="dropzone1" class="dropzone"></div>
          <div v-if="imagemBase64_1" class="preview mt-3">
            <img :src="'data:image/png;base64,' + imagemBase64_1" class="img-fluid img-preview" />
          </div>
        </div>
  
        <!-- Upload Foto 2 -->
        <div class="form-group mx-3 text-center">
          <label>Imagem 2</label>
          <div ref="dropzone2" class="dropzone"></div>
          <div v-if="imagemBase64_2" class="preview mt-3">
            <img :src="'data:image/png;base64,' + imagemBase64_2" class="img-fluid img-preview" />
          </div>
        </div>
      </div>
  
      <div class="text-center mt-4">
        <button type="button" class="btn btn-primary" @click="compararImagens">
          <i class="fa fa-search"></i> Comparar
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import Swal from "sweetalert2";
  import Dropzone from "dropzone";
  import "dropzone/dist/dropzone.css";
  
  export default {
    data() {
      return {
        imagemBase64_1: "",
        imagemBase64_2: "",
      };
    },
    mounted() {
      this.initDropzone(this.$refs.dropzone1, 1);
      this.initDropzone(this.$refs.dropzone2, 2);
    },
    methods: {
      initDropzone(element, index) {
        const self = this;
        new Dropzone(element, {
          url: "/",
          autoProcessQueue: false,
          acceptedFiles: "image/*",
          maxFiles: 1,
          addRemoveLinks: true,
          dictDefaultMessage: "Arraste uma imagem aqui",
          init: function () {
            this.on("addedfile", (file) => {
              self.converterImagemBase64(file).then((base64) => {
                if (index === 1) self.imagemBase64_1 = base64.split(",")[1];
                else self.imagemBase64_2 = base64.split(",")[1];
              });
            });
            this.on("removedfile", () => {
              if (index === 1) self.imagemBase64_1 = "";
              else self.imagemBase64_2 = "";
            });
          },
        });
      },
      async converterImagemBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target.result);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
      },
      compararImagens() {
        if (!this.imagemBase64_1 || !this.imagemBase64_2) {
          Swal.fire("Erro", "Ambas as imagens são obrigatórias!", "error");
          return;
        }
        if (this.imagemBase64_1 === this.imagemBase64_2) {
          Swal.fire("Sucesso", "As imagens são idênticas!", "success");
        } else {
          Swal.fire("Atenção", "As imagens são diferentes!", "warning");
        }
      },
    },
  };
  </script>
  
  <style>
 .img-preview {
max-width: 100%;
max-height: 300px;
border-radius: 10px;
border: 3px solid #ddd;
}

  .dropzone {
  border: 2px dashed #007bff;
  border-radius: 10px;
  padding: 20px;
  text-align: center; 
  background-color: #f8f9fa; 
  width: 500px;
}
  </style>