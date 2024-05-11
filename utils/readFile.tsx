const readFileAsync = (file: File) => {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result);
        } else {
          reject(new Error("File read failed"));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

