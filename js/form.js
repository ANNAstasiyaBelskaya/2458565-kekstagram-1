import { isEscapeKey } from './util.js';
import { imgFormOverLay, imgPreview, getDefaultEffect } from './upload-photo-effects.js';
import { pristine, hashtagInput, commentInput } from './form-validation.js';
import { showErrorMessage, showSuccessMessage } from './form-messages.js';
import { getOriginalScale } from './upload-photo-scale.js';
import { uploadPhoto } from './upload-photo.js';
import { showAlert } from './util.js';

const ALERT_SHOW_TIME = 2000;
const uploadFileInput = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const resetButtonElem = imgFormOverLay.querySelector('#upload-cancel');
const submitButtonElem = imgFormOverLay.querySelector('.img-upload__submit');
const LoadingMessages = {
  start: 'Публикую...',
  finish: 'Опубликовать',
};
const loadPhotoTemplate = document.querySelector('#messages')
  .content
  .querySelector('.img-upload__message')
  .cloneNode(true);

const blockSubmitButton = () => {
  submitButtonElem.disabled = true;
  submitButtonElem.textContent = LoadingMessages.start;
};

const unblockSubmitButton = () => {
  submitButtonElem.disabled = false;
  submitButtonElem.textContent = LoadingMessages.finish;
};

const resetform = () => {
  imgPreview.className = 'img-upload__preview';
  imgPreview.src = '';
  uploadFileInput.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  getOriginalScale();
  getDefaultEffect();
};

const closeModal = () => {
  imgFormOverLay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

resetButtonElem.addEventListener('click', () => {
  closeModal();
  resetform();
});

const stopEvent = (element) => {
  element.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeModal();
    resetform();
    stopEvent(hashtagInput);
    stopEvent(commentInput);
  }
};

document.addEventListener('keydown', onDocumentKeydown);

const setFormSubmit = (onSuccess) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      onSuccess(new FormData(form))
        .then(() => {
          closeModal();
          showSuccessMessage();
          resetform();
        })
        .catch(() => {
          showErrorMessage();
        })
        .finally(() => {
          unblockSubmitButton();
        });
    } else {
      showErrorMessage();
    }
  });
};

uploadFileInput.addEventListener('change', () => {
  showAlert(loadPhotoTemplate, ALERT_SHOW_TIME);
  imgFormOverLay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadPhoto();
  getDefaultEffect();
});

export { setFormSubmit };
