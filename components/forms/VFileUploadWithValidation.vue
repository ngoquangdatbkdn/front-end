<template>
  <ValidationProvider
    :name="$attrs.name"
    :rules="rules"
    v-slot="{ errors }"
    tag="div"
    class="row "
  >
    <div class="col-md-6 ">
      <p class="mb-0 font-weight-700 text-uppercase">
        {{ $attrs.label }}
      </p>
      <p class="mb-3">
        {{ $attrs.description }}
      </p>
    </div>
    <div class="col-md-6 ">
      <div class="form-group mb-0">
        <no-ssr>
          <div class="form-group mb-0 avatar-upload d-flex flex-column p-2">
            <label
              :for="$attrs.unique"
              class="upload-area justify-content-center align-items-center d-flex "
            >
              <p v-if="uploading === true">{{ progressUpload + "%" }}</p>
              <img
                :alt="$attrs.label"
                v-if="uploadEnd === true"
                :src="innerValue[0].url"
                class="mw-100"
              />
              <div v-if="uploadEnd === false && uploading === false" class="text-center">
                <i class="ni ni-image mb-2" />
                <p class="mb-0 font-weight-bold h6">
                  {{ $t("common.upload_file_guild") }}
                </p>
                <p class="mb-0">
                  {{ $t("common.upload_file_limitation") }}
                </p>
              </div>
            </label>
            <file-upload
                    v-if="uploadEnd === false && uploading === false"
              extensions="gif,jpg,jpeg,png,webp"
              accept="image/png,image/gif,image/jpeg,image/webp"
              :name="$attrs.unique"
              post-action="/upload/post"
              v-model="innerValue"
              @input-filter="inputFilter"
              ref="upload"
              class="d-none"
            >
            </file-upload>
            <p class="text-danger small">{{ errors[0] }}</p>
            <button
              v-if="uploadEnd"
              type="button"
              class="btn btn-danger mt-0 align-self-center"
              @click="deleteImage"
            >
              {{ $t("common.delete_image") }}
            </button>
          </div>
        </no-ssr>
      </div>
    </div>
  </ValidationProvider>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ValidationProvider } from "vee-validate";
import { storage } from "firebase/app";

import { fbStorage } from "~/plugins/firebase";

@Component({
  components: {
    ValidationProvider
  },
  // data: () => ({
  //   innerValue: []
  // })
})
export default class VFileUploadWithValidation extends Vue {
  innerValue: any = [];
  uploadTask: storage.UploadTask = {} as storage.UploadTask;
  progressUpload: number = 0;
  downloadURL: string = "";
  fileName: string = "";
  uploading: boolean = false;
  uploadEnd: boolean = false;

  @Prop({ type: [Object, String], default: "" }) rules;
  @Prop({ type: String }) value;

  // @Watch("innerValue")
  // onInnerValueChanged(newVal: Array<File>, oldVal: Array<File>) {
  //   this.$emit("input", newVal);
  // }

  // @Watch("value")
  // onValueChanged(newVal: Array<File>, oldVal: Array<File>) {
  //   this.innerValue = newVal;
  // }

  @Watch("uploadTask")
  onUploadTaskChanged(newVal: storage.UploadTask, oldVal: storage.UploadTask) {
    if (this.uploadTask.on) {
      this.uploadTask.on(
        "state_changed",
        sp => {
          this.progressUpload = Math.floor(
            (sp.bytesTransferred / sp.totalBytes) * 100
          );
        },
        null,
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log("downloadURL " + downloadURL);
            this.downloadURL = downloadURL;
            this.uploadEnd = true;
            this.uploading = false;
            this.$emit('input', downloadURL)
          });
        }
      );
    }
  }

  created() {
    if (this.value) {
        this.downloadURL = this.value;
      // this.innerValue = this.value;
    }
  }

  inputFilter(newFile, oldFile, prevent) {
    // if (process.client) {
    if (newFile && !oldFile) {
      if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
        alert("Your choice is not a picture");
        return prevent();
      }
    }
    if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
      newFile.url = "";
      let URL = window.URL || (window as any).webkitURL;
      if (URL && URL.createObjectURL) {
        newFile.url = URL.createObjectURL(newFile.file);
        this.fileName = newFile.file.name;
        this.uploading = true;
        this.uploadTask = fbStorage
          .ref("images/" + this.fileName)
          .put(newFile.file);
      }
    }
  }

  deleteImage() {
    fbStorage
      .ref("images/" + this.fileName)
      .delete()
      .then(() => {
        this.uploading = false;
        this.uploadEnd = false;
        this.innerValue = [];
        this.downloadURL = "";
      })
      .catch(error => {
        console.error(`file delete error occured: ${error}`);
      });
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
