export const objectUrlToFile = (url: string): Promise<File>  =>
  new Promise((resolve, reject) => {
    fetch(url)
      .then(r => r.blob())
      .then(blob => {
        console.log(blob);
        // const file:File = this.blobToFile(blob, 'abc')
        const file: File = new File([blob], "name");

        (file as any).url = "";
        let URL = window.URL || (window as any).webkitURL;
        if (URL && URL.createObjectURL) {
          (file as any).url = URL.createObjectURL(file);
        }

        resolve(file);
      });
  });
