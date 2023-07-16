import { saveAs } from 'file-saver';
import { formValidationPatten } from 'services/Constants';

export const donwloadXlsxFiles = (data: any, fileName: any, fileType: any) => {
  fileType = fileType || '';
  var sliceSize = 1024;
  var byteCharacters = atob(data);
  var bytesLength = byteCharacters.length;
  var slicesCount = Math.ceil(bytesLength / sliceSize);
  var byteArrays = new Array(slicesCount);
  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    var begin = sliceIndex * sliceSize;
    var end = Math.min(begin + sliceSize, bytesLength);
    var bytes = new Array(end - begin);
    for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  const blob = new Blob(byteArrays, { type: fileType });
  saveAs.saveAs(blob, fileName);
}


export const onNumbervalition = (getValue: any) => {
  let getNumValidation: any;
  var getNumValid: any = formValidationPatten.onlynumber;
  if (getValue && getValue !== "" && getNumValid.test(getValue)) {
    getNumValidation = true;
  } else {
    getNumValidation = false;
  }
  return getNumValidation;
}

export const onKeyDown = (e) => {
  e.preventDefault();
};