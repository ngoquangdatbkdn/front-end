<template>
  <ValidationProvider v-slot="{ errors }" :name="$attrs.name" :rules="rules" tag="div" class="row">
    <div class="col-md-6">
      <p class="mb-0 font-weight-700 text-uppercase">{{ $attrs.label }}</p>
      <p class="mb-3">{{ $attrs.description }}</p>
    </div>
    <div class="col-md-6">
      <div class="form-group mb-0">
        <no-ssr>
          <div class="form-group mb-0 avatar-upload d-flex flex-column p-2">
            <label
              :for="$attrs.unique"
              class="upload-area justify-content-center align-items-center d-flex"
            >
              <p v-if="uploading === true">{{ progressUpload + "%" }}</p>
              <img v-if="uploadEnd === true" :alt="$attrs.label" :src="innerValue" class="mw-100">
              <div v-if="uploadEnd === false && uploading === false" class="text-center">
                <i class="ni ni-image mb-2"/>
                <p class="mb-0 font-weight-bold h6">{{ $t("common.upload_file_guild") }}</p>
                <p class="mb-0">{{ $t("common.upload_file_limitation") }}</p>
              </div>
            </label>
            <file-upload
              v-if="uploadEnd === false && uploading === false"
              ref="upload"
              v-model="files"
              extensions="gif,jpg,jpeg,png,webp"
              accept="image/png, image/gif, image/jpeg, image/webp"
              :name="$attrs.unique"
              post-action="/upload/post"
              class="d-none"
              @input-filter="inputFilter"
            />
            <p class="text-danger small">{{ errors[0] }}</p>
            <button
              v-if="uploadEnd"
              type="button"
              class="btn btn-danger mt-0 align-self-center"
              @click="deleteImage"
            >{{ $t("common.delete_image") }}</button>
          </div>
        </no-ssr>
      </div>
    </div>
  </ValidationProvider>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ValidationProvider } from "vee-validate";
// import { storage } from "firebase/app";

// import { fbStorage } from "~/plugins/firebase";

@Component({
  components: {
    ValidationProvider
  }
  // data: () => ({
  //   files: []
  // })
})
export default class VFileUploadWithValidation extends Vue {
  files: any = [];
  // uploadTask: storage.UploadTask = {} as storage.UploadTask;
  progressUpload: number = 0;
  innerValue: string = "";
  fileName: string = "";
  uploading: boolean = false;
  uploadEnd: boolean = false;

  @Prop({ type: [Object, String], default: "" }) rules;
  @Prop({ type: String }) value;

  @Watch("innerValue")
  onInnerValueChanged(newVal: string, oldVal:string) {
      console.log("newVal innerValue " + newVal);
    this.$emit("input", newVal);
  }

  @Watch("value")
  onValueChanged(newVal: string, oldVal: string) {
    console.log("newVal value " + newVal);
    this.innerValue = newVal;
  }

  created() { 
    // console.log("this.value " + this.value);
    if (this.value) {
      this.innerValue = this.value.toString();
      this.uploadEnd = true;
      // this.$emit("input", this.innerValue);
      // this.files = this.value;
    }
  }

  async inputFilter(newFile, oldFile, prevent) {
    // if (process.client) {
    if (newFile && !oldFile) {
      if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
        alert("Your choice is not a picture");
        return prevent();
      }
    }
    if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
      newFile.url = "";
      const URL = window.URL || (window as any).webkitURL;
      if (URL && URL.createObjectURL) {
        newFile.url = URL.createObjectURL(newFile.file);
        this.fileName = newFile.file.name;
        // console.log("fileName " + this.fileName);
        // console.log("newFile.file " + newFile.file);
        this.uploading = true;
        const config = {
          onUploadProgress: progressEvent => {
            this.progressUpload = Math.floor(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            // console.log(this.progressUpload);
          }
        };
        let data = new FormData();
        data.append("file", newFile.file);
        try {
          const result = await this.$axios.post(
            "api/storage/upload-file",
            data,
            config
          );
          this.innerValue = result.data.data;
          // this.$emit("input", this.innerValue);
        } catch (error) {
          // this.error = e.message;
          if (error.response) {
            // error = error.response.data.data.code;
          } else if (error.request) {
            // error = error.request;
          } else {
            // error = error.message;
          }
        }
        // console.log("this.innerValue " + this.innerValue);
        this.uploadEnd = true;
        this.uploading = false;
     
      }
    }
  }

  async deleteImage() {
    this.uploading = false;
    this.uploadEnd = false;
    this.files = [];
    this.innerValue = "";
  }
  // }
}
</script>

<style scoped>
.upload-area {
  /*// height: 140px;*/
  padding: 20px;
  background: #f6f6f6;
  border: 1px dashed #999999;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>
